import Navbar from '../components/Navbar';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from '../lib/i18n';

export default function Home() {
  const { t } = useTranslation();

  const [recentGames, setRecentGames] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch('/api/steam?endpoint=recent');
        const data = await res.json();
        if (data.response && data.response.games) {
          let games = data.response.games.map(game => ({
            appid: game.appid,
            name: game.name,
            playtime_2weeks: Math.floor((game.playtime_2weeks || 0) / 60),
            playtime_total: Math.floor((game.playtime_forever || 0) / 60),
            last_played: game.rtime_last_played || 0,
            iconUrl: game.img_icon_url
              ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : null,
          }));
          games.sort((a, b) => b.last_played - a.last_played);
          games = games.slice(0, 8);
          setRecentGames(games);
        }
      } catch (error) {
        console.error('Failed to fetch recent games:', error);
      } finally {
        setLoadingRecent(false);
      }
    }
    fetchRecent();
  }, []);

  const getCardStyle = (iconUrl) => ({
    backgroundImage: iconUrl ? `linear-gradient(135deg, rgba(20,20,40,0.9), rgba(0,0,0,0.95)), url(${iconUrl})` : 'linear-gradient(135deg, #1a1a2e, #0a0a0a)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  });

  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: '#eaeaea',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '3rem',
            background: 'linear-gradient(135deg, #e4c580 0%, #b88b2c 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center'
          }}>Batele Jack</h1>
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>{t.home.welcome}</p>

          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ marginBottom: '1rem', borderLeft: '4px solid #d4af37', paddingLeft: '1rem' }}>{t.home.recentGames}</h2>
            {loadingRecent && <p>{t.common.loading}</p>}
            <div ref={scrollRef} style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'thin',
              paddingBottom: '0.5rem',
            }} className="custom-scrollbar">
              <div style={{ display: 'flex', gap: '1rem' }}>
                {recentGames.map(game => (
                  <div key={game.appid} style={{
                    ...getCardStyle(game.iconUrl),
                    minWidth: '260px',
                    maxWidth: '260px',
                    borderRadius: '16px',
                    padding: '0.8rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    backdropFilter: 'blur(12px)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    transition: 'transform 0.2s',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {game.iconUrl && (
                      <img src={game.iconUrl} alt={game.name} style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        marginRight: '0.8rem',
                      }} />
                    )}
                    <div style={{ whiteSpace: 'normal' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '1rem' }}>{game.name}</div>
                      <div style={{ fontSize: '0.75rem', color: '#ccc', marginTop: '0.2rem' }}>
                        {t.home.recentHours} {game.playtime_2weeks || 0} {t.home.hours}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#aaa' }}>
                        {t.home.totalHours} {game.playtime_total || 0} {t.home.hours}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}