// functions/api/wiki-stats.js
export async function onRequest(context) {
    const WIKI_BASE_URL = 'https://projectflight.fandom.com';

    try {
        // 1. 获取站点全局统计（页面数、总编辑数、活跃用户等）
        const statsApiUrl = `${WIKI_BASE_URL}/api.php?action=query&meta=siteinfo&siprop=statistics&format=json`;
        const statsResponse = await fetch(statsApiUrl);
        const statsData = await statsResponse.json();
        const stats = statsData.query.statistics;

        // 2. 获取用户 Batele Jack 的贡献数据
        const userApiUrl = `${WIKI_BASE_URL}/api.php?action=query&list=users&ususers=Batele_Jack&usprop=editcount|groups&format=json`;
        const userResponse = await fetch(userApiUrl);
        const userData = await userResponse.json();
        const userInfo = userData.query.users[0];

        // 3. 整理前端需要的数据
        const wikiStats = {
            pages: stats.pages || 0,
            edits: stats.edits || 0,
            activeUsers: stats.activeusers || 0,
            admins: stats.admins || 0,
            userEditCount: userInfo?.editcount || 0,
            userGroups: userInfo?.groups || []
        };

        return new Response(JSON.stringify(wikiStats), {
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Wiki API error:', error);
        return new Response(JSON.stringify({ error: 'Failed to fetch wiki stats' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}