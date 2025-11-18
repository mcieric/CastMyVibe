import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          CastMyVibe
        </h1>

        <p className={styles.description}>
          A daily crypto vibe mini-app for Farcaster
        </p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>✨ Try the Mini App</h2>
            <p>Experience CastMyVibe as an interactive Farcaster mini-app!</p>
            <Link href="/miniapp" className={styles.link}>
              Launch Mini App →
            </Link>
          </div>

          <div className={styles.card}>
            <h2>How it works</h2>
            <p>Get your personalized daily crypto vibe with humor, optimism, or reality.</p>
            <ul>
              <li>🎲 Daily personalized vibes</li>
              <li>🔁 2 reroll attempts per day</li>
              <li>📢 Cast your favorite vibes</li>
              <li>❤️ Support via donations</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>Categories</h2>
            <ul>
              <li>😂 Humor - Light-hearted crypto jokes</li>
              <li>🚀 Optimistic - Bullish perspectives</li>
              <li>😢 Depressive - Bearish realities</li>
              <li>💭 General - Daily mood reflections</li>
              <li>💪 Motivational - Inspiring wisdom</li>
              <li>🎯 Punchlines - Memorable one-liners</li>
            </ul>
          </div>

          <div className={styles.card}>
            <h2>🎨 Tech Stack</h2>
            <ul>
              <li>Next.js 16 with App Router</li>
              <li>Farcaster Mini App SDK</li>
              <li>TypeScript</li>
              <li>190+ curated vibes</li>
            </ul>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>
          Made with ❤️ for the Farcaster community
        </p>
        <p>
          Donate: 0x4eBa8c1f1957bD8cE5ec90f665f95b8e671B9Be6
        </p>
      </footer>
    </div>
  );
}