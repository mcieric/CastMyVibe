'use client';

import { useEffect, useState } from 'react';
import styles from './logs.module.css';

interface CastLog {
  fid: string;
  vibeId: number;
  vibeText: string;
  username: string;
  timestamp: string;
}

interface LogsData {
  totalCasts: number;
  recentCasts: CastLog[];
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLogs();
    // Refresh every 10 seconds
    const interval = setInterval(fetchLogs, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchLogs = async () => {
    try {
      const res = await fetch('/api/track-cast');
      const data = await res.json();
      setLogs(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>
          <div className={styles.spinner}></div>
          <p>Loading logs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>📊 CastMyVibe Analytics</h1>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{logs?.totalCasts || 0}</div>
            <div className={styles.statLabel}>Total Casts</div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statValue}>{logs?.recentCasts.length || 0}</div>
            <div className={styles.statLabel}>Recent Activity</div>
          </div>
        </div>
      </div>

      <div className={styles.logsSection}>
        <h2 className={styles.sectionTitle}>Recent Casts</h2>
        {logs && logs.recentCasts.length > 0 ? (
          <div className={styles.logsList}>
            {logs.recentCasts.map((log, index) => (
              <div key={index} className={styles.logCard}>
                <div className={styles.logHeader}>
                  <span className={styles.username}>
                    {log.username}
                  </span>
                  <span className={styles.timestamp}>
                    {new Date(log.timestamp).toLocaleString('fr-FR')}
                  </span>
                </div>
                <div className={styles.logBody}>
                  <p className={styles.vibeText}>{log.vibeText}</p>
                  <div className={styles.logMeta}>
                    <span className={styles.fid}>FID: {log.fid}</span>
                    <span className={styles.vibeId}>Vibe #{log.vibeId}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <p>Aucun cast enregistré pour le moment</p>
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <button 
          className={styles.refreshButton}
          onClick={fetchLogs}
        >
          🔄 Refresh
        </button>
        <a href="/miniapp" className={styles.backLink}>
          ← Back to App
        </a>
      </div>
    </div>
  );
}
