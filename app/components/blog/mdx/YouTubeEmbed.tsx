"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface YouTubeEmbedProps {
  id: string;
  title?: string;
}

export default function YouTubeEmbed({ id, title = 'YouTube video' }: YouTubeEmbedProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  // We use the maxresdefault thumbnail which is the highest quality available for most videos
  const thumbnailUrl = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

  return (
    <div className="my-14 w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group relative bg-[#0B1220]">
      <div className="relative w-full pb-[56.25%] h-0">
        {!isLoaded ? (
          <button 
            onClick={() => setIsLoaded(true)}
            className="absolute inset-0 w-full h-full cursor-pointer focus:outline-none"
            aria-label={`Play video: ${title}`}
          >
            {/* Thumbnail Image */}
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Dark Overlay for Premium Feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C]/90 via-[#0A0A0C]/40 to-transparent transition-opacity duration-500 group-hover:opacity-80"></div>
            
            {/* Play Button Center */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="w-20 h-20 md:w-24 md:h-24 bg-[#F7C843] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(247,200,67,0.4)] backdrop-blur-sm border border-white/20 transition-all duration-300 group-hover:shadow-[0_0_60px_rgba(247,200,67,0.6)] group-hover:bg-[#FFD700]"
              >
                <Play className="w-8 h-8 md:w-10 md:h-10 text-[#0B1220] ml-2" fill="currentColor" />
              </motion.div>
            </div>

            {/* Title / Brand Overlay */}
            <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-[#F7C843] shadow-[0_0_10px_rgba(247,200,67,0.8)]"></div>
                <span className="text-white/60 text-xs font-bold tracking-wider uppercase">Mavinic Solar Vídeos</span>
              </div>
              <h3 className="text-white text-xl md:text-2xl font-bold line-clamp-2 drop-shadow-lg group-hover:text-[#F7C843] transition-colors">{title}</h3>
            </div>
          </button>
        ) : (
          <iframe
            className="absolute top-0 left-0 w-full h-full"
            src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </div>
  );
}
