# 開発ガイドライン

## 概要

本プロジェクトの開発に必要な情報をまとめています。

最終更新日: 2025-01-25

---

## 開発環境のセットアップ

### 必要な環境

- **Node.js**: 18.x以上推奨
- **npm/yarn/pnpm**: パッケージマネージャー
- **Git**: バージョン管理
- **エディタ**: VS Code推奨（拡張機能推奨あり）

### セットアップ手順

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd movie-stream-platform-with-cursor
   ```

2. **依存関係のインストール**
   ```bash
   npm install
   # または
   yarn install
   # または
   pnpm install
   ```

3. **環境変数の設定**
   ```bash
   cp .env.example .env.local
   # .env.localを編集して必要な環境変数を設定
   ```

4. **開発サーバーの起動**
   ```bash
   npm run dev
   # または
   yarn dev
   # または
   pnpm dev
   ```

5. **ブラウザで確認**
   - http://localhost:3000 にアクセス

---

## コーディング規約

### TypeScript

- **型定義を必ず記述**: `any`の使用は避ける
- **インターフェースとタイプの使い分け**:
  - `interface`: オブジェクトの型定義
  - `type`: ユニオン型、交差型、その他の型エイリアス

**例**:
```typescript
interface Article {
  id: string;
  title: string;
  description: string;
}

type DisplayMode = 'kanji' | 'ruby' | 'hiragana';
```

### Reactコンポーネント

- **関数コンポーネントを使用**: クラスコンポーネントは使用しない
- **コンポーネント名はPascalCase**: `ArticleCard`, `VideoPlayer`
- **Propsの型定義**: `interface`または`type`で定義

**例**:
```typescript
interface ArticleCardProps {
  article: Article;
  onClick: () => void;
}

export function ArticleCard({ article, onClick }: ArticleCardProps) {
  // ...
}
```

### ファイル構造

- **1ファイル1コンポーネント**: 大きなコンポーネントは分割
- **エクスポート**: デフォルトエクスポートより名前付きエクスポートを推奨
- **インポート順序**: 
  1. 外部ライブラリ
  2. 内部コンポーネント
  3. ユーティリティ関数
  4. 型定義
  5. スタイル

**例**:
```typescript
import { useState } from 'react';
import { ArticleCard } from '@/components/ArticleCard';
import { formatDate } from '@/lib/utils';
import type { Article } from '@/lib/types';
import styles from './ArticleList.module.css';
```

### 命名規則

- **コンポーネント**: PascalCase (`ArticleCard.tsx`)
- **関数・変数**: camelCase (`getArticles`, `articleList`)
- **定数**: UPPER_SNAKE_CASE (`MAX_ARTICLES_PER_PAGE`)
- **型・インターフェース**: PascalCase (`Article`, `ArticleProps`)
- **ファイル名**: 
  - コンポーネント: PascalCase (`ArticleCard.tsx`)
  - ユーティリティ: camelCase (`articles.ts`)
  - スタイル: kebab-case (`article-card.module.css`)

### コメント

- **JSDocコメント**: 関数・コンポーネントには説明を記述
- **複雑なロジック**: 理由を説明するコメントを追加

**例**:
```typescript
/**
 * 記事一覧を取得する
 * @param page ページ番号（1から始まる）
 * @param limit 1ページあたりの記事数
 * @returns 記事の配列
 */
export async function getArticles(page: number, limit: number): Promise<Article[]> {
  // ...
}
```

---

## Git運用

### ブランチ戦略

- **main**: 本番環境用ブランチ（保護）
- **develop**: 開発用ブランチ
- **feature/**: 機能追加用ブランチ（例: `feature/article-list`）
- **fix/**: バグ修正用ブランチ（例: `fix/pagination-bug`）

### コミットメッセージ

**フォーマット**:
```
<type>: <subject>

<body>

<footer>
```

**タイプ**:
- `feat`: 新機能
- `fix`: バグ修正
- `docs`: ドキュメント変更
- `style`: コードフォーマット（動作に影響なし）
- `refactor`: リファクタリング
- `test`: テスト追加・修正
- `chore`: ビルドプロセスやツールの変更

**例**:
```
feat: 記事一覧ページの実装

- ページネーション機能を追加
- 記事カードコンポーネントを作成
- レスポンシブデザインに対応

Closes #123
```

### コミット頻度

- **小さな単位で頻繁に**: 1つの機能や修正ごとにコミット
- **意味のある単位**: 関連する変更をまとめてコミット

---

## テスト

### テスト方針（将来実装）

- **ユニットテスト**: ユーティリティ関数、カスタムフック
- **コンポーネントテスト**: React Testing Libraryを使用
- **E2Eテスト**: PlaywrightまたはCypress（将来検討）

### テストファイルの配置

```
src/
├── components/
│   ├── ArticleCard.tsx
│   └── ArticleCard.test.tsx
└── lib/
    ├── articles.ts
    └── articles.test.ts
```

---

## パフォーマンス最適化

### 推奨事項

1. **画像の最適化**
   - Next.jsの`Image`コンポーネントを使用
   - 適切なサイズ・フォーマットを選択

2. **コード分割**
   - 動的インポートを使用
   - 大きなライブラリは必要時のみ読み込む

3. **メモ化**
   - `React.memo`でコンポーネントをメモ化
   - `useMemo`, `useCallback`で計算結果をメモ化

4. **バンドルサイズの削減**
   - 使用していないライブラリを削除
   - Tree shakingが効くようにインポート

---

## アクセシビリティ

### 推奨事項

1. **セマンティックHTML**
   - 適切なHTMLタグを使用（`<article>`, `<nav>`, `<main>`等）
   - 見出しの階層を正しく使用

2. **ARIA属性**
   - 必要に応じてARIA属性を追加
   - `aria-label`, `aria-labelledby`等

3. **キーボード操作**
   - すべてのインタラクティブ要素がキーボードで操作可能
   - フォーカス管理を適切に実装

4. **色のコントラスト**
   - WCAG AA基準を満たす（コントラスト比4.5:1以上）

---

## デバッグ

### 開発ツール

- **React DevTools**: Reactコンポーネントのデバッグ
- **Next.js DevTools**: Next.jsのデバッグ
- **ブラウザの開発者ツール**: ネットワーク、パフォーマンス分析

### ログ

- **開発環境**: `console.log`を使用（本番では削除）
- **本番環境**: 適切なロギングサービスを使用（将来実装）

---

## デプロイ

### ビルド

```bash
npm run build
```

### 静的エクスポート（予定）

```bash
npm run export
```

### デプロイ先

- **Vercel**: 推奨（Next.jsとの統合が最適）
- **Netlify**: 静的サイトに最適
- **GitHub Pages**: 無料プラン

---

## トラブルシューティング

### よくある問題

1. **ビルドエラー**
   - TypeScriptの型エラーを確認
   - 依存関係のバージョンを確認

2. **画像が表示されない**
   - `public`フォルダのパスを確認
   - Next.jsの`Image`コンポーネントを使用しているか確認

3. **データが読み込めない**
   - `data/articles/`フォルダのパスを確認
   - JSONファイルの形式を確認

---

## 参考リンク

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [React公式ドキュメント](https://react.dev/)
- [TypeScript公式ドキュメント](https://www.typescriptlang.org/docs/)
- [ESLint公式ドキュメント](https://eslint.org/docs/latest/)
- [Prettier公式ドキュメント](https://prettier.io/docs/en/)

---

## 変更履歴

| 日付 | 変更内容 | 変更者 |
|------|---------|--------|
| 2025-01-25 | 開発ガイドライン作成 | - |
