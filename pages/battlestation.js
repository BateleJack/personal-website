import Navbar from '../components/Navbar';
import styles from '../styles/Games.module.css'; // 复用装备库样式（或单独创建）

export default function Battlestation() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <h1>🛠️ 装备库 · ROG 全家桶</h1>
          <p>我的数字驾驶舱核心配置</p>
        </header>

        <div style={{ background: '#111', borderRadius: '20px', padding: '2rem', marginBottom: '2rem' }}>
          <h2 style={{ color: '#d4af37', marginBottom: '1rem' }}>硬件清单</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li>🔧 CPU: Intel Core i9-13900K</li>
            <li>🎮 GPU: ROG STRIX RTX 5090</li>
            <li>🧠 内存: 芝奇幻锋戟 64GB DDR5</li>
            <li>💾 存储: 三星 990 PRO 2TB NVMe SSD</li>
            <li>⚡ 电源: ROG THOR 1200W</li>
            <li>❄️ 散热: ROG RYUJIN III 360 一体水冷</li>
            <li>🖥️ 机箱: ROG Hyperion GR701</li>
          </ul>
        </div>

        <div style={{ background: '#111', borderRadius: '20px', padding: '2rem' }}>
          <h2 style={{ color: '#d4af37', marginBottom: '1rem' }}>软件与工具链</h2>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            <li>🛠️ 开发: VS Code, Git, Figma</li>
            <li>🎨 设计: Adobe Photoshop, Lightroom</li>
            <li>✈️ 飞行模拟: Microsoft Flight Simulator 2020, Roblox Project Flight</li>
          </ul>
        </div>
      </div>
    </>
  );
}