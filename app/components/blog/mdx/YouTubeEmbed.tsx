import React from 'react';

interface YouTubeEmbedProps {
  id: string;
  title?: string;
}

export default function YouTubeEmbed({ id, title = 'YouTube video' }: YouTubeEmbedProps) {
  return (
    <div className="my-10 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
      <div className="relative w-full pb-[56.25%] h-0">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
