export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  let path = url.pathname;

  // 需要重写的页面（不含扩展名）
  const pages = ['/battlestation', '/portfolio', '/links', '/journey'];

  // 1. 处理英文根路径
  if (pages.includes(path)) {
    return next(`${path}.html`);
  }

  // 2. 处理中文 /zh 路径
  if (path === '/zh') {
    return next('/zh/index.html');
  }
  if (path.startsWith('/zh/')) {
    const subPath = path.replace(/^\/zh/, '');
    if (pages.includes(subPath)) {
      return next(`/zh${subPath}.html`);
    }
  }

  // 3. 其他（包括根路径、/log 等）正常处理
  return next();
}