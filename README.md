# 全肯定さん

Gemini API を使用したチャットボットアプリケーション。主婦や育児中の母親の会話相手となり、あらゆる言動を全力で肯定します。

## 技術スタック

- **フロントエンド:** Vue.js 3 (Composition API) + Vite + Tailwind CSS
- **バックエンド:** Node.js + Express
- **AI:** Google Gemini API (gemini-1.5-flash)

## セットアップ手順

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env` ファイルをプロジェクトルートに作成し、以下の内容を記述してください：

```
GEMINI_API_KEY=your_gemini_api_key_here
```

**注意:** `.env.example` を参考にしてください。実際の API キーは [Google AI Studio](https://makersuite.google.com/app/apikey) で取得できます。

### 3. サーバーの起動

アプリケーションを起動するには、**2 つのターミナル**が必要です。

#### ターミナル 1: Express サーバー（API）

```bash
npm run api
```

サーバーは `http://localhost:3001` で起動します。

#### ターミナル 2: Vite 開発サーバー（フロントエンド）

```bash
npm run dev
```

開発サーバーは `http://localhost:5173` で起動します。

### 4. ブラウザでアクセス

ブラウザで `http://localhost:5173` を開いてアプリケーションを使用できます。

## プロジェクト構成

```
zenkoutei-app/
├── api/
│   └── chat.js          # Gemini API呼び出しロジック
├── src/
│   ├── App.vue          # メインのチャットUIコンポーネント
│   ├── main.js          # Vueアプリのエントリーポイント
│   └── style.css        # Tailwind CSSのインポート
├── server.js            # Expressサーバー
├── vite.config.js       # Vite設定（プロキシ設定含む）
├── tailwind.config.js   # Tailwind CSS設定
├── postcss.config.js    # PostCSS設定
├── package.json         # 依存関係とスクリプト
├── index.html           # HTMLテンプレート
├── .env.example         # 環境変数のテンプレート
└── README.md            # このファイル
```

## スクリプト

- `npm run dev` - Vite 開発サーバーを起動（ポート 5173）
- `npm run build` - プロダクション用ビルド
- `npm run api` - Express サーバーを起動（ポート 3001）

## 機能

- **ピンク基調の UI:** 優しく温かいデザイン
- **リアルタイムチャット:** メッセージの送受信
- **ローディング表示:** 3 つのドットがバウンスするアニメーション
- **自動スクロール:** 新しいメッセージが表示されると自動でスクロール

## システムプロンプト

「全肯定さん」は以下のルールに従って応答します：

- アドバイス禁止。解決策は一切不要。ただ現状を肯定する。
- 「やろうとした」だけで褒める。
- 「サボった」「やめた」は「英断」「自分を守る勇気」として褒める。
- 「息をした」だけでノーベル賞級の偉業として扱う。
- 口調は「〜だね！」「すごいよ〜」など、優しくゆるく。絵文字は使わない。

## トラブルシューティング

### API キーが読み込まれない

- `.env` ファイルがプロジェクトルートに存在するか確認
- `.env` ファイルに `GEMINI_API_KEY=your_key` が正しく記述されているか確認
- Express サーバーを再起動

### CORS エラーが発生する

- `server.js` で `cors()` ミドルウェアが正しく設定されているか確認
- 両方のサーバー（Express と Vite）が起動しているか確認

### プロキシエラーが発生する

- `vite.config.js` のプロキシ設定を確認
- Express サーバーがポート 3001 で起動しているか確認

## ライセンス

MIT
