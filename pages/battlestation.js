import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import styles from '../styles/Battlestation.module.css';
import { useTranslation } from '../lib/i18n';

export default function Battlestation() {
  const { t } = useTranslation();

  useEffect(() => {
    document.body.classList.add('page-battlestation');
    return () => document.body.classList.remove('page-battlestation');
  }, []);

  const hardware = [
    {
      name: 'Intel Core Ultra 9 285K',
      subtitle: 'Arrow Lake | 24核 (8P+16E)',
      desc: 'LGA1851 平台，最高 5.7GHz，内置 NPU 加速 AI 任务。',
      link: 'https://www.techpowerup.com/cpu-specs/core-ultra-9-285k.c3773',
      image: "/images/Intel Core Ultra 9 285K.png",
    },
    {
      name: 'ROG Astral RTX 5090 BTF',
      subtitle: '32GB GDDR7 | 助力下一代游戏',
      desc: 'BTF 背插设计，均热板散热，全金属背板，支持 DLSS 4。',
      link: 'https://rog.asus.com/graphics-cards/graphics-cards/rog-astral/rog-astral-rtx5090-o32g-btf-gaming/',
      image: 'https://dlcdnwebimgs.asus.com/gain/3D2EBC2B-5946-44BC-9CE2-BDEEE3C678EC/w2000/h1470',
    },
    {
      name: 'G.Skill Trident Z5 RGB',
      subtitle: '32GB×2 DDR5-6400 CL32',
      desc: '三星 B-die，RGB 幻彩灯效，支持 Intel XMP 3.0。',
      link: 'https://www.gskill.com/product/165/374/1665644504/F5-6400J3239G32GX2-TZ5RK',
      image: 'https://www.gskill.com/_upload/images/166564450413.png',
    },
    {
      name: 'ROG MAXIMUS Z790 HERO',
      subtitle: 'ATX | DDR5 | PCIe 5.0',
      desc: '旗舰 Z790 芯片组，20+1 供电模组，支持 PCIe 5.0 显卡与 SSD，AI 超频。',
      link: 'https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z790-hero/',
      image: 'https://dlcdnwebimgs.asus.com/files/media/766c8dcc-4443-4d99-bd1d-ebdf1b1711be/v1/img/kv/pd.png',
    },
    {
      name: 'ROG Strix Scope II 96 RX',
      subtitle: '96% 布局 | 无线三模 | RX 光轴',
      desc: '铝合金上盖，PBT 键帽，SpeedNova 无线技术，续航 1500 小时。',
      link: 'https://rog.asus.com/keyboards/keyboards/aura-rgb/rog-strix-scope-ii-96-rx-wireless/',
      image: "/images/ROG Strix Scope II 96 RX.png",
    },
    {
      name: 'ROG Swift OLED PG32UCDMR',
      subtitle: '32" 4K OLED | 240Hz | 0.03ms',
      desc: '量子点 OLED 面板，G-SYNC 兼容，HDR 真黑 400，专为游戏与创作设计。',
      link: 'https://rog.asus.com/monitors/27-to-31-5-inches/rog-swift-oled-pg32ucdmr/',
      image: 'https://dlcdnwebimgs.asus.com/files/media/51ec6832-7d34-4d1b-ab01-effc0d095fd8/v1/img/kv/kv_cover.png',
    },
  ];

  const otherHardware = [
    'ROG Thor 1200W Plantinum III 电源',
    'ROG Ryuo IV SLC 360 一体水冷',
    'ROG Hyperion GR701 BTF 机箱',
    '三星 9100 PRO 4TB NVMe',
    'HiFiman Ananda Nano',
    'Logitech G502X Lightspeed 无线鼠标',
  ];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>{t.battlestation.title}</h1>
        <div className={styles.introWrapper}>
          <div className={styles.introText}>
            <p>{t.battlestation.intro}</p>
          </div>
        </div>

        {/* 硬件卡片，图片浮动在左侧/右侧，交替布局 */}
        {hardware.map((item, index) => (
          <div className={styles.hardwareSection} key={item.name}>
            <div className={`${styles.card} ${index % 2 === 1 ? styles.reverse : ''}`}>
              <div className={styles.imageArea}>
                <img src={item.image} alt={item.name} className={styles.hardwareImage} />
              </div>
              <div className={styles.infoArea}>
                <h3>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.name}
                  </a>
                </h3>
                <div className={styles.sub}>{item.subtitle}</div>
                <div className={styles.desc}>{item.desc}</div>
              </div>
            </div>
          </div>
        ))}

        {/* 其他装备列表 */}
        <div className={styles.simpleList}>
          <h2 className={styles.sectionTitle}>⚙️ {t.battlestation.other}</h2>
          <ul>
            {otherHardware.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}