'use client';

import { useEffect, useState } from 'react';
import { sdk } from '@farcaster/miniapp-sdk';
import { getUserVibeForToday, getRandomVibe } from '@/lib/utils';
import { Vibe } from '@/lib/vibes';
import styles from './page.module.css';

export default function MiniApp() {
  const [isSDKLoaded, setIsSDKLoaded] = useState(false);
  const [context, setContext] = useState<any>(null);
  const [currentVibe, setCurrentVibe] = useState<Vibe | null>(null);
  const [rollCount, setRollCount] = useState(0);
  const [maxRolls] = useState(5);
  const [isRolling, setIsRolling] = useState(false);
  const [showDonate, setShowDonate] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        // Get context from Farcaster
        const ctx = await sdk.context;
        setContext(ctx);
        
        // Get user's daily vibe based on their FID
        const fid = ctx?.user?.fid?.toString() || 'default';
        const vibe = getUserVibeForToday(fid);
        setCurrentVibe(vibe);
        
        // DEV MODE: Reset roll count on every load (comment this in production)
        const isDev = process.env.NODE_ENV === 'development';
        if (isDev) {
          setRollCount(0);
        } else {
          // Load roll count from localStorage
          const today = new Date().toISOString().split('T')[0];
          const savedData = localStorage.getItem(`castmyvibe-${fid}-${today}`);
          if (savedData) {
            const data = JSON.parse(savedData);
            setRollCount(data.rollCount || 0);
          }
        }
        
        setIsSDKLoaded(true);
        
        // Tell Farcaster the app is ready
        await sdk.actions.ready();
      } catch (error) {
        console.error('Error loading SDK:', error);
        setIsSDKLoaded(true);
        await sdk.actions.ready();
      }
    };
    
    load();
  }, []);

  const handleReroll = () => {
    if (rollCount >= maxRolls || !currentVibe) return;
    
    setIsRolling(true);
    
    // Simulate rolling animation
    setTimeout(() => {
      const newVibe = getRandomVibe(currentVibe.id);
      setCurrentVibe(newVibe);
      const newRollCount = rollCount + 1;
      setRollCount(newRollCount);
      
      // Save to localStorage
      const fid = context?.user?.fid?.toString() || 'default';
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem(
        `castmyvibe-${fid}-${today}`,
        JSON.stringify({ rollCount: newRollCount, vibeId: newVibe.id })
      );
      
      setIsRolling(false);
    }, 500);
  };

  const handleCast = async () => {
    if (!currentVibe) return;
    
    // Log the cast to analytics
    try {
      const fid = context?.user?.fid?.toString() || 'unknown';
      const username = context?.user?.displayName || context?.user?.username || null;
      
      await fetch('/api/track-cast', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fid,
          vibeId: currentVibe.id,
          vibeText: currentVibe.text,
          username,
        }),
      });
    } catch (error) {
      console.error('Error tracking cast:', error);
      // Continue even if tracking fails
    }
    
    // Generate the cast page URL that will redirect to miniapp when clicked
    const baseUrl = process.env.NEXT_PUBLIC_HOST || 'https://cast-my-vibe.vercel.app';
    const castPageUrl = `${baseUrl}/api/cast/${currentVibe.id}`;
    
    const castText = `🌍 Here's my vibe of the day! 🚀

"${currentVibe.text}"

#CastMyVibe #crypto

🎲 Get yours at cast-my-vibe.vercel.app`;
    
    try {
      // Detect which app we're running in
      const isInMiniApp = context?.client?.clientFid !== undefined;
      
      if (isInMiniApp && sdk && typeof sdk.actions?.openUrl === 'function') {
        // For Base App and Warpcast, use the web compose URL
        // The SDK will handle opening it in the native app
        const composeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(castText)}&embeds[]=${encodeURIComponent(castPageUrl)}`;
        await sdk.actions.openUrl(composeUrl);
      } else {
        // Fallback: Navigate directly if in web browser
        const webComposeUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(castText)}&embeds[]=${encodeURIComponent(castPageUrl)}`;
        window.location.href = webComposeUrl;
      }
    } catch (error) {
      console.error('Error opening cast composer:', error);
      // Last resort fallback
      const fallbackUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(castText)}&embeds[]=${encodeURIComponent(castPageUrl)}`;
      window.location.href = fallbackUrl;
    }
  };

  const getCategoryEmoji = (category: string) => {
    const emojis: Record<string, string> = {
      humor: '😂',
      optimistic: '🚀',
      depressive: '😢',
      general: '💭',
      motivational: '💪',
      punchline: '🎯'
    };
    return emojis[category] || '✨';
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      humor: 'linear-gradient(135deg, #7b2cbf 0%, #5a189a 100%)',
      optimistic: 'linear-gradient(135deg, #74c69d 0%, #40916c 100%)',
      depressive: 'linear-gradient(135deg, #5a189a 0%, #240046 100%)',
      general: 'linear-gradient(135deg, #4cc9f0 0%, #4895ef 100%)',
      motivational: 'linear-gradient(135deg, #f72585 0%, #b5179e 100%)',
      punchline: 'linear-gradient(135deg, #4361ee 0%, #3a0ca3 100%)'
    };
    return colors[category] || 'linear-gradient(135deg, #7209b7 0%, #3a0ca3 100%)';
  };

  if (!isSDKLoaded || !currentVibe) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Loading your daily vibe...</p>
      </div>
    );
  }

  if (showDonate) {
    return (
      <div className={styles.container}>
        <div className={styles.donateCard}>
          <h1 className={styles.donateTitle}>Support CastMyVibe</h1>
          <p className={styles.donateText}>
            If this vibe made you smile, donations make me smile too 😌
          </p>
          <div className={styles.addressContainer}>
            <p className={styles.addressLabel}>Base Address:</p>
            <code className={styles.address}>0x4eBa8c1f1957bD8cE5ec90f665f95b8e671B9Be6</code>
          </div>
          <button 
            className={styles.backButton}
            onClick={() => setShowDonate(false)}
          >
            ⬅️ Back to Vibe
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <button 
        className={styles.infoButton}
        onClick={() => window.open('/about', '_blank')}
        aria-label="Information"
      >
        ?
      </button>
      
      <div 
        className={styles.vibeCard}
        style={{ background: getCategoryColor(currentVibe.category) }}
      >
        <div className={styles.header}>
          <h1 className={styles.logo}>CastMyVibe</h1>
          <div className={styles.userInfo} onClick={() => setShowProfile(!showProfile)}>
            {context?.user?.pfpUrl && (
              <img 
                src={context.user.pfpUrl} 
                alt="Profile" 
                className={styles.avatar}
              />
            )}
            {context?.user?.displayName && (
              <span className={styles.username}>@{context.user.displayName}</span>
            )}
          </div>
        </div>
        
        {showProfile && context?.user && (
          <div className={styles.profileCard}>
            <div className={styles.profileHeader}>
              {context.user.pfpUrl && (
                <img 
                  src={context.user.pfpUrl} 
                  alt="Profile" 
                  className={styles.profileAvatar}
                />
              )}
              <div className={styles.profileInfo}>
                <h3 className={styles.profileName}>
                  {context.user.displayName || context.user.username}
                </h3>
                <p className={styles.profileFid}>FID: {context.user.fid}</p>
              </div>
            </div>
            {context.user.bio && (
              <p className={styles.profileBio}>{context.user.bio}</p>
            )}
            <button 
              className={styles.closeProfile}
              onClick={() => setShowProfile(false)}
            >
              ✕
            </button>
          </div>
        )}

        <div className={`${styles.vibeContent} ${isRolling ? styles.rolling : ''}`}>
          <div className={styles.categoryBadge}>
            <span className={styles.emoji}>{getCategoryEmoji(currentVibe.category)}</span>
            <span className={styles.categoryName}>{currentVibe.category}</span>
          </div>
          
          <p className={styles.vibeText}>{currentVibe.text}</p>
        </div>

        <div className={styles.rollInfo}>
          <span className={styles.rollCount}>
            {rollCount >= maxRolls 
              ? "You've used all your rolls. Come back tomorrow and you might find your vibe." 
              : `${maxRolls - rollCount} roll${maxRolls - rollCount === 1 ? '' : 's'} remaining`
            }
          </span>
        </div>

        <div className={styles.actions}>
          <button 
            className={`${styles.button} ${styles.rerollButton}`}
            onClick={handleReroll}
            disabled={rollCount >= maxRolls || isRolling}
          >
            {isRolling ? '🎲 Rolling...' : '🎲 Reroll'}
          </button>
          
          <button 
            className={`${styles.button} ${styles.castButton}`}
            onClick={handleCast}
          >
            📢 Cast This Vibe
          </button>
        </div>

        <div className={styles.secondaryActions}>
          <button 
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => setShowDonate(true)}
          >
            ❤️ Donate
          </button>
        </div>
      </div>
    </div>
  );
}
