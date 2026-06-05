# 網頁設計課程專案總覽

**學期：** 114 學年度第 2 學期  
**學生：** 吳宇琭  
**學號末兩碼：** 57  
**教師：** 陳鍾誠  
**學校：** 國立金門大學 資訊工程學系  
**課程教材：** [ccc114b/html2server](https://github.com/ccc114b/html2server) + [W3Schools](https://www.w3schools.com/)

---
## 本學期作業大部分使用gemini加上opencode完成而我主要是改部分內容及敘述我的內容
## 目錄結構

```
_wp1/
├── README.md              # 課程基本資料
├── index.html             # Yulu 小舖 — 電商 SPA（基本版）
├── ABOUTME.HTML           # 個人履歷 / CV 網頁
├── .gitignore             # Git 忽略規則
│
├── hw/                    # 作業總目錄
│   ├── readme.md
│   ├── 04/                # 第 04 週 — JavaScript 基礎程式設計
│   ├── 05/                # 第 05 週 — Node.js + Express 部落格
│   │   ├── blog/
│   │   ├── blog 01/
│   │   ├── blog 02 登入/
│   │   ├── blog 04/
│   │   └── blog 個人/
│   ├── 06/                # 第 06 週 — 進階 JavaScript 函數式程式設計
│   ├── 07/                # 第 07 週 — 後端 JavaScript 模式練習
│   │   └── 01.js ~ 10.js
│   ├── js/
│   │   └── hello.js
│   ├── hw02               # 問卷調查表單
│   └── hhhh/              # Yulu 小舖加強版（含賣家後台 + 遊戲）
│       ├── index.html
│       └── readme.md
│
└── end/                   # 期末資料
    └── readme.md          # 本檔案
```

---

## 各專案詳細說明

### 根目錄

#### `README.md`
課程基本資訊頁，包含學期、姓名、學號、教師、系所及課程連結。

#### `index.html` — Yulu 小舖（電商 SPA）
- **技術：** 純 HTML + CSS + Vanilla JavaScript，無外部依賴
- **功能：**
  - 8 項商品展示（含圖片、價格、描述）
  - 購物車系統（加入/移除/數量調整）
  - 優惠券機制
  - 結帳流程
  - 多語系支援（中文 / English / 日本語）
  - 使用者認證（localStorage）
  - 商品詳細資訊 Modal
  - 星級評分與留言
  - RWD 響應式設計

#### `ABOUTME.HTML` — 個人履歷
- 吳宇琭的個人 CV 網頁
- 含聯絡資訊、自我介紹、經歷（專題競賽、電動車比賽、App 開發）、學歷
- 現代化版面設計、清晰 CSS 排版

---

### `hw/07/` — 後端 JavaScript 模式（第 07 週練習）

10 個獨立的 JavaScript 檔案，教學重點為 Node.js 後端開發常見模式：

| 檔案 | 主題 |
|------|------|
| `01.js` | 物件屬性存取：點記法 vs 括號記法 |
| `02.js` | 解構賦值（從 `req.body` 中取值） |
| `03.js` | `forEach` 迭代陣列組合 HTML 字串 |
| `04.js` | 動態新增物件鍵值對 |
| `05.js` | Error-First 回呼模式 |
| `06.js` | JSON 字串解析與巢狀資料存取 |
| `07.js` | 模擬資料庫查詢（回呼模式） |
| `08.js` | 三元運算子 + 模板字面值 |
| `09.js` | 字串截斷（`substring`） |
| `10.js` | 角色權限控制（回呼模式） |

---

### `hw/04/` — JavaScript 基礎程式設計（第 04 週）

10 題基礎程式練習，含 `readme.md`（AI 問答記錄 + 測試輸出）：

| 檔案 | 主題 |
|------|------|
| `01-score.js` | 偶數偵測（for + 模數） |
| `02-score.js` | 倒數計時器（while 迴圈） |
| `03-score.js` | 九九乘法表（巢狀迴圈） |
| `04-score.js` | 購物車總金額計算（物件陣列） |
| `05-score.js` | 學生及格檢查（物件方法） |
| `06-score.js` | 陣列過濾長字串 |
| `07-score.js` | JSON 字串解析 |
| `08-score.js` | 通訊錄查詢（函式 + 陣列搜尋） |
| `09-score.js` | 數字金字塔圖形（巢狀迴圈） |
| `10-score.js` | 模擬 API 資料處理（JSON + 年齡過濾） |

---

### `hw/05/` — Node.js + Express 部落格系統

5 個漸進式部落格專案，逐步增加功能：

#### `blog/`（基礎版）
- Express 伺服器 + SQLite 資料庫 + 靜態前端

#### `blog 01/`（部落格 v1）
- 基本 CRUD 功能

#### `blog 02 登入/`（含認證）
- bcrypt + express-session 登入/註冊
- 完整的 REST API（文章 + 認證）
- 前端 session 管理
- 文章 CRUD 需登入保護

#### `blog 04/`（部落格 v4）
- 進一步迭代

#### `blog 個人/`（個人化部落格）
- 使用者專屬文章過濾（`?user_id=`）
- 「為你推薦」/「我的文章」分頁
- 大頭貼縮寫顯示
- 相對時間顯示（「剛剛」、「3m」、「2h」）
- 自動調整高度的文字框 + 字數統計
- 行內編輯/刪除功能

**共通技術棧：** Express、bcryptjs、express-session、better-sqlite3、REST API、JSON

---

### `hw/06/` — 進階 JavaScript 函數式程式設計（第 06 週）

10 個進階 JS 練習，聚焦高階函式與閉包：

| 檔案 | 主題 |
|------|------|
| `01.js` | 高階函式：`mathTool` 接受回呼進行加/減法 |
| `02.js` | IIFE（立即呼叫函式運算式）作用域隔離 |
| `03.js` | `Array.map()` 套用折扣 |
| `04.js` | 陣列變異：`pop()` + `unshift()` |
| `05.js` | 柯里化 / 閉包：`multiplier(factor)` |
| `06.js` | 自製 `myFilter()` 重現 `Array.filter` |
| `07.js` | 原生 `Array.filter()` 過濾成年者 |
| `08.js` | （未完成） |
| `09.js` | `setTimeout()` 非同步延遲 |
| `10.js` | `Array.reduce()` 購物車總計 + 折扣回呼 |

---

### `hw/hw02` — 問卷調查表單
- HTML 表單練習，收集姓名、性別、生日、電話、Email、職業、興趣、自我介紹、滿意度
- 綠色主題風格

---

### `hw/js/hello.js`
- `console.log('hello 你好')` — 最基礎的第一行程式

---

### `hw/hhhh/` — Yulu 小舖加強版

`index.html` 的強化版本，獨立 Git 倉庫，部署於 GitHub Pages：  
[https://wuulu.github.io/yulu-store/](https://wuulu.github.io/yulu-store/)

**新增功能：**
- **賣家後台：** 成為賣家、新增/編輯/刪除商品（含圖片 base64 上傳）、管理訂單、標記出貨
- **訂單歷史：** 每位使用者的訂單追蹤（待處理 / 已出貨 / 已完成）
- **拉霸機小遊戲：** 每日免費轉一次，6 種 emoji 符號，贏取優惠券（LUCKY30、GAME50、JACKPOT）
- **賣家篩選：** 依賣家過濾商品
- **資料持久化：** localStorage 儲存，10+ 個命名空間

---

## 學習路徑與技能進展

```
基礎 JS ──→ 後端模式 ──→ 進階 JS ──→ 全端應用
 (hw/04)   (hw/07/)   (hw/06)     (hw/05 部落格)
                                        │
                                        └──→ 前端 SPA
                                          (index.html + hw/hhhh/)
```

1. **`hw/04/`** — JavaScript 基礎：變數、迴圈、條件判斷、陣列、物件、JSON
2. **`hw/07/`** — 後端開發模式：解構賦值、回呼、Error-First、模板字串
3. **`hw/06/`** — 函數式程式設計：高階函式、閉包、map/filter/reduce、IIFE
4. **`hw/hw02`** — HTML 表單與 CSS 樣式
5. **`ABOUTME.HTML`** — 進階 CSS 排版（Grid、響應式設計）
6. **`hw/05/`** — 全端 Node.js：Express 伺服器、SQLite 資料庫、Session 認證、REST API
7. **`index.html` / `hw/hhhh/`** — 整合型 SPA 專題：電商平台、多語系、遊戲化、賣家後台

---

## 技術棧總覽

| 技術 | 用途 |
|------|------|
| HTML5 | 網頁結構 |
| CSS3 | 樣式與排版（Flexbox、Grid、RWD） |
| Vanilla JavaScript (ES6+) | 前端邏輯與互動 |
| Node.js | 後端執行環境 |
| Express | HTTP 伺服器與路由 |
| SQLite (better-sqlite3) | 資料庫 |
| bcryptjs | 密碼雜湊 |
| express-session | Session 管理 |
| localStorage / sessionStorage | 前端資料持久化 |
| JSON | 資料交換格式 |
| Git / GitHub Pages | 版本控制與部署 |

---

## 統計摘要

- **JavaScript 練習檔：** 30+ 題
- **部落格專案：** 5 個版本
- **電商 SPA：** 2 個版本（基本版 + 加強版）
- **HTML 頁面：** 3 個（履歷、表單、課程資訊）
- **總檔案數（不含 .git）：** 約 75 個
- **外部依賴：** 無（部落格專案使用 npm 套件）
