import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../../lib/blog';
import { Clock, Calendar, ArrowRight } from 'lucide-react';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  // Format date correctly
  const dateObj = new Date(post.date);
  // Add a day to fix timezone offset issues if needed, or just use string split if it's YYYY-MM-DD
  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.date + 'T12:00:00Z'));

  return (
    <Link 
      href={`/blog/${post.slug}`}
      className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-[0_10px_40px_rgba(247,200,67,0.15)]"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#0A0A0C]">
        <Image 
          src={post.image}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1220] via-transparent to-transparent opacity-80" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4 bg-[#F7C843]/90 text-[#0B1220] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase backdrop-blur-sm shadow-lg">
          {post.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Meta Info */}
        <div className="flex items-center gap-4 text-white/50 text-xs mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-[#F7C843] transition-colors">
          {post.title}
        </h3>
        <p className="text-white/70 text-sm line-clamp-3 mb-6 flex-grow">
          {post.description}
        </p>

        {/* Action Link */}
        <div className="flex items-center gap-2 text-[#F7C843] text-sm font-bold tracking-wide mt-auto">
          <span>Ler Artigo</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}
