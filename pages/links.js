import Navbar from '../components/Navbar';
import styles from '../styles/Links.module.css';

const socialLinks = [
  { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561199477098499', icon: 'https://cdn.simpleicons.org/steam/white' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCvWG_KhLBmvBKM7ePJc-UIQ', icon: 'https://cdn.simpleicons.org/youtube/white' },
  { name: 'Instagram', url: 'https://www.instagram.com/batelejack', icon: 'https://cdn.simpleicons.org/instagram/white' },
  { name: 'Xbox', url: 'https://www.xbox.com/', icon: 'https://cdn.simpleicons.org/xbox/white' },
  { name: 'GitHub', url: 'https://github.com/BateleJack', icon: 'https://cdn.simpleicons.org/github/white' },
  { name: 'Roblox', url: 'https://roblox.com/users/3464832936/profile', icon: 'https://cdn.simpleicons.org/roblox/white' },
];

const discordInvites = [
  { name: 'Project Flight Community', url: 'https://discord.gg/你的邀请码' },
  { name: 'Star Alliance Virtual', url: 'https://discord.gg/你的邀请码' },
];

export default function Links() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>🔗 网络枢纽</h1>
        <p className={styles.subtitle}>我的所有线上据点，欢迎来玩~</p>

        <div className={styles.cardGrid}>
          {socialLinks.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <img src={link.icon} alt={link.name} className={styles.cardIcon} />
              <span className={styles.cardName}>{link.name}</span>
            </a>
          ))}
        </div>

        <div className={styles.discordSection}>
          <h2>💬 Discord 社区</h2>
          <div className={styles.discordGrid}>
            {discordInvites.map(invite => (
              <a key={invite.name} href={invite.url} target="_blank" rel="noopener noreferrer" className={styles.discordCard}>
                {invite.name}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.contact}>
          <h2>📧 联系方式</h2>
          <p>如有合作或交流意愿，可以发送邮件至：<strong>batelejack@gmail.com</strong></p>
        </div>
      </div>
    </>
  );
}