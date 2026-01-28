'use client';

/**
 * 発話者アイコンコンポーネント（Client Component）
 */

interface SpeakerIconProps {
  icon?: string;
  name: string;
}

export function SpeakerIcon({ icon, name }: SpeakerIconProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    // アイコン読み込み失敗時はデフォルトアイコンを表示
    e.currentTarget.src = '/images/default-speaker-icon.svg';
  };

  return (
    <>
      {icon ? (
        <img
          src={icon}
          alt={name}
          className="h-8 w-8 rounded-full object-cover"
          onError={handleError}
        />
      ) : (
        <img
          src="/images/default-speaker-icon.svg"
          alt={name}
          className="h-8 w-8 rounded-full"
        />
      )}
    </>
  );
}
