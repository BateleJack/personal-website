import Navbar from '../components/Navbar';
import styles from '../styles/Portfolio.module.css';
import { useEffect, useState } from 'react';

// 静态数据（精选游戏、音乐列表）
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

const songs = [
  "Billie Jean - Michael Jackson",
  "Daylight - David Kushner",
  "You Are Not Alone - Michael Jackson",
  "A Moment Apart - ODESZA",
  "Phantom Liberty - Dawid Podsiadło"
];

export default function Portfolio() {
  // Wiki 数据
  const [wikiStats, setWikiStats] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(true);
  const [wikiError, setWikiError] = useState(null);

  // Steam 完整游戏库
  const [ownedGames, setOwnedGames] = useState([]);
  const [loadingOwned, setLoadingOwned] = useState(true);
  const [ownedError, setOwnedError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(20); // 初始显示20个，点击加载更多

  // 获取 Wiki 数据
  useEffect(() => {
    async function fetchWikiStats() {
      try {
        const res = await fetch('/api/wiki-stats');
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setWikiStats(data);
      } catch (err) {
        setWikiError(err.message);
      } finally {
        setLoadingWiki(false);
      }
    }
    fetchWikiStats();
  }, []);

  // 获取 Steam 完整游戏库
  useEffect(() => {
    async function fetchOwnedGames() {
      try {
        const res = await fetch('/api/steam?endpoint=owned');
        if (!res.ok) throw new Error('Steam API error');
        const data = await res.json();
        if (data.response && data.response.games) {
          // 处理游戏数据，添加图标 URL 和总游玩时间（小时）
          const gamesList = data.response.games.map(game => ({
            appid: game.appid,
            name: game.name,
            playtime_total: Math.floor(game.playtime_forever / 60),
            iconUrl: game.img_icon_url
              ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : null,
          }));
          // 按总游玩时间降序排序
          gamesList.sort((a, b) => b.playtime_total - a.playtime_total);
          setOwnedGames(gamesList);
        } else {
          setOwnedError('No games data returned');
        }
      } catch (err) {
        setOwnedError(err.message);
      } finally {
        setLoadingOwned(false);
      }
    }
    fetchOwnedGames();
  }, []);

  const loadMore = () => {
    setDisplayLimit(prev => prev + 20);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>🎮 作品集</h1>

        {/* 精选游戏板块 */}
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

        {/* Steam 完整游戏库板块（竖排，每行两个） */}
        <section className={styles.section}>
          <h2>🎮 Steam 游戏库 · {ownedGames.length} 款</h2>
          {loadingOwned && <p>加载游戏中...</p>}
          {ownedError && <p className={styles.errorText}>加载失败: {ownedError}</p>}
          {!loadingOwned && !ownedError && (
            <>
              <div className={styles.steamGrid}>
                {ownedGames.slice(0, displayLimit).map(game => (
                  <div key={game.appid} className={styles.steamCard}>
                    {game.iconUrl && (
                      <img src={game.iconUrl} alt={game.name} className={styles.steamIcon} />
                    )}
                    <div className={styles.steamInfo}>
                      <div className={styles.steamName}>{game.name}</div>
                      {game.playtime_total > 0 && (
                        <div className={styles.steamPlaytime}>⏱️ 总游玩 {game.playtime_total} 小时</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {displayLimit < ownedGames.length && (
                <button onClick={loadMore} className={styles.loadMoreBtn}>
                  加载更多 ({ownedGames.length - displayLimit} 款剩余)
                </button>
              )}
            </>
          )}
        </section>

        {/* 音乐品味板块 */}
        <section className={styles.section}>
          <h2>🎵 近期循环</h2>
          <div className={styles.musicEmbed}>
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              frameBorder="0"
              height="300"
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
          {loadingWiki && <p>加载统计中...</p>}
          {wikiError && <p className={styles.errorText}>无法获取实时数据，请稍后重试。</p>}
          {wikiStats && (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{wikiStats.pages.toLocaleString()}</div>
                <div className={styles.statLabel}>总页面数</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{wikiStats.edits.toLocaleString()}</div>
                <div className={styles.statLabel}>总编辑次数</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{wikiStats.userEditCount.toLocaleString()}</div>
                <div className={styles.statLabel}>我的编辑次数</div>
              </div>
            </div>
          )}
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