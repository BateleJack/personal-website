import Navbar from '../components/Navbar';
import styles from '../styles/Portfolio.module.css';

// 游戏列表（你提供的精选）
const games = [
  "The Last Of Us Part II",
  "Uncharted: Legacy of Thieves collection",
  "Forza Horizon 5",
  "Minecraft",
  "Red Dead Redemption II",
  "Cyberpunk 2077",
  "Microsoft Flight Simulator 2020",
  "Shadow of the Tomb Raider"
];

// 音乐列表
const songs = [
  "Billie Jean - Michael Jackson",
  "Daylight - David Kushner",
  "You Are Not Alone - Michael Jackson",
  "A Moment Apart - ODESZA",
  "Phantom Liberty - Dawid Podsiadło"
];

export default function Portfolio() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>🎮 作品集</h1>
        
        {/* 游戏库板块 */}
        <section className={styles.section}>
          <h2>🎲 精选游戏</h2>
          <div className={styles.gameGrid}>
            {games.map(game => (
              <div key={game} className={styles.gameCard}>
                {game}
              </div>
            ))}
          </div>
        </section>

        {/* 音乐品味板块 */}
        <section className={styles.section}>
          <h2>🎵 近期循环</h2>
          <div className={styles.musicEmbed}>
            {/* Apple Music 播放列表嵌入（需要官方框架） */}
            <iframe 
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
              frameBorder="0" 
              height="150" 
              style={{ width: '100%', maxWidth: '660px', borderRadius: '12px' }}
              src="https://embed.music.apple.com/cn/playlist/music/pl.u-55D6ZJ1H6v7WjjB?l=en" 
            />
          </div>
          <ul className={styles.songList}>
            {songs.map(song => (
              <li key={song}>{song}</li>
            ))}
          </ul>
        </section>

        {/* Wiki 贡献统计板块 */}
        <section className={styles.section}>
          <h2>📊 Project Flight Wiki 贡献</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>500+</div>
              <div className={styles.statLabel}>日均访问量</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>200+</div>
              <div className={styles.statLabel}>编辑次数</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>50+</div>
              <div className={styles.statLabel}>原创页面</div>
            </div>
          </div>
          <p className={styles.wikiNote}>
            ✨ 从零开始，坚持四年。现在 wiki 已是一个活跃的社区，而我学会了 HTML/CSS/JS 和 React。
          </p>
        </section>

        {/* 摄影作品占位 */}
        <section className={styles.section}>
          <h2>📸 摄影作品（即将上线）</h2>
          <div className={styles.photoPlaceholder}>
            🌄 我的摄影作品集正在筹备中，敬请期待...
          </div>
        </section>
      </div>
    </>
  );
}