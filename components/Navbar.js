import Link from 'next/link';

export default function Navbar() {
  const navItems = [
    { name: '机库', path: '/' },
    { name: '装备库', path: '/battlestation' },
    { name: '作品集', path: '/portfolio' },
    { name: '故事', path: '/journey' },
    { name: '网络', path: '/links' },
  ];

  return (
    <nav style={styles.nav}>
      <div style={styles.container}>
        {navItems.map(item => (
          <Link key={item.path} href={item.path} style={styles.link}>
            {item.name}
          </Link>
        ))}
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
    gap: '2rem',
    flexWrap: 'wrap',
  },
  link: {
    color: '#eaeaea',
    textDecoration: 'none',
    fontSize: '1.1rem',
    transition: 'color 0.2s',
  },
  linkHover: {
    color: '#d4af37',
  },
};