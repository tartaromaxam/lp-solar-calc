'use client';

import { useState } from 'react';
import { BlogPost } from '../../lib/blog';
import BlogCard from './BlogCard';
import { Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogSearchProps {
  posts: BlogPost[];
  categories: string[];
}

export default function BlogSearch({ posts, categories }: BlogSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todos');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          post.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full">
      {/* Search and Filter Header */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setActiveCategory('Todos')}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              activeCategory === 'Todos'
                ? 'bg-[#F7C843] text-[#0B1220] shadow-[0_0_15px_rgba(247,200,67,0.3)]'
                : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-[#F7C843] text-[#0B1220] shadow-[0_0_15px_rgba(247,200,67,0.3)]'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <input
            type="text"
            placeholder="Buscar artigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-[#F7C843]/50 focus:ring-1 focus:ring-[#F7C843]/50 transition-all"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
        </div>
      </div>

      {/* Results Grid */}
      {filteredPosts.length > 0 ? (
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredPosts.map((post) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={post.slug}
              >
                <BlogCard post={post} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <div className="py-20 text-center">
          <p className="text-white/50 text-lg">Nenhum artigo encontrado para a sua busca.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('Todos'); }}
            className="mt-4 text-[#F7C843] hover:underline"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}
