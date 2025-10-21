// script.js

// --- 1. Tailwindのカスタム設定 (前回の回答から移動) ---
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

// ==============================================

// --- 2. データ定義（謎コレクション） ---
const mainRiddles = [
    {　level: 1,title: "ANIMAGRAM",question: "", imageUrl: "A_1.png", answer: "ふたこぶらくだ"},
    {  level: 2, title: "Box of Maze", question: "ここに謎が表示されます？", answer: "さいきん"},
    { level: 3, title: "CUT AND CONNECT", question: "ここに謎が表示されます", imageUrl: "image_69007d.png", answer: "すかい"},
    { level: 4, title: "DEVIDED WORLD", question: "ここに謎が表示されます", imageUrl: "image_68f8df.png", answer: "ひっと"},
    { level: 5, title: "ENSHRINE TOWER", question: "ここに謎が表示されます", imageUrl: "image_6883a5.png", answer: "まてんろう"},
    { level: 6, title: "FORMULA", question: "ここに謎が表示されます", imageUrl: "image_681321.png", answer: "さんせっと"},
    { level: 7, 
        title: "飛行船の絵画", 
        question: "この謎は「救済タイム」の表示問題です。回答は「きゅうさいたいむ」です。", 
        imageUrl: "image_67a302.png", 
        answer: "きゅうさいたいむ", 
        interactive: false, // 回答不要のフラグ（クリック不可対象）
        hint: "問題文に答えが書いてあります。" 
    },
    { level: 8, title: "G-SQUARE", question: "ここに謎が表示されます", imageUrl: "image_67a2ab.png", answer: "ほういじしん"},
    { level: 9, title: "HARMONY", question: "ここに謎が表示されます", imageUrl: "image_67a288.png", answer: "はっけん", hint: "法律用語です。" },
    { level: 10, title: "INTERSECT", question: "ここに謎が表示されます", imageUrl: "image_67981a.png", answer: "たいむ", hint: "時間の英語読みです。" },
    { level: 11, title: "JUDGE", question: "ここに謎が表示されます", imageUrl: "image_5dadff.png", answer: "しんさく", hint: "新しい作品です。" },
    { level: 12, title: "KNOW AND COLOR", question: "ここに謎が表示されます", imageUrl: "images/riddle_12.png", answer: "さくせす", hint: "成功の英語読みです。" },
    { level: 13, title: "LUMINOUS", question: "ここに謎が表示されます", imageUrl: "images/riddle_13.png", answer: "かいどくかんりょう", hint: "全て読み終えました。" },
    { level: 14, title: "MEAN", question: "ここに謎が表示されます", answer: ["あんごう", "じょうよ", "とおぼえ", "しののめ"], hint: "4つの言葉が答えになります。", multi: true },
    { level: 15, title: "NO ORDER", question: "ここに謎が表示されます", imageUrl: "images/riddle_15.png", answer: "まんじゅう", hint: "和菓子の一つです。" },
    { level: 16, title: "ORIGAMI", question: "ここに謎が表示されます", imageUrl: "images/riddle_16.png", answer: "くーる", hint: "かっこいいの英語読みです。" },
    { level: 17, title: "POWER OF RIDDLE", question: "ここに謎が表示されます", imageUrl: "images/riddle_17.png", answer: "あめあがり", hint: "雨の後の天気です。" },
    { 
        level: 18, 
        title: "HEART WARMING", 
        question: "この謎は、これまでの全ての謎を解いたあなたへの感謝のメッセージです。いつもありがとうございます！", 
        interactive: false, // 回答不要のフラグ（クリック不可対象）
        answer: "", 
        hint: "特にありません。お疲れ様でした！" 
    },
];

// --- 3. データ定義（プチ謎 56問） ---
const miniAnswers = [
    "あーと", "すなとけい", "てんと", "すのー", "わいん", "まねー", "にゅうさつ", "せんちゃく", "ほのお", "げんてん", // 1-10
    "こいん", "はっと", "ちしき", "さいく", "すかい", "しぜん", "かたち", "はなたば", "わがまま", "たちば", // 11-20
    "ぎんが", "みぎ", "うぃんぐ", "こわいろ", "かめら", "すいとう", "しんしつ", "えごころ", "いいんちょう", "からー", // 31-40
    "あくしょん", "あひる", "おなか", "ふぉーかす", "はかせ", "さいん", "りろん", "くちどめ", "てんくう", "えび", // 31-40
    "へいしき", "まないた", "もうら", "わっくす", "しこみ", "えんじぇる", "どんき", "でぐち", "おるごーる", "せいとう", // 41-50
    "くじら", "かふぇ", "こううん", "かねかし", "なまえ", "ひつよう" // 51-56 (以前はなまえが重複していたため、最後の一つをひつように変更)
];

