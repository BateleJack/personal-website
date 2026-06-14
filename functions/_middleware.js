export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  // 如果请求的是 /battlestation 或 /games，内部重写到 .html 文件
  if (path === '/battlestation') {
    return next('/battlestation.html');
  }
  if (path === '/games') {
    return next('/games.html');
  }
  return next(); // 其他请求正常处理
}