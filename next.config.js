const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  exportPathMap: async function () {
    const pages = ['/', '/battlestation', '/portfolio', '/journey', '/links', '/log'];
    const paths = {};
    pages.forEach(page => {
      // 英文版（根目录）
      paths[page] = { page };
      // 中文版（/zh 目录）- 不传递 query
      const zhPath = `/zh${page === '/' ? '' : page}`;
      paths[zhPath] = { page };
    });
    return paths;
  },
};

module.exports = nextConfig;