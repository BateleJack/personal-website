import Navbar from '../components/Navbar';
import styles from '../styles/Links.module.css';
import { useEffect, useState } from 'react';

const socialLinks = [
  { name: 'Steam', url: 'https://steamcommunity.com/profiles/76561199477098499', icon: 'https://cdn.simpleicons.org/steam/white' },
  { name: 'YouTube', url: 'https://www.youtube.com/channel/UCvWG_KhLBmvBKM7ePJc-UIQ', icon: 'https://cdn.simpleicons.org/youtube/white' },
  { name: 'Instagram', url: 'https://www.instagram.com/batelejack', icon: 'https://cdn.simpleicons.org/instagram/white' },
  { name: 'Xbox', url: 'https://www.xbox.com/', icon: 'https://cdn.simpleicons.org/xbox/white' },
  { name: 'GitHub', url: 'https://github.com/BateleJack', icon: 'https://cdn.simpleicons.org/github/white' },
  { name: 'Roblox', url: 'https://roblox.com/users/3464832936/profile', icon: 'https://cdn.simpleicons.org/roblox/white' },
];

const discordInvites = [
  { name: 'Emirates Virtual', url: 'https://discord.gg/VDyc4924pM' },
  { name: 'Star Alliance Virtual', url: 'https://discord.gg/nwpYPRgH2x' },
];

export default function Links() {
  const [emailDisplay, setEmailDisplay] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  useEffect(() => {
    // 动态拼接邮箱地址，防止爬虫直接抓取
    const user = 'batelejack';
    const domain = 'gmail.com';
    const fullEmail = `${user}@${domain}`;
    setEmailAddress(fullEmail);
  }, []);

  const showEmail = () => {
    setEmailDisplay(true);
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>🔗 网络枢纽</h1>
        <p className={styles.subtitle}>我的所有线上据点，欢迎访问~</p>

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
          {!emailDisplay ? (
            <div>
              <p>
                如有合作或交流意愿，可以点击下方按钮显示邮箱：
              </p>
              <button onClick={showEmail} className={styles.emailButton}>
                显示邮箱地址
              </button>
            </div>
          ) : (
            <p>
              📧 发送邮件至：<strong>
                <a href={`mailto:${emailAddress}`} className={styles.emailLink}>
                  {emailAddress}
                </a>
              </strong>
            </p>
          )}
        </div>
      </div>
    </>
  );
}