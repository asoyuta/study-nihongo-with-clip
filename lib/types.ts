/**
 * プロジェクト全体で使用する型定義
 */

/**
 * 発話者情報
 */
export interface Speaker {
  id: string;
  name: string;
  icon?: string;
}

/**
 * 文字起こしデータ
 */
export interface Transcript {
  speakerId: string;
  japanese: string;
  japaneseWithRuby: string;
  hiragana: string;
  english: string;
  explanation: string;
  timestamp?: number;
}

/**
 * 記事データ
 */
export interface Article {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  youtubeVideoId: string;
  category: string;
  tags: string[];
  speakers: Speaker[];
  transcript: Transcript[];
}

/**
 * 記事メタデータ（検索用）
 */
export interface ArticleMetadata {
  id: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  speakers: string[]; // 発話者名のみ
  createdAt: string;
  youtubeVideoId: string;
}
