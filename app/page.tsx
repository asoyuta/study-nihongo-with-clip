/**
 * トップページ（記事一覧）
 */

import { getAllArticles } from '@/lib/articles';
import { ArticleCard } from '@/components/ArticleCard';

export default function Home() {
  const articles = getAllArticles();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            日本語学習サイト
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            VTuberの切り抜き動画で日本語を学ぼう
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="rounded-lg border border-gray-200 bg-white p-8 text-center dark:border-gray-700 dark:bg-gray-800">
            <p className="text-gray-600 dark:text-gray-400">
              記事がまだありません。
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