// --- 4. グローバルステートとストレージキーの定義 ---
let currentLevelIndex = 0;
let currentCollection = 'main'; // 'main' または 'mini'

// **画面遷移ステート**
let currentPage = 'intro'; // 'intro' または 'main'

// メイン謎コレクション用のストレージキー
const MAIN_STORAGE_KEY = 'riddle_completion_status'; 
const MAIN_MULTI_STORAGE_KEY = 'riddle_multi_answers'; 

// プチ謎コレクション用のストレージキー
const MINI_COMPLETED_ANSWERS_KEY = 'mini_challenge_answers'; 
const MINI_TOTAL_COUNT = miniAnswers.length; 

// HTML要素の参照
// Note: これらの要素IDを持つHTMLタグが、<body>内に必要です。
const introPage = document.getElementById('intro-page'); // 新しく追加
const mainContainer = document.getElementById('main-container'); // メインコンテンツ全体

const tabMain = document.getElementById('tab-main');
const tabMini = document.getElementById('tab-mini');
const indexPage = document.getElementById('index-page');
const miniChallengePage = document.getElementById('mini-challenge-page');
const miniIndexPage = document.getElementById('mini-index-page'); 
const gameContainer = document.getElementById('game-container');
const riddleList = document.getElementById('riddle-list');
const progressSummaryMain = document.getElementById('progress-summary-main');

// プチ謎チャレンジモード用要素
const miniProgressSummary = document.getElementById('mini-progress-summary');
const miniAnswerInput = document.getElementById('mini-answer-input');
const miniFeedbackMessage = document.getElementById('mini-feedback-message');
const miniProgressGrid = document.getElementById('mini-progress-grid'); 
const miniIndexUnsolvedCount = document.getElementById('mini-index-unsolved-count'); 

// 個別謎画面用要素 (mainRiddles用)
const levelTitle = document.getElementById('level-title');
const levelDisplay = document.getElementById('level-display');
const multiAnswerStatus = document.getElementById('multi-answer-status');
const riddleText = document.getElementById('riddle-text');
const answerInput = document.getElementById('answer-input');
const feedbackMessage = document.getElementById('feedback-message');

// モーダル要素
const messageModal = document.getElementById('message-modal');
const modalTitle = document.getElementById('modal-title');
const modalContent = document.getElementById('modal-content');
const modalButtonConfirm = document.getElementById('modal-button-confirm');
const modalButtonCancel = document.getElementById('modal-button-cancel');


// --- 5. データ/キー/謎の取得ヘルパー関数 ---

/**
 * 現在選択されている謎のデータ配列を返します。
 */
function getCurrentRiddles() {
    return mainRiddles;
}

/**
 * 現在選択されているコレクションのストレージキーを返します。
 */
function getStorageKeys() {
    if (currentCollection === 'main') {
        return {
            completion: MAIN_STORAGE_KEY,
            multi: MAIN_MULTI_STORAGE_KEY
        };
    } else {
        return {
            completion: MINI_COMPLETED_ANSWERS_KEY, 
            multi: null
        };
    }
}

// --- 6. データロード/保存関数 ---

/**
 * ゲームの進捗状況をローカルストレージから読み込みます。
 */
function loadProgress() {
    const key = getStorageKeys().completion;
    const storedData = localStorage.getItem(key);
    
    if (currentCollection === 'mini') {
        // プチ謎の場合、Setのように重複がないことを前提とするArrayを返す
        return storedData ? JSON.parse(storedData) : [];
    } else {
        // メイン謎の場合、クリア状態のオブジェクトを返す
        return storedData ? JSON.parse(storedData) : {};
    }
}

/**
 * 複数回答の進捗状況をローカルストレージから読み込みます。
 */
function loadMultiProgress(index) {
    const key = getStorageKeys().multi;
    if (!key) return []; 
    
    const storedData = localStorage.getItem(key);
    const allMulti = storedData ? JSON.parse(storedData) : {};
    return allMulti[index] || []; 
}

/**
 * メイン謎のクリア状態を保存します。
 */
function saveCompletion(index) {
    if (currentCollection !== 'main') return;
    const key = getStorageKeys().completion;
    const progress = loadProgress();
    progress[index] = true;
    localStorage.setItem(key, JSON.stringify(progress));
}

/**
 * メイン謎の複数回答の進捗を保存します。
 */
function saveMultiAnswer(index, answer) {
    if (currentCollection !== 'main') return;
    const key = getStorageKeys().multi;
    const storedData = localStorage.getItem(key);
    const allMulti = storedData ? JSON.parse(storedData) : {};
    
    if (!allMulti[index]) {
        allMulti[index] = [];
    }
    allMulti[index].push(answer);
    localStorage.setItem(key, JSON.stringify(
