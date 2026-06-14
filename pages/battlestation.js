import Navbar from '../components/Navbar';
import styles from '../styles/Battlestation.module.css';

export default function Battlestation() {
  // 硬件数据：按 CPU → 显卡 → 主板 → 内存 → 显示器 → 键盘 顺序排列
  const hardware = [
    {
      name: 'Intel Core Ultra 9 285K',
      subtitle: 'Arrow Lake | 24核 (8P+16E)',
      desc: 'LGA1851 平台，最高 5.7GHz，内置 NPU 加速 AI 任务。',
      link: 'https://www.techpowerup.com/cpu-specs/core-ultra-9-285k.c3773',
      icon: 'https://i.extremetech.com/imagery/content-types/046W7xobkm1jbDMMxIY0NW9/hero-image.fit_lim.v1729810573.jpg', // 替换为真实图片
    },
    {
      name: 'ROG Astral RTX 5090 BTF',
      subtitle: '32GB GDDR7 | 助力下一代游戏',
      desc: 'BTF 背插设计，均热板散热，全金属背板，支持 DLSS 4。',
      link: 'https://rog.asus.com/graphics-cards/graphics-cards/rog-astral/rog-astral-rtx5090-o32g-btf-gaming/',
      icon: 'https://dlcdnwebimgs.asus.com/gain/3D2EBC2B-5946-44BC-9CE2-BDEEE3C678EC/w2000/h1470',
    },
    {
      name: 'ROG MAXIMUS Z790 HERO',
      subtitle: 'ATX | DDR5 | PCIe 5.0',
      desc: '旗舰 Z790 芯片组，20+1 供电模组，支持 PCIe 5.0 显卡与 SSD，AI 超频。',
      link: 'https://rog.asus.com/motherboards/rog-maximus/rog-maximus-z790-hero/',
      icon: 'https://dlcdnwebimgs.asus.com/files/media/766c8dcc-4443-4d99-bd1d-ebdf1b1711be/v1/img/kv/pd.png',
    },
    {
      name: 'G.Skill Trident Z5 RGB',
      subtitle: '32GB×2 DDR5-6400 CL32',
      desc: '三星 B-die，RGB 幻彩灯效，支持 Intel XMP 3.0。',
      link: 'https://www.gskill.com/product/165/374/1665644504/F5-6400J3239G32GX2-TZ5RK',
      icon: 'https://www.gskill.com/img/overview/tz5-rgb/04-trident-z5-rgb-extreme-memory-performance.jpg',
    },
    {
      name: 'ROG Swift OLED PG32UCDMR',
      subtitle: '32" 4K OLED | 240Hz | 0.03ms',
      desc: '量子点 OLED 面板，G-SYNC 兼容，HDR 真黑 400，专为游戏与创作设计。',
      link: 'https://rog.asus.com/monitors/27-to-31-5-inches/rog-swift-oled-pg32ucdmr',
      icon: 'https://dlcdnwebimgs.asus.com/files/media/51ec6832-7d34-4d1b-ab01-effc0d095fd8/v1/img/kv/kv_cover.png',
    },
    {
      name: 'ROG Strix Scope II 96 RX',
      subtitle: '96% 布局 | 无线三模 | RX 光轴',
      desc: '铝合金上盖，PBT 键帽，SpeedNova 无线技术，续航 1500 小时。',
      link: 'https://rog.asus.com/keyboards/keyboards/aura-rgb/rog-strix-scope-ii-96-rx-wireless/',
      icon: 'https://dlcdnwebimgs.asus.com/gain/31D04B15-614F-4914-A87D-F14517ED8727/w2000/h1470',
    },
  ];

  // 其他简单列表的硬件（已移除主板，并添加 HiFiman Ananda Nano）
  const otherHardware = [
    'ROG THOR 1200W 电源',
    'ROG RYUJIN III 360 一体水冷',
    'ROG Hyperion GR701 机箱',
    '三星 990 PRO 2TB NVMe SSD',
    'ROG 棱镜 S 无线耳机',
    'ROG 月刃无线 AP 鼠标',
    'HiFiman Ananda Nano',  // 新增耳机
  ];

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>🛠️ 装备库 · ROG 全家桶</h1>

        {/* 简介 section + 机箱照片（3:4 横排） */}
        <div className={styles.introWrapper}>
          <div className={styles.introText}>
            <p>这里是 Batele Jack 的数字驾驶舱，一个由 ROG 全家桶构建的性能堡垒。从视觉到交互，每一处都追求极致的游戏与创作体验。以下详细展示核心部件的特性与参数。</p>
          </div>
          <div className={styles.casePhoto}>
            {/* 3:4 横排机箱照片占位，请替换为真实图片 URL */}
            <img
              src="/images/IMG_20260614_234831.jpg.jpeg"
              alt="ROG Hyperion GR701 机箱"
              className={styles.caseImage}
            />
          </div>
        </div>

        {/* 详细硬件展示，交替左右布局 */}
        {hardware.map((item, index) => (
          <div className={styles.hardwareSection} key={item.name}>
            <div className={`${styles.card} ${index % 2 === 1 ? styles.reverse : ''}`}>
              <div className={styles.imageArea}>
                <img src={item.icon} alt={item.name} className={styles.hardwareImage} />
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