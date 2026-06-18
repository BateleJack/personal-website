const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  exportPathMap: async function () {
    const pages = ['/battlestation', '/portfolio', '/journey', '/links', '/log'];
    const paths = {};

    // 英文版首页
    paths['/'] = { page: '/' };

    // 英文版其他页面
    pages.forEach(page => {
      paths[page] = { page };
    });

    // 中文版其他页面（/zh 开头的路径）
    pages.forEach(page => {
      const zhPage = `/zh${page}`;
      paths[zhPage] = { page };
    });

    return paths;
  },
};

module.exports = nextConfig;