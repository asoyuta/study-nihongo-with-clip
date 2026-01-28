/**
 * 記事詳細ページ
 */

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getArticleById, getAllArticleIds } from '@/lib/articles';
import { VideoPlayer } from '@/components/VideoPlayer';
import { SpeakerIcon } from '@/components/SpeakerIcon';
import type { Article } from '@/lib/types';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = getAllArticleIds();
  return ids.map((id) => ({ id }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { id } = await params;
  const article = getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* 戻るボタン */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
        >
          ← 記事一覧に戻る
        </Link>

        {/* 記事ヘッダー */}
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {article.title}
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            {article.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {article.category}
            </span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600 dark:bg-gray-700 dark:text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* 動画プレーヤー */}
        <div className="mb-8">
          <VideoPlayer videoId={article.youtubeVideoId} />
        </div>

        {/* 文字起こし */}
        <section className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
            文字起こし
          </h2>
          <div className="space-y-4">
            {article.transcript.map((item, index) => {
              const speaker = article.speakers.find(
                (s) => s.id === item.speakerId
              );
              const speakerName = speaker?.name || 'Unknown';

              return (
                <div
                  key={index}
                  className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700"
                >
                  <div className="mb-2 flex items-center gap-2">
                    <SpeakerIcon icon={speaker?.icon} name={speakerName} />
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {speakerName}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <p
                      className="text-gray-900 dark:text-gray-100"
                      dangerouslySetInnerHTML={{ __html: item.japaneseWithRuby }}
                    />
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.english}
                    </p>
                    {item.explanation && (
                      <p className="text-sm text-gray-500 dark:text-gray-500">
                        💡 {item.explanation}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
