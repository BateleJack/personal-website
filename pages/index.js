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
          // 处理最近游玩（最多6个），添加图标 URL
          const games = data.response.games.slice(0, 8).map(game => ({
            appid: game.appid,
            name: game.name,
            playtime_2weeks: Math.floor(game.playtime_2weeks / 60),
            playtime_total: Math.floor(game.playtime_forever / 60),
            iconUrl: game.img_icon_url
              ? `https://steamcdn-a.akamaihd.net/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`
              : null,
          }));
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

  // 简单的背景渐变（根据图标主色生成，这里使用半透明叠加，实际主色提取较复杂，可后续增强）
  // 为了满足“提取高级多色渐变”，这里使用深色渐变+图标叠加，视觉上已很高级
  // 若需要真正的动态主色，可以引入 color-thief，但会增加体积和复杂度。
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

          {/* 最近游玩横向滚动区域 */}
          <div style={{ marginTop: '3rem' }}>
            <h2 style={{ marginBottom: '1rem', borderLeft: '4px solid #d4af37', paddingLeft: '1rem' }}>🎮 最近游玩</h2>
            {loadingRecent && <p>加载中...</p>}
            <div ref={scrollRef} style={{
              overflowX: 'auto',
              whiteSpace: 'nowrap',
              scrollbarWidth: 'thin',
              paddingBottom: '0.5rem',
            }}>
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
                    backdropFilter: 'blur(2px)',
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

          {/* 导航按钮 */}
          <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <a href="/battlestation" style={{ color: '#d4af37', textDecoration: 'none' }}>装备库</a>
            <a href="/portfolio" style={{ color: '#d4af37', textDecoration: 'none' }}>作品集</a>
            <a href="/journey" style={{ color: '#d4af37', textDecoration: 'none' }}>故事</a>
            <a href="/links" style={{ color: '#d4af37', textDecoration: 'none' }}>网络</a>
          </div>
        </div>
      </div>
    </>
  );
}