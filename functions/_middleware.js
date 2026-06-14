export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  
  const rewriteMap = {
    '/battlestation': '/battlestation.html',
    '/games': '/games.html',
    '/portfolio': '/portfolio.html',
    '/links': '/links.html',
    '/journey': '/journey.html',
  };
  
  if (rewriteMap[path]) {
    return next(rewriteMap[path]);
  }
  return next();
}