// 遊戲邏輯
let secretNum = Math.floor(Math.random() * 10) + 1;
function checkGuess() {
    let guess = document.getElementById('guess-input').value;
    let res = document.getElementById('game-result');
    if(parseInt(guess) === secretNum) {
        res.innerHTML = "🎉 恭喜！猜對了！你是邏輯大師。";
        secretNum = Math.floor(Math.random() * 10) + 1;
    } else {
        res.innerHTML = "❌ 猜錯了，數字在 1-10 之間，再試一次！";
    }
}

// 頁面切換
function showSection(id) {
    document.querySelectorAll('.section-block').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active-section');
    event.currentTarget.classList.add('active');
}

// AI 請求
async function askAI() {
    const input = document.getElementById('ai-input').value;
    const box = document.getElementById('ai-response');
    box.innerHTML = "⏳ AI 正在深度分析中...";
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: input })
    });
    const data = await res.json();
    box.innerHTML = data.reply;
}