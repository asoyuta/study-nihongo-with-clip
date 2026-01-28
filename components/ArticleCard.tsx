/**
 * 記事カードコンポーネント
 */

import Link from 'next/link';
import Image from 'next/image';
import type { Article } from '@/lib/types';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${article.youtubeVideoId}/maxresdefault.jpg`;

  return (
    <Link
      href={`/articles/${article.id}`}
      className="block rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800"
    >
      <div className="flex gap-4">
        {/* サムネイル */}
        <div className="relative h-24 w-40 flex-shrink-0 overflow-hidden rounded">
          <Image
            src={thumbnailUrl}
            alt={article.title}
            fill
            className="object-cover"
            sizes="160px"
          />
        </div>

        {/* 記事情報 */}
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {article.title}
          </h2>
          <p className="line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
            {article.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {article.category}
            </span>
            {article.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
