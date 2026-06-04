# Threads 風格網誌系統

一個簡約、深色主題的微網誌平台，靈感來自 **Threads.net**，使用 **Node.js + Express + SQLite** 建置。

## 功能

- **使用者認證** — 註冊、登入、登出，採用 session + bcrypt 密碼加密
- **公開 feed** — 「For You」頁籤顯示所有使用者的貼文
- **個人 feed** — 「My Posts」頁籤只顯示自己的貼文
- **使用者主頁** — 點擊任何使用者名稱即可查看其個人資料與貼文
- **貼文 CRUD** — 建立、編輯、刪除自己的貼文
- **Threads 風格 UI** — 深色主題、大頭貼、相對時間、簡潔排版

## 技術棧

| 層級      | 技術                                     |
| --------- | ---------------------------------------- |
| 後端      | Node.js, Express                         |
| 認證      | express-session, bcryptjs                |
| 資料庫    | SQLite（透過 [sql.js](https://github.com/sql-js/sql.js/)） |
| 前端      | 原生 JavaScript, HTML, CSS               |

## 專案結構

```
blog/
├── server.js          # Express 伺服器與 API 路由
├── database.js        # SQLite 封裝（init, query, run, get）
├── package.json
├── blog.db            # SQLite 資料庫檔案（自動建立）
└── public/
    ├── index.html     # 主頁版面
    ├── app.js         # 前端邏輯（認證、貼文、個人主頁）
    └── style.css      # 深色主題樣式
```

## API 端點

### 貼文

| 方法     | 端點                   | 認證     | 說明                     |
| -------- | ---------------------- | -------- | ------------------------ |
| `GET`    | `/api/posts`           | 否       | 取得所有貼文（公開 feed）|
| `GET`    | `/api/posts?user_id=N` | 否       | 取得指定使用者的貼文     |
| `GET`    | `/api/posts/:id`       | 否       | 取得單篇貼文             |
| `POST`   | `/api/posts`           | 需要     | 建立貼文                 |
| `PUT`    | `/api/posts/:id`       | 需要     | 更新貼文                 |
| `DELETE` | `/api/posts/:id`       | 需要     | 刪除貼文                 |

### 認證

| 方法     | 端點              | 認證     | 說明                     |
| -------- | ----------------- | -------- | ------------------------ |
| `POST`   | `/api/register`   | 否       | 註冊新使用者             |
| `POST`   | `/api/login`      | 否       | 登入                     |
| `POST`   | `/api/logout`     | 否       | 登出                     |
| `GET`    | `/api/me`         | 否       | 取得目前登入的使用者     |

### 使用者

| 方法     | 端點              | 認證     | 說明                         |
| -------- | ----------------- | -------- | ---------------------------- |
| `GET`    | `/api/users/:id`  | 否       | 取得使用者資料與貼文數量     |

## 開始使用

### 環境需求

- Node.js >= 18

### 安裝與執行

```bash
cd hw/05/blog
npm install
npm start
```

開啟瀏覽器前往 [http://localhost:3000](http://localhost:3000)。

### 開發模式

```bash
npm run dev
```

檔案變更時會自動重啟伺服器。

## 使用方式

1. **建立帳號** — 點擊「Create account」，輸入使用者名稱與密碼
2. **發佈貼文** — 在頂部的文字框中輸入內容，點擊「Post」
3. **查看個人主頁** — 點擊任何使用者名稱，即可查看該使用者的主頁與貼文
4. **編輯／刪除** — 只有自己的貼文會顯示編輯與刪除按鈕
5. **切換頁籤** — 使用「For You」（所有貼文）與「My Posts」（自己的貼文）

## 資料庫

首次啟動時會自動建立 `blog.db` 檔案，包含兩個資料表：

- **posts** — id, title, content, user_id, created_at, updated_at
- **users** — id, username, password_hash, created_at

若 posts 資料表為空，系統會自動新增 3 筆範例貼文作為種子資料。
