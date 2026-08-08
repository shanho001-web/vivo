// 檔案位置：api/chat.js
// 這是 Vercel 專屬的後端中繼站，負責安全地去保險箱拿金鑰，再幫我們去問 Google AI
export default async function handler(req, res) {
    // 限制只接受 POST 請求
    if (req.method !== 'POST') {
        return res.status(405).json({ error: '不允許的方法' });
    }

    const { userMessage } = req.body;
    
    // 🔴【重要位置】：這裡就是程式去 Vercel 保險箱拿取我們剛剛設定的金鑰！
    // 程式碼中完全沒有寫出真實密碼，達到絕對安全。
    const apiKey = process.env.GEMINI_API_KEY; 

    if (!apiKey) {
        return res.status(500).json({ error: '找不到 API 金鑰，請確認 Vercel 設定' });
    }

    try {
        // 帶著金鑰去敲 Google Gemini 的大門
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: userMessage }] }]
            })
        });

        const data = await response.json();
        // 抓取 AI 回傳的純文字內容
        const reply = data.candidates[0].content.parts[0].text;
        
        // 將結果送回給前端網頁
        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ error: 'AI 伺服器連線失敗' });
    }
}