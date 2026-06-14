import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function DebugLog() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDebugInfo() {
      const results = [];

      // 1. 测试 Steam API 代理
      try {
        const res = await fetch('/api/steam?endpoint=owned');
        const status = res.status;
        const headers = {};
        res.headers.forEach((v, k) => { headers[k] = v; });
        let body;
        try {
          body = await res.clone().json();
        } catch {
          body = await res.text();
        }
        results.push({
          title: 'GET /api/steam?endpoint=owned',
          status,
          headers,
          body,
        });
      } catch (err) {
        results.push({ title: 'GET /api/steam?endpoint=owned', error: err.message });
      }

      // 2. 测试最近游玩端点
      try {
        const res = await fetch('/api/steam?endpoint=recent');
        const status = res.status;
        let body;
        try {
          body = await res.clone().json();
        } catch {
          body = await res.text();
        }
        results.push({
          title: 'GET /api/steam?endpoint=recent',
          status,
          body,
        });
      } catch (err) {
        results.push({ title: 'GET /api/steam?endpoint=recent', error: err.message });
      }

      setLogs(results);
      setLoading(false);
    }

    fetchDebugInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem', background: '#0a0a0a', color: '#eaeaea' }}>
        <h1>📋 调试日志</h1>
        {loading && <p>加载中...</p>}
        {logs.map((log, idx) => (
          <div key={idx} style={{ marginBottom: '2rem', border: '1px solid #d4af37', borderRadius: '8px', padding: '1rem', background: '#111' }}>
            <h3>{log.title}</h3>
            {log.status && <p><strong>状态码:</strong> {log.status}</p>}
            {log.headers && (
              <details>
                <summary>响应头</summary>
                <pre style={{ fontSize: '0.7rem', overflowX: 'auto' }}>{JSON.stringify(log.headers, null, 2)}</pre>
              </details>
            )}
            <details>
              <summary>响应体</summary>
              <pre style={{ fontSize: '0.7rem', overflowX: 'auto' }}>{typeof log.body === 'object' ? JSON.stringify(log.body, null, 2) : log.body}</pre>
            </details>
            {log.error && <p style={{ color: '#b91c1c' }}>错误: {log.error}</p>}
          </div>
        ))}
      </div>
    </>
  );
}