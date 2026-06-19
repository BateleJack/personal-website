// functions/zh/[[path]].js
export function onRequest(context) {
  // 将所有 /zh/* 的请求都重写到 /zh/index.html
  return new Response(null, {
    status: 200,
    statusText: 'OK',
    headers: {
      // 注意：是 'Content-Type'，不是 'Content-Type' 的笔误
      'Content-Type': 'text/html;charset=utf-8',
    },
    // Cloudflare Pages 内部重写到静态文件
    // 这里通过 next 方法实现内部重写
  });
}