import Navbar from '../components/Navbar';
import styles from '../styles/Journey.module.css';
import { useTranslation } from '../lib/i18n';

export default function Journey() {
  const { t } = useTranslation();

  // 从语言包读取游戏列表（支持中英文不同内容）
  const gameList = t.journey.games || [
    "The Last Of Us Part II",
    "Uncharted: Legacy of Thieves collection",
    "Forza Horizon 5",
    "Minecraft",
    "Red Dead Redemption II",
    "Cyberpunk 2077",
    "Microsoft Flight Simulator 2020",
    "Shadow of the Tomb Raider"
  ];

  // 从语言包读取音乐列表
  const musicList = t.journey.musicList || [
    "Billie Jean - Michael Jackson",
    "Daylight - David Kushner",
    "You Are Not Alone - Michael Jackson",
    "A Moment Apart - ODESZA",
    "Phantom Liberty - Dawid Podsiadło"
  ];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>{t.journey.title}</h1>
          <p>{t.journey.subtitle}</p>
        </header>

        <div className={styles.timeline}>
          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>🌱</div>
            <div className={styles.milestoneContent}>
              <div className={styles.year}>{t.journey.phase1.year}</div>
              <div className={styles.content}>
                <p>{t.journey.phase1.content}</p>
              </div>
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>⏳</div>
            <div className={styles.milestoneContent}>
              <div className={styles.year}>{t.journey.phase2.year}</div>
              <div className={styles.content}>
                <p>{t.journey.phase2.content}</p>
              </div>
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.milestoneIcon}>🚀</div>
            <div className={styles.milestoneContent}>
              <div className={styles.year}>{t.journey.phase3.year}</div>
              <div className={styles.content}>
                <p>{t.journey.phase3.content}</p>
                <p className={styles.stats}>{t.journey.phase3.stats}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.personal}>
          <h2>{t.journey.favGames}</h2>
          <div className={styles.gameList}>
            {gameList.map(game => (
              <span key={game} className={styles.gameBadge}>
                🎲 {game}
              </span>
            ))}
          </div>

          <h2>{t.journey.recentMusic}</h2>
          <div className={styles.musicList}>
            <ul>
              {musicList.map((song, idx) => (
                <li key={idx}>
                  <span className={styles.musicIcon}>🎧</span> {song}
                </li>
              ))}
            </ul>
            <p className={styles.musicNote}>{t.journey.musicNote}</p>
          </div>
        </div>
      </div>
    </>
  );
}