import styles from '../styles/Games.module.css';

const completedGames = [
  { id: 1, name: 'Cyberpunk 2077', cover: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=300&h=300&fit=crop', completedDate: '2025-01-15', rating: '★★★★☆' },
  { id: 2, name: 'Elden Ring', cover: 'https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=300&h=300&fit=crop', completedDate: '2024-11-02', rating: '★★★★★' },
];

const continueGames = [
  { id: 4, name: "Baldur's Gate 3", cover: 'https://images.unsplash.com/photo-1616486338812-3badae4b4b1b?w=300&h=300&fit=crop', progress: '65% – Act 2', lastPlayed: '2025-03-01' },
  { id: 5, name: 'Starfield', cover: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=300&h=300&fit=crop', progress: '40% – Main Quest', lastPlayed: '2025-02-20' },
];

export default function Games() {
  return (
    <div className={styles.container}>
      <header className={styles.pageHeader}>
        <h1>🎮 游戏库</h1>
        <p>记录每一段冒险的足迹</p>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.icon}>⚡</span>
          <h2>CONTINUE · 进行中</h2>
        </div>
        <div className={styles.grid}>
          {continueGames.map(game => (
            <div key={game.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={game.cover} alt={game.name} />
                <div className={styles.progressBadge}>{game.progress}</div>
              </div>
              <div className={styles.cardContent}>
                <h3>{game.name}</h3>
                <div className={styles.meta}>📅 最近游玩: {game.lastPlayed}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionTitle}>
          <span className={styles.icon}>🏆</span>
          <h2>COMPLETED · 已通关</h2>
        </div>
        <div className={styles.grid}>
          {completedGames.map(game => (
            <div key={game.id} className={styles.card}>
              <div className={styles.cardImage}>
                <img src={game.cover} alt={game.name} />
                <div className={styles.completeBadge}>✓ 100%</div>
              </div>
              <div className={styles.cardContent}>
                <h3>{game.name}</h3>
                <div className={styles.meta}>
                  <span>🏅 通关: {game.completedDate}</span>
                  <span className={styles.rating}>{game.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}