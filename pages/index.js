import Navbar from '../components/Navbar';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [recentGames, setRecentGames] = useState([]);
  const [loadingRecent, setLoadingRecent] = useState(true);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchRecent() {
      try {
        const res = await fetch('/api/steam?endpoint=recent');
        const data = await res.json();
        if (data.response && data.response.games) {
          // 构建游戏列表，并确保按最近游玩时间降序（最新的在前）
          let games = data.response.games.map(game => ({
            appid: game.appid,
            name: game.name,
            playtime_2weeks: Math.floor((game.playtime_2weeks || 0) / 60),
            playtime_total: Math.floor((game.playtime_forever || 0) / 60),
            last_played: game.rtime_last_played || 0, // 用于排序的时间戳
            iconUrl: game.img_icon_url
              ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : null,
          }));
          // 显式按 last_played 降序排序（最新的在前）
          games.sort((a, b) => b.last_played - a.last_played);
          // 只取前 8 个
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

  // 卡片背景样式（带模糊）
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
          <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>欢迎来到我的个人网站</p>

          {/* 导航按钮 - 放在最近游玩上方，使其下移 */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/battlestation" style={{ color: '#d4af37', textDecoration: 'none' }}>装备库</a>
            <a href="/portfolio" style={{ color: '#d4af37', textDecoration: 'none' }}>作品集</a>
            <a href="/journey" style={{ color: '#d4af37', textDecoration: 'none' }}>故事</a>
            <a href="/links" style={{ color: '#d4af37', textDecoration: 'none' }}>网络</a>
          </div>

          {/* 最近游玩横向滚动区域 - 下移一个 section */}
          <div style={{ marginTop: '4rem' }}>
            <h2 style={{ marginBottom: '1rem', borderLeft: '4px solid #d4af37', paddingLeft: '1rem' }}>🎮 最近游玩</h2>
            {loadingRecent && <p>加载中...</p>}
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
                    backdropFilter: 'blur(12px)', // 提高模糊度
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
                        ⏱️ 近期 {game.playtime_2weeks || 0} 小时
                      </div>
                      <div style={{ fontSize: '0.7rem', color: '#aaa' }}>
                        总 {game.playtime_total || 0} 小时
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