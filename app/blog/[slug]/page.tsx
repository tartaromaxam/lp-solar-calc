import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { ArrowLeft, Calendar, Clock, Code2 } from 'lucide-react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ProgressBar from '../../components/blog/ProgressBar';
import ArticleCTA from '../../components/blog/ArticleCTA';
import HighlightBox from '../../components/blog/mdx/HighlightBox';
import StatsDisplay from '../../components/blog/mdx/StatsDisplay';
import YouTubeEmbed from '../../components/blog/mdx/YouTubeEmbed';
import { getPostBySlug, getPostSlugs } from '../../lib/blog';

// Pre-render pages at build time
export async function generateStaticParams() {
  const slugs = getPostSlugs();
  return slugs.map((slug) => ({
    slug: slug.replace(/\.md$/, ''),
  }));
}

// Generate SEO metadata dynamically
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);
  if (!post) return { title: 'Artigo não encontrado' };

  return {
    title: `${post.title} | Mavinic Solar`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: ['Mavinic Solar'],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

const components = {
  ArticleCTA,
  HighlightBox,
  StatsDisplay,
  YouTubeEmbed,
};

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const post = getPostBySlug(resolvedParams.slug);

  if (!post) {
    notFound();
  }

  const formattedDate = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }).format(new Date(post.date + 'T12:00:00Z'));

  // Schema Markup for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: 'Mavinic Solar',
      url: 'https://solar.mavinic.com.br'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mavinic Solar',
      logo: {
        '@type': 'ImageObject',
        url: 'https://solar.mavinic.com.br/assets/branding/logo-light.svg'
      }
    },
    description: post.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://solar.mavinic.com.br/blog/${post.slug}`
    }
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Início',
        item: 'https://solar.mavinic.com.br'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://solar.mavinic.com.br/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `https://solar.mavinic.com.br/blog/${post.slug}`
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#0A0A0C]">
      <ProgressBar />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumbSchema]) }}
      />
      <Navbar />

      {/* Hero Header */}
      <article className="pt-32 pb-20 relative">
        <div className="container mx-auto max-w-4xl px-6 relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-white/50 hover:text-[#F7C843] transition-colors mb-8 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o Blog
          </Link>

          <div className="flex items-center gap-4 text-white/50 text-sm mb-6">
            <div className="bg-[#F7C843]/10 text-[#F7C843] px-3 py-1 rounded-full font-bold uppercase tracking-wider text-xs border border-[#F7C843]/20">
              {post.category}
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readingTime}</span>
            </div>
          </div>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-8">
            {post.title}
          </h1>

          <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <Image 
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-transparent to-transparent opacity-60"></div>
          </div>

          {/* Showroom B2B Alert */}
          <div className="bg-[#F7C843]/10 border border-[#F7C843]/30 px-6 py-5 rounded-2xl mb-12 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#F7C843]/20 rounded-full flex items-center justify-center shrink-0">
                <Code2 className="w-6 h-6 text-[#F7C843]" />
              </div>
              <p className="text-white/80 font-medium text-sm md:text-base leading-relaxed max-w-xl">
                <strong className="text-[#F7C843] block sm:inline">💡 Showroom Mavinic:</strong> Como este projeto foi construído: Este blog é uma demonstração real de arquitetura SEO de alta conversão. Quer dominar o Google na sua região?
              </p>
            </div>
            <Link href="/#orcamento" className="bg-[#F7C843] text-[#0B1220] px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform duration-300 shrink-0 shadow-[0_0_20px_rgba(247,200,67,0.3)]">
              Quero um site assim
            </Link>
          </div>

          {/* Article Content */}
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-p:text-white/80 prose-a:text-[#F7C843] hover:prose-a:text-[#D4AF37] prose-strong:text-white prose-blockquote:border-[#F7C843] prose-blockquote:bg-white/5 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-img:rounded-xl">
            <MDXRemote source={post.content} components={components} />
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
