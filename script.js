// script.js

// Tailwindのカスタム設定
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // 重厚なゴールド (プライマリー)
                'primary-gold': '#D4AF37', 
                // 落ち着いたゴールド/セピア (セカンダリー/テキスト)
                'secondary-sepia': '#E0B050',
            }
        }
    }
}

// 画面切り替え関数
function showMiniChallengePage() {
    // ページタイトルを元の名前に戻す
    document.title = "AUCTION コンプリートサイト"; // <title> タグの値に合わせました
    document.getElementById('mini-challenge-page').classList.remove('hidden');
    document.getElementById('catalog-page').classList.add('hidden');
}

function goToCatalogPage() {
    document.title = "カタログの情報";
    document.getElementById('catalog-page').classList.remove('hidden');
    document.getElementById('mini-challenge-page').classList.add('hidden');
}

// ここに他の JavaScript 関数 (showMainContent, switchCollection, checkMiniAnswer など) も追加します。
// （それらのコードが提供されていないため、ここではコメントとして示します）

// function showMainContent() { ... }
// function switchCollection(type) { ... }
// function checkMiniAnswer() { ... }
// function showMiniIndexPage() { ... }
// function confirmClearProgress(type) { ... }
// function showIndexPage() { ... }
// function checkAnswer() { ... }
// function hideModal() { ... }
