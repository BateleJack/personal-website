import Navbar from '../components/Navbar';
import styles from '../styles/Journey.module.css';

export default function Journey() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>📜 从零到一：Project Flight Wiki 的故事</h1>
          <p>一个关于坚持、热爱与社区凝聚力的旅程</p>
        </header>

        <div className={styles.timeline}>
          <div className={styles.milestone}>
            <div className={styles.year}>前两年 · 荒芜期</div>
            <div className={styles.content}>
              <p>最初两年，几乎没有人对 PF Wiki 感兴趣。这很正常——当时那里什么都没有，literally nothing。我不会写 HTML 或 CSS，每篇文章都艰难地从其他服务器复制模板来完成。直到我的表哥在 PF Discord 里疯狂“广告”，才终于吸引来了第一批贡献者。</p>
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.year}>接下来两年 · 缓慢积累</div>
            <div className={styles.content}>
              <p>我继续贡献和改进 wiki，但同时也面临着学业的压力。我只能在空闲时间边听 Spotify，边阅读文章，边往 wiki 里添加内容。那段时期，平均每日访问量达到了 500。</p>
            </div>
          </div>

          <div className={styles.milestone}>
            <div className={styles.year}>2024 暑假 · 爆发与成长</div>
            <div className={styles.content}>
              <p>看到 PF 游戏本身有了巨大的改进，我受到鼓舞，决定继续推进 wiki——而且那时我已经玩够了游戏，感觉有点厌倦。我们迎来了几位活跃成员，大家一起让 wiki 变得更好。我同时处理无数任务：浏览器标签页一度达到 16 个！Trello、寻找改进点、从其他 wiki 移植 CSS 和 JavaScript、撰写文章、截图…… 幸好我的电脑足够强大。</p>
              <p className={styles.stats}>✨ 如今，PF Wiki 已是一个活跃的社区，而我学会了 HTML/CSS/JS，甚至正在用 React 构建这个网站。</p>
            </div>
          </div>
        </div>

        <div className={styles.personal}>
          <h2>🎮 关于我喜欢的游戏</h2>
          <div className={styles.gameList}>
            {[
              "The Last Of Us Part II",
              "Uncharted: Legacy of Thieves collection",
              "Forza Horizon 5",
              "Minecraft",
              "Red Dead Redemption II",
              "Cyberpunk 2077",
              "Microsoft Flight Simulator 2020",
              "Shadow of the Tomb Raider"
            ].map(game => (
              <span key={game} className={styles.gameBadge}>{game}</span>
            ))}
          </div>

          <h2>🎵 近期音乐品味</h2>
          <div className={styles.musicList}>
            <ul>
              <li>Billie Jean - Michael Jackson</li>
              <li>Daylight - David Kushner</li>
              <li>You Are Not Alone - Michael Jackson</li>
              <li>A Moment Apart - ODESZA</li>
              <li>Phantom Liberty - Dawid Podsiadło</li>
            </ul>
            <p className={styles.musicNote}>🎧 使用 Apple Music 享受无损音质和精致动画。</p>
          </div>
        </div>
      </div>
    </>
  );
}