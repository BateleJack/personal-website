import Navbar from '../components/Navbar';
import styles from '../styles/Portfolio.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from '../lib/i18n';

export default function Portfolio() {
  const { t } = useTranslation();

  // Wiki 数据
  const [wikiStats, setWikiStats] = useState(null);
  const [loadingWiki, setLoadingWiki] = useState(true);
  const [wikiError, setWikiError] = useState(null);

  // Steam 完整游戏库
  const [ownedGames, setOwnedGames] = useState([]);
  const [loadingOwned, setLoadingOwned] = useState(true);
  const [ownedError, setOwnedError] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(20);

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
          const gamesList = data.response.games.map(game => ({
            appid: game.appid,
            name: game.name,
            playtime_total: Math.floor(game.playtime_forever / 60),
            iconUrl: game.img_icon_url
              ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : null,
          }));
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
        <h1 className={styles.title}>{t.portfolio.title}</h1>

        {/* Steam 完整游戏库板块 */}
        <section className={styles.section}>
          <h2>{t.portfolio.games} · {ownedGames.length} {t.portfolio.gamesCountSuffix}</h2>
          {loadingOwned && <p>{t.common.loading}</p>}
          {ownedError && <p className={styles.errorText}>{t.common.error}: {ownedError}</p>}
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
                        <div className={styles.steamPlaytime}>
                          {t.portfolio.totalPlaytime} {game.playtime_total} {t.portfolio.hours}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              {displayLimit < ownedGames.length && (
                <button onClick={loadMore} className={styles.loadMoreBtn}>
                  {t.portfolio.loadMore} ({ownedGames.length - displayLimit} {t.portfolio.remaining})
                </button>
              )}
            </>
          )}
        </section>

        {/* Wiki 贡献统计板块 */}
        <section className={styles.section}>
          <h2>{t.portfolio.wikiTitle}</h2>
          {loadingWiki && <p>{t.common.loading}</p>}
          {wikiError && <p className={styles.errorText}>{t.portfolio.wikiErrorMsg}</p>}
          {wikiStats && (
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{wikiStats.pages.toLocaleString()}</div>
                <div className={styles.statLabel}>{t.portfolio.wikiTotalPages}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{wikiStats.edits.toLocaleString()}</div>
                <div className={styles.statLabel}>{t.portfolio.wikiTotalEdits}</div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statNumber}>{wikiStats.userEditCount.toLocaleString()}</div>
                <div className={styles.statLabel}>{t.portfolio.wikiMyEdits}</div>
              </div>
            </div>
          )}
          <p className={styles.wikiNote}>{t.portfolio.wikiNote}</p>
        </section>

        {/* 摄影作品占位 */}
        <section className={styles.section}>
          <h2>{t.portfolio.photoTitle}</h2>
          <div className={styles.photoPlaceholder}>
            {t.portfolio.photoPlaceholder}
          </div>
        </section>
      </div>
    </>
  );
}