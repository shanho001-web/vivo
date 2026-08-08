// 這個函數負責處理選單的切換邏輯
function showSection(sectionId) {
    // 1. 隱藏所有的內容區塊
    const allSections = document.querySelectorAll('.section-block');
    allSections.forEach(section => {
        section.classList.remove('active-section');
    });

    // 2. 取消所有按鈕的活躍(亮起)狀態
    const allBtns = document.querySelectorAll('.nav-btn');
    allBtns.forEach(btn => {
        btn.classList.remove('active');
    });

    // 3. 顯示被點擊的對應內容區塊
    document.getElementById(sectionId).classList.add('active-section');

    // 4. 讓被點擊的按鈕亮起 (這裡利用 event.currentTarget 抓取當前點擊的按鈕)
    event.currentTarget.classList.add('active');
}