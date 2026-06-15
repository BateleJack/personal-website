import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* hreflang 备用链接 */}
        <link rel="alternate" href="https://batelejack.com/" hreflang="en" />
        <link rel="alternate" href="https://batelejack.com/zh/" hreflang="zh" />
        <link rel="alternate" href="https://batelejack.com/" hreflang="x-default" />

        {/* 自动检测语言并跳转 */}
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var savedLang = localStorage.getItem('batele_lang');
              if (savedLang === 'zh') {
                if (!window.location.pathname.startsWith('/zh')) {
                  var zhPath = '/zh' + (window.location.pathname === '/' ? '' : window.location.pathname);
                  window.location.replace(zhPath);
                }
                return;
              }
              if (savedLang === 'en') return;

              var userLang = navigator.language || navigator.userLanguage;
              var isZh = userLang && userLang.toLowerCase().startsWith('zh');
              var currentIsZh = window.location.pathname.startsWith('/zh');
              if (isZh && !currentIsZh) {
                var newPath = '/zh' + (window.location.pathname === '/' ? '' : window.location.pathname);
                window.location.replace(newPath);
              }
            })();
          `,
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}