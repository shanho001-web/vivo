// 遊戲邏輯
let secretNum = Math.floor(Math.random() * 10) + 1;
function checkGuess() {
    let guess = document.getElementById('guess-input').value;
    let res = document.getElementById('game-result');
    if(parseInt(guess) === secretNum) { res.innerHTML = "🎉 猜對了！"; secretNum = Math.floor(Math.random()*10)+1; }
    else { res.innerHTML = "❌ 再試一次！"; }
}

// 切換頁面
function showSection(id) {
    document.querySelectorAll('.section-block').forEach(s => s.classList.remove('active-section'));
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active-section');
    event.currentTarget.classList.add('active');
}

// AI 互動
async function askAI() {
    const input = document.getElementById('ai-input').value;
    const box = document.getElementById('ai-response');
    box.innerHTML = "🧠 思考中...";
    const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userMessage: input })
    });
    const data = await res.json();
    box.innerHTML = data.reply;
}