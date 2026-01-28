# プロジェクト構造

## 概要

本プロジェクトのディレクトリ構造とファイル構成を説明します。

最終更新日: 2025-01-25

---

## ディレクトリ構造（予定）

```
movie-stream-platform-with-cursor/
├── .next/                    # Next.jsのビルド出力（自動生成）
├── .git/                     # Gitリポジトリ
├── public/                   # 静的ファイル
│   ├── images/              # 画像ファイル
│   │   └── default-speaker-icon.svg  # デフォルト発話者アイコン
│   └── favicon.ico          # ファビコン
├── data/                     # データファイル
│   └── articles/            # 記事データ（JSONファイル）
│       ├── article-001.json
│       ├── article-002.json
│       └── ...
├── src/                      # ソースコード（または app/ または pages/）
│   ├── app/                 # App Router（Next.js 13+）または
│   │   ├── layout.tsx       # ルートレイアウト
│   │   ├── page.tsx         # トップページ
│   │   ├── articles/        # 記事詳細ページ
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── api/             # API Routes（将来の拡張用）
│   │
│   ├── components/          # Reactコンポーネント
│   │   ├── ArticleCard.tsx  # 記事カード
│   │   ├── ArticleList.tsx  # 記事一覧
│   │   ├── VideoPlayer.tsx  # YouTube動画プレーヤー
│   │   ├── Transcript.tsx   # 文字起こし表示
│   │   ├── MessageBubble.tsx # メッセージ吹き出し
│   │   ├── SpeakerSelector.tsx # 発話者選択
│   │   ├── SettingsPanel.tsx  # 設定パネル
│   │   ├── SearchBar.tsx    # 検索バー
│   │   └── Pagination.tsx   # ページネーション
│   │
│   ├── lib/                 # ユーティリティ関数
│   │   ├── articles.ts      # 記事データの読み込み・処理
│   │   ├── search.ts        # 検索機能
│   │   └── types.ts         # TypeScript型定義
│   │
│   ├── styles/              # スタイルファイル
│   │   └── globals.css      # グローバルスタイル
│   │
│   └── hooks/               # カスタムフック（オプション）
│       └── useSettings.ts  # 設定管理フック
│
├── docs/                    # ドキュメント
│   ├── requirements.md      # 要件定義書
│   ├── tech-stack.md        # 技術スタック
│   ├── progress.md          # 進捗管理
│   ├── project-structure.md # プロジェクト構造（このファイル）
│   └── development-guide.md # 開発ガイドライン
│
├── .gitignore              # Git除外ファイル
├── .eslintrc.json          # ESLint設定
├── .prettierrc             # Prettier設定
├── next.config.js          # Next.js設定
├── package.json            # パッケージ定義
├── tsconfig.json           # TypeScript設定
└── README.md               # プロジェクト概要
```

---

## 主要ディレクトリの説明

### `/public`

静的ファイルを配置するディレクトリ。ビルド時にそのまま出力される。

- `images/`: 画像ファイル（アイコン、ロゴ等）
- `favicon.ico`: ファビコン

### `/data`

記事データを管理するディレクトリ。ビルド時に読み込まれる。

- `articles/`: 各記事のJSONファイルを配置
- `articles-index.json`: 記事一覧用メタデータ（ビルド時に自動生成）

### `/src` (または `/app` / `/pages`)

ソースコードを配置するディレクトリ。Next.jsのバージョンによって構造が異なる。

#### App Router (Next.js 13+) の場合

- `app/`: ページとレイアウトを配置
  - `page.tsx`: ページコンポーネント
  - `layout.tsx`: レイアウトコンポーネント
  - `[id]/`: 動的ルート

#### Pages Router (Next.js 12以下) の場合

- `pages/`: ページを配置
  - `index.tsx`: トップページ
  - `articles/[id].tsx`: 記事詳細ページ

### `/src/components`

再利用可能なReactコンポーネントを配置。

