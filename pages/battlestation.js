import Navbar from '../components/Navbar';
import styles from '../styles/Battlestation.module.css';

export default function Battlestation() {
  // 硬件数据：交替布局需要奇偶不同方向，图片区使用占位图标
  const hardware = [
    {
      name: 'ROG Swift OLED PG32UCDMR',
      subtitle: '32" 4K OLED | 240Hz | 0.03ms',
      desc: '量子点 OLED 面板，G-SYNC 兼容，HDR 真黑 400，专为游戏与创作设计。',
      link: 'https://rog.asus.com/monitors/27-to-31-5-inches/rog-swift-oled-pg32ucdmr',
      icon: '🖥️',
    },
    {
      name: 'G.Skill Trident Z5 RGB',
      subtitle: '32GB×2 DDR5-6400 CL32',
      desc: '三星 B-die，RGB 幻彩灯效，支持 Intel XMP 3.0。',
      link: 'https://www.gskill.com/product/165/374/1665644504/F5-6400J3239G32GX2-TZ5RK',
      icon: '🧠',
    },
    {
      name: 'ROG Astral RTX 5090 BTF',
      subtitle: '32GB GDDR7 | 助力下一代游戏',
      desc: 'BTF 背插设计，均热板散热，全金属背板，支持 DLSS 4。',
      link: 'https://rog.asus.com/graphics-cards/graphics-cards/rog-astral/rog-astral-rtx5090-o32g-btf-gaming/',
      icon: '🎮',
    },
    {
      name: 'Intel Core Ultra 9 285K',
      subtitle: 'Arrow Lake | 24核 (8P+16E)',
      desc: 'LGA1851 平台，最高 5.7GHz，内置 NPU 加速 AI 任务。',
      link: 'https://www.techpowerup.com/cpu-specs/core-ultra-9-285k.c3773',
      icon: '⚡',
    },
    {
      name: 'ROG Strix Scope II 96 RX',
      subtitle: '96% 布局 | 无线三模 | RX 光轴',
      desc: '铝合金上盖，PBT 键帽，SpeedNova 无线技术，续航 1500 小时。',
      link: 'https://rog.asus.com/keyboards/keyboards/aura-rgb/rog-strix-scope-ii-96-rx-wireless/',
      icon: '⌨️',
    },
  ];

  // 其他简单列表的硬件
  const otherHardware = [
    'ROG MAXIMUS Z790 HERO 主板',
    'ROG THOR 1200W 电源',
    'ROG RYUJIN III 360 一体水冷',
    'ROG Hyperion GR701 机箱',
    '三星 990 PRO 2TB NVMe SSD',
    'ROG 棱镜 S 无线耳机',
    'ROG 月刃无线 AP 鼠标',
  ];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>🛠️ 装备库 · ROG 全家桶</h1>

        {/* 简介 section */}
        <div className={styles.intro}>
          <p>这里是 Batele Jack 的数字驾驶舱，一个由 ROG 全家桶构建的性能堡垒。从视觉到交互，每一处都追求极致的游戏与创作体验。以下详细展示核心部件的特性与参数。</p>
        </div>

        {/* 详细硬件展示，交替左右布局 */}
        {hardware.map((item, index) => (
          <div className={styles.hardwareSection} key={item.name}>
            <div className={`${styles.card} ${index % 2 === 1 ? styles.reverse : ''}`}>
              <div className={styles.imageArea}>
                <span>{item.icon}</span>
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

        {/* 其他硬件简单列表 */}
        <div className={styles.simpleList}>
          <h2 className={styles.sectionTitle}>⚙️ 其他装备</h2>
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