/**
 * 記事データの読み込みと処理を行うユーティリティ関数
 */

import type { Article, ArticleMetadata } from './types';
import fs from 'fs';
import path from 'path';

/**
 * 記事データのディレクトリパス
 */
const ARTICLES_DIR = path.join(process.cwd(), 'data', 'articles');

/**
 * すべての記事IDを取得する
 */
export function getAllArticleIds(): string[] {
  if (!fs.existsSync(ARTICLES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(ARTICLES_DIR);
  return files
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''));
}

/**
 * 記事データを取得する
 * @param id 記事ID
 * @returns 記事データ
 */
export function getArticleById(id: string): Article | null {
  try {
    const filePath = path.join(ARTICLES_DIR, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContents) as Article;
  } catch (error) {
    console.error(`Error reading article ${id}:`, error);
    return null;
  }
}

/**
 * すべての記事データを取得する
 * @returns 記事データの配列
 */
export function getAllArticles(): Article[] {
  const ids = getAllArticleIds();
  const articles = ids
    .map((id) => getArticleById(id))
    .filter((article): article is Article => article !== null);

  // 作成日時順（新しい順）でソート
  return articles.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

/**
 * 記事メタデータを取得する（検索用）
 * @returns 記事メタデータの配列
 */
export function getAllArticleMetadata(): ArticleMetadata[] {
  const articles = getAllArticles();
  return articles.map((article) => ({
    id: article.id,
    title: article.title,
    description: article.description,
    category: article.category,
    tags: article.tags,
    speakers: article.speakers.map((speaker) => speaker.name),
    createdAt: article.createdAt,
    youtubeVideoId: article.youtubeVideoId,
  }));
}
