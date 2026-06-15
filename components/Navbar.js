import { useEffect, useState } from 'react';
import { useTranslation } from '../lib/i18n';

export default function Navbar() {
  const { t, locale } = useTranslation();
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const isZh = currentPath.startsWith('/zh');
  const prefix = isZh ? '/zh' : '';

  const switchToZh = () => {
    const targetPath = '/zh' + (currentPath === '/' ? '' : currentPath);
    if (currentPath.startsWith('/zh')) return;
    localStorage.setItem('batele_lang', 'zh');
    window.location.href = targetPath;
  };

  const switchToEn = () => {
    const targetPath = currentPath.replace(/^\/zh/, '') || '/';
    if (!currentPath.startsWith('/zh')) return;
    localStorage.setItem('batele_lang', 'en');
    window.location.href = targetPath;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        <a href={prefix === '/zh' ? '/zh' : '/'} style={styles.link}>
          {isZh ? '首页' : 'Home'}
        </a>
        <a href={`${prefix}/battlestation`} style={styles.link}>{t.nav.battlestation}</a>
        <a href={`${prefix}/portfolio`} style={styles.link}>{t.nav.portfolio}</a>
        <a href={`${prefix}/journey`} style={styles.link}>{t.nav.journey}</a>
        <a href={`${prefix}/links`} style={styles.link}>{t.nav.links}</a>
        <button onClick={isZh ? switchToEn : switchToZh} style={styles.langButton}>
          {isZh ? 'English' : '中文'}
        </button>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#0a0a0a',
    borderBottom: '1px solid #d4af37',
    padding: '1rem 0',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  link: {
    color: '#eaeaea',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'color 0.2s',
  },
  langButton: {
    background: 'transparent',
    border: '1px solid #d4af37',
    color: '#d4af37',
    padding: '0.3rem 0.8rem',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    transition: 'all 0.2s',
  },
};