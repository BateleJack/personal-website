// functions/api/steam.js
export async function onRequest(context) {
    const { request, env } = context;
    const STEAM_API_KEY = env.STEAM_API_KEY;
    const STEAM_ID = '76561199477098499';
    const CACHE_TTL = 3600; // 1小时缓存

    if (!STEAM_API_KEY) {
        return new Response(JSON.stringify({ error: 'Steam API key missing' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const url = new URL(request.url);
    const endpoint = url.searchParams.get('endpoint') || 'owned';
    let apiUrl = '';
    let cacheKey = '';

    if (endpoint === 'recent') {
        apiUrl = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&count=20`;
        cacheKey = 'steam_recent';
    } else { // owned
        apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true&include_played_free_games=true`;
        cacheKey = 'steam_owned';
    }

    // 尝试从 KV 读取缓存（如果 KV 绑定不存在会抛出异常，但已绑定）
    try {
        const cached = await env.STEAM_CACHE.get(cacheKey, { type: 'json' });
        if (cached) {
            return new Response(JSON.stringify(cached), {
                headers: { 'Content-Type': 'application/json', 'X-Cache': 'HIT' }
            });
        }
    } catch (e) {
        console.error('KV read error:', e);
        // 继续请求，不中断
    }

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Steam API error ${response.status}: ${errorText}`);
            return new Response(JSON.stringify({ error: `Steam API error: ${response.status}`, details: errorText }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }
        const data = await response.json();

        // 存入 KV（忽略失败）
        try {
            await env.STEAM_CACHE.put(cacheKey, JSON.stringify(data), { expirationTtl: CACHE_TTL });
        } catch (e) {
            console.error('KV write error:', e);
        }

        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json', 'X-Cache': 'MISS' }
        });
    } catch (error) {
        console.error('Fetch error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch from Steam API' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}