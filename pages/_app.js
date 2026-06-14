import '../styles/global.css';
import Head from 'next/head';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* 这个 div 只负责撑满高度，不设背景，让内部页面组件自行决定背景 */}
      <div style={{ minHeight: '100vh' }}>
        <Component {...pageProps} />
      </div>
    </>
  );
}