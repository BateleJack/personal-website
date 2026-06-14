// functions/api/steam.js
export async function onRequest(context) {
    const { request, env } = context;
    const STEAM_API_KEY = env.STEAM_API_KEY;
    const STEAM_ID = '76561199477098499';
    const CACHE_TTL = 3600; // 缓存 1 小时（单位：秒）

    if (!STEAM_API_KEY) {
        return new Response(JSON.stringify({ error: 'Steam API key missing' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint') || 'owned'; // 默认获取完整游戏库
    let apiUrl = '';
    let cacheKey = '';

    if (endpoint === 'recent') {
        apiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=20`;
        cacheKey = 'steam_recent';
    } else { // 'owned' - 完整游戏库
        apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&include_played_free_games=true`;
        cacheKey = 'steam_owned';
    }

    // 尝试从 KV 获取缓存
    const cached = await env.STEAM_CACHE.get(cacheKey, { type: 'json' });
    if (cached) {
        return new Response(JSON.stringify(cached), {
            headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' }
        });
    }

    // 缓存未命中，请求 Steam API
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            return new Response(JSON.stringify({ error: `Steam API error: ${response.status}` }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const data = await response.json();

        // 存入 KV，设置过期时间（秒）
        await env.STEAM_CACHE.put(cacheKey, JSON.stringify(data), { expirationTtl: CACHE_TTL });

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch from Steam API' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}