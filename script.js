// 處理選單切換
function showSection(sectionId) {
    const allSections = document.querySelectorAll('.section-block');
    allSections.forEach(section => {
        section.classList.remove('active-section');
    });

    const allBtns = document.querySelectorAll('.nav-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    document.getElementById(sectionId).classList.add('active-section');
    event.currentTarget.classList.add('active');
}

// 處理 AI 詢問功能 (串接後端)
async function askAI() {
    const inputField = document.getElementById('ai-input');
    const responseBox = document.getElementById('ai-response');
    const button = document.getElementById('ai-btn');
    const userMessage = inputField.value;

    if (!userMessage) {
        alert("請先輸入你想問的問題！");
        return;
    }

    // 狀態更改為讀取中
    responseBox.innerHTML = "🧠 AI 正在思考中，請稍候...";
    button.disabled = true;

    try {
        // 發送請求到我們剛才建好的 Vercel 後端 (/api/chat)
        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userMessage: userMessage })
        });

        const data = await res.json();

        if (res.ok) {
            responseBox.innerHTML = data.reply;
        } else {
            responseBox.innerHTML = "❌ 發生錯誤：" + data.error;
        }
    } catch (error) {
        responseBox.innerHTML = "❌ 網路連線錯誤，無法聯絡伺服器。";
    } finally {
        // 恢復按鈕狀態
        button.disabled = false;
    }
}