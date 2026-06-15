import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from '../lib/i18n';

export default function Navbar() {
  const { pathname } = useRouter();
  const { t, locale } = useTranslation();
  const isZh = locale === 'zh';
  const prefix = isZh ? '/zh' : '';

  const isHome = pathname === '/' || pathname === '/zh';

  const navItems = [
    { name: t.nav.battlestation, path: `${prefix}/battlestation` },
    { name: t.nav.portfolio, path: `${prefix}/portfolio` },
    { name: t.nav.journey, path: `${prefix}/journey` },
    { name: t.nav.links, path: `${prefix}/links` },
  ];

  const switchToZh = () => {
    let targetPath = '/zh' + (pathname === '/' ? '' : pathname === '/zh' ? '' : pathname);
    // 如果当前已经是 /zh 路径，不做跳转
    if (pathname.startsWith('/zh')) return;
    localStorage.setItem('batele_lang', 'zh');
    window.location.href = targetPath;
  };

  const switchToEn = () => {
    const targetPath = pathname.replace(/^\/zh/, '') || '/';
    if (!pathname.startsWith('/zh')) return;
    localStorage.setItem('batele_lang', 'en');
    window.location.href = targetPath;
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {!isHome && (
          <Link href={prefix === '/zh' ? '/zh' : '/'} style={styles.link}>
            {isZh ? '首页' : 'Home'}
          </Link>
        )}
        {navItems.map(item => (
          <Link key={item.path} href={item.path} style={styles.link}>
            {item.name}
          </Link>
        ))}
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