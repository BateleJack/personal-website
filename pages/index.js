import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
        color: '#eaeaea',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        padding: '2rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          background: 'linear-gradient(135deg, #e4c580 0%, #b88b2c 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent'
        }}>Batele Jack</h1>
        <p style={{ fontSize: '1.2rem', marginTop: '1rem' }}>欢迎来到我的个人网站</p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '1.5rem' }}>
          <a href="/battlestation" style={{ color: '#d4af37', textDecoration: 'none' }}>装备库</a>
          <a href="/portfolio" style={{ color: '#d4af37', textDecoration: 'none' }}>作品集</a>
          <a href="/journey" style={{ color: '#d4af37', textDecoration: 'none' }}>故事</a>
          <a href="/links" style={{ color: '#d4af37', textDecoration: 'none' }}>网络</a>
        </div>
      </div>
    </>
  );
}