**主要コンポーネント**:
- `ArticleCard.tsx`: 記事カードコンポーネント
- `ArticleList.tsx`: 記事一覧コンポーネント
- `VideoPlayer.tsx`: YouTube動画プレーヤー
- `Transcript.tsx`: 文字起こし表示コンポーネント
- `MessageBubble.tsx`: メッセージ吹き出しコンポーネント
- `SpeakerSelector.tsx`: 発話者選択コンポーネント
- `SettingsPanel.tsx`: 設定パネルコンポーネント
- `SearchBar.tsx`: 検索バーコンポーネント
- `Pagination.tsx`: ページネーションコンポーネント

### `/src/lib`

ユーティリティ関数とヘルパー関数を配置。

**主要ファイル**:
- `articles.ts`: 記事データの読み込み、フィルタリング、検索
- `search.ts`: 検索機能の実装
- `types.ts`: TypeScript型定義（Article, Speaker, Transcript等）

### `/src/styles`

スタイルファイルを配置。

- `globals.css`: グローバルスタイル、CSS変数定義

### `/src/hooks` (オプション)

カスタムReactフックを配置。

- `useSettings.ts`: 表示設定の管理フック

### `/docs`

プロジェクトのドキュメントを配置。

---

## ファイル命名規則

### コンポーネント

- **PascalCase**: `ArticleCard.tsx`, `VideoPlayer.tsx`
- ファイル名とコンポーネント名は一致させる

### ユーティリティ関数

- **camelCase**: `articles.ts`, `search.ts`
- 機能ごとにファイルを分割

### 型定義

- **PascalCase**: `Article`, `Speaker`, `Transcript`
- `types.ts`に集約、または各ファイルに定義

### スタイルファイル

- **kebab-case**: `globals.css`, `article-card.module.css`
- CSS Modulesを使用する場合は`.module.css`拡張子

---

## データファイル構造

### 記事データ (`/data/articles/*.json`)

各記事は個別のJSONファイルとして保存。

```
data/articles/
├── article-001.json
├── article-002.json
└── ...
```

### メタデータ (`/data/articles-index.json`)

記事一覧用の軽量なメタデータ。ビルド時に自動生成。

```json
[
  {
    "id": "article-001",
    "title": "記事タイトル",
    "description": "説明文",
    "category": "カテゴリ",
    "tags": ["タグ1", "タグ2"],
    "speakers": ["発話者1", "発話者2"],
    "createdAt": "2024-01-01T00:00:00Z",
    "youtubeVideoId": "動画ID"
  }
]
```

---

## 設定ファイル

### `package.json`

プロジェクトの依存関係とスクリプトを定義。

### `tsconfig.json`

TypeScriptの設定。

### `next.config.js`

Next.jsの設定（画像最適化、環境変数等）。

### `.eslintrc.json`

ESLintの設定。

### `.prettierrc`

Prettierの設定。

### `.gitignore`

Gitで除外するファイル・ディレクトリを定義。

---

## 環境変数

### `.env.local` (ローカル開発用)

```
# YouTube API Key (必要に応じて)
NEXT_PUBLIC_YOUTUBE_API_KEY=your_api_key_here
```

### `.env.example`

環境変数のテンプレートファイル（リポジトリにコミット）。

---

## ビルド出力

### `.next/`

Next.jsのビルド出力ディレクトリ。`.gitignore`に追加する。

### `out/` (静的エクスポート時)

静的サイトとしてエクスポートする場合の出力ディレクトリ。

---

## 今後の拡張予定

### 将来追加される可能性のあるディレクトリ

- `/src/api`: API Routes（バックエンド実装時）
- `/src/store`: 状態管理（Redux/Zustand等）
- `/tests`: テストファイル
- `/scripts`: ビルドスクリプト、ユーティリティスクリプト

---

## 参考

- [Next.js公式ドキュメント - Project Structure](https://nextjs.org/docs/getting-started/project-structure)
- [Next.js公式ドキュメント - App Router](https://nextjs.org/docs/app)
