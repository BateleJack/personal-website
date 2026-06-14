export async function onRequest(context) {
    const { env } = context;
    const STEAM_API_KEY = env.STEAM_API_KEY;
    const STEAM_ID = '76561199477098499';

    if (!STEAM_API_KEY) {
        return new Response(JSON.stringify({ error: 'Steam API key missing' }), { status: 500 });
    }

    const apiUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}&include_appinfo=true`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
    }
}