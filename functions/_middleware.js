export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;

  const pages = ['/battlestation', '/portfolio', '/links', '/journey'];

  // 1. 处理英文页面（根目录）
  if (pages.includes(path)) {
    return next(`${path}.html`);
  }

  // 2. 处理 /zh 根路径（重点！）
  if (path === '/zh') {
    return next('/zh/index.html');
  }

  // 3. 处理中文其他页面，如 /zh/battlestation
  if (path.startsWith('/zh/')) {
    const subPath = path.replace(/^\/zh/, '');
    if (pages.includes(subPath)) {
      return next(`/zh${subPath}.html`);
    }
  }

  // 4. 其他所有请求（包括根路径 /、/log 等）正常通过
  return next();
}