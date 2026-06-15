import Navbar from '../components/Navbar';
import styles from '../styles/Links.module.css';
import { useEffect, useState } from 'react';
import { useTranslation } from '../lib/i18n';

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
  const { t } = useTranslation();

  const [emailDisplay, setEmailDisplay] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');

  useEffect(() => {
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
        <h1 className={styles.title}>{t.links.title}</h1>
        <p className={styles.subtitle}>{t.links.subtitle}</p>

        <div className={styles.cardGrid}>
          {socialLinks.map(link => (
            <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className={styles.card}>
              <img src={link.icon} alt={link.name} className={styles.cardIcon} />
              <span className={styles.cardName}>{link.name}</span>
            </a>
          ))}
        </div>

        <div className={styles.discordSection}>
          <h2>{t.links.discordTitle}</h2>
          <div className={styles.discordGrid}>
            {discordInvites.map(invite => (
              <a key={invite.name} href={invite.url} target="_blank" rel="noopener noreferrer" className={styles.discordCard}>
                {invite.name}
              </a>
            ))}
          </div>
        </div>

        <div className={styles.contact}>
          <h2>{t.links.contactTitle}</h2>
          {!emailDisplay ? (
            <div>
              <p>{t.links.contactPrompt}</p>
              <button onClick={showEmail} className={styles.emailButton}>
                {t.links.showEmailButton}
              </button>
            </div>
          ) : (
            <p>
              {t.links.emailLabel}
              <strong>
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