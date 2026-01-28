/**
 * ルビ（ふりがな）を表示するコンポーネント
 * ブラウザネイティブのruby表示を使用
 */

interface RubyTextProps {
  html: string;
  className?: string;
}

export function RubyText({ html, className = '' }: RubyTextProps) {
  return (
    <span
      className={`ruby-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
