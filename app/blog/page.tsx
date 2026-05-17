import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BlogSearch from '../components/blog/BlogSearch';
import { getAllPosts, getAllCategories } from '../lib/blog';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog | Mavinic Solar',
  description: 'Fique por dentro das novidades sobre Energia Solar, dicas de economia, e como instalar painéis fotovoltaicos em Umuarama e região.',
};

export default function BlogIndex() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <Navbar />

      {/* Header Section */}
      <section className="pt-40 pb-20 px-6 md:px-12 bg-gradient-to-b from-[#0B1220] to-[#0A0A0C] relative overflow-hidden border-b border-white/5">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#F7C843] rounded-full blur-[150px] opacity-5 pointer-events-none translate-x-1/3 -translate-y-1/2"></div>
        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#F7C843] text-sm font-bold tracking-widest uppercase mb-6 backdrop-blur-sm">
            <span>Conteúdo Especializado</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Blog <span className="text-[#F7C843]">Mavinic Solar</span>
          </h1>
          <p className="text-xl text-white/60 max-w-2xl mx-auto">
            Guias completos, dicas de economia e tudo que você precisa saber sobre a revolução da energia solar no Paraná.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-6xl">
          <BlogSearch posts={posts} categories={categories} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
