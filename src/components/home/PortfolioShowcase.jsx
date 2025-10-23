// website/src/components/home/PortfolioShowcase.jsx
'use client';
import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import { ChevronRight, Plus } from 'lucide-react';

export function markdownToHtml(markdown) {
  if (!markdown || typeof markdown !== 'string') return '';
  
  let html = markdown;
  
  // Escape HTML tags to prevent XSS (optional - uncomment if needed)
  // html = html.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  
  // Headers: # H1, ## H2, ### H3, etc.
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');
  
  // Bold: **text** or __text__
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Italic: *text* or _text_ (but not in middle of words)
  html = html.replace(/\*([^\*]+?)\*/g, '<em>$1</em>');
  html = html.replace(/\b_([^_]+?)_\b/g, '<em>$1</em>');
  
  // Links: [text](url)
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-primary-600 hover:underline">$1</a>');
  
  // Process lists (unordered and ordered)
  const lines = html.split('\n');
  let inList = false;
  let listType = null;
  let processedLines = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const unorderedMatch = line.match(/^\s*[-*+]\s+(.+)$/);
    const orderedMatch = line.match(/^\s*(\d+)\.\s+(.+)$/);
    
    if (unorderedMatch) {
      if (!inList) {
        processedLines.push('<ul class="list-disc list-inside space-y-1 ml-4">');
        inList = true;
        listType = 'ul';
      } else if (listType !== 'ul') {
        processedLines.push('</ol>');
        processedLines.push('<ul class="list-disc list-inside space-y-1 ml-4">');
        listType = 'ul';
      }
      processedLines.push(`<li>${unorderedMatch[1]}</li>`);
    } else if (orderedMatch) {
      if (!inList) {
        processedLines.push('<ol class="list-decimal list-inside space-y-1 ml-4">');
        inList = true;
        listType = 'ol';
      } else if (listType !== 'ol') {
        processedLines.push('</ul>');
        processedLines.push('<ol class="list-decimal list-inside space-y-1 ml-4">');
        listType = 'ol';
      }
      processedLines.push(`<li>${orderedMatch[2]}</li>`);
    } else {
      if (inList) {
        processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
        inList = false;
        listType = null;
      }
      processedLines.push(line);
    }
  }
  
  // Close any open list
  if (inList) {
    processedLines.push(listType === 'ul' ? '</ul>' : '</ol>');
  }
  
  html = processedLines.join('\n');
  
  // Paragraphs - split by double line breaks
  const blocks = html.split(/\n+/);
  const processedBlocks = blocks.map(block => {
    const trimmed = block.trim();
    if (!trimmed) return '';
    
    // Don't wrap if already wrapped in HTML tags
    if (trimmed.match(/^<(h[1-6]|ul|ol|blockquote|pre|div)/)) {
      return trimmed;
    }
    
    return `<p class="mb-3">${trimmed}</p>`;
  });
  
  html = processedBlocks.join('\n');
  
  // Line breaks - single line breaks become <br />
  html = html.replace(/\n/g, '<br />');
  
  // Clean up excessive <br /> tags
  html = html.replace(/(<br \/>){3,}/g, '<br /><br />');
  
  return html;
}

/**
 * Helper untuk menambahkan class alignment ke konten HTML
 */
export function applyTextAlignment(html, alignment = 'left') {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify'
  };
  
  const className = alignmentClasses[alignment] || 'text-left';
  return `<div class="${className}">${html}</div>`;
}

/**
 * Helper untuk styling markdown content dengan Tailwind classes
 */
export function getMarkdownStyles() {
  return {
    wrapper: 'prose prose-neutral max-w-none',
    heading: 'font-bold mb-2',
    paragraph: 'mb-3 leading-relaxed',
    list: 'space-y-1 ml-4',
    link: 'text-primary-600 hover:underline'
  };
}

export default function PortfolioShowcase() {
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [portfolioStats, setPortfolioStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load portfolio stats dari API
  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await fetch('/api/content/home');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.home?.portfolio_stats) {
            setPortfolioStats(data.home.portfolio_stats);
          }
        }
      } catch (error) {
        console.error('Error loading stats:', error);
        // Set default stats if fetch fails
        setPortfolioStats({
          projects_completed: '150+',
          happy_clients: '50+',
          years_experience: '5+'
        });
      }
    };
    
    loadStats();
  }, []);

  // Load portfolio dari API
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        const res = await fetch('/api/content/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data.success && data.portfolio) {
            setPortfolioItems(data.portfolio);
          }
        }
      } catch (error) {
        console.error('Error loading portfolio:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPortfolio();
  }, []);  

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading portfolio...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen flex items-center bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50/20 to-secondary-50/20" />
      
      <div className="container-custom section-padding px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center mb-8 sm:mb-12 lg:mb-16">
          {/* Header Section - Mobile Optimized */}
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Our Portfolio
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 mb-6 sm:mb-8 leading-relaxed">
              Lihat project-project yang telah kami kerjakan untuk berbagai klien dari berbagai industri. 
              Setiap project dikerjakan dengan standar kualitas tertinggi.
            </p>
            
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button href="/portofolio" variant="primary" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto">
                Explore Portfolio
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
              </Button>
              
              <Button href="/contact-us" variant="outline" className="text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 border-2 w-full sm:w-auto">
                Start Your Project
              </Button>
            </div>
          </div>

          {/* Stats - Mobile Optimized */}
          {portfolioStats && (
            <div className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-600 mb-1 sm:mb-2">{portfolioStats.projects_completed}</div>
              <div className="text-neutral-600 text-xs sm:text-sm leading-tight">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent-500 mb-1 sm:mb-2">{portfolioStats.happy_clients}</div>
              <div className="text-neutral-600 text-xs sm:text-sm leading-tight">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-500 mb-1 sm:mb-2">{portfolioStats.years_experience}</div>
              <div className="text-neutral-600 text-xs sm:text-sm leading-tight">Years Experience</div>
            </div>
          </div>
          )}
        </div>

        {/* Portfolio Grid - Mobile Optimized */}
        {portfolioItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-neutral-500 text-base sm:text-lg">Belum ada portfolio yang tersedia</p>
          </div>
        ) : (
        <div className="mb-8 sm:mb-10 lg:mb-12">
          {/* Grid Layout - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {portfolioItems.slice(0, 6).map((item, index) => (
              <a
              key={item.slug || index}
              href={`/portofolio/${item.slug}`}
                className="group block bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Image Container - Aspect ratio 16:10 */}
              <div className="aspect-[16/10] bg-gradient-to-br from-neutral-100 to-neutral-200 relative overflow-hidden">
                {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-neutral-300 rounded-full flex items-center justify-center mb-4 mx-auto">
                          <Plus size={24} className="text-neutral-500" />
                        </div>
                        <p className="text-neutral-500 font-medium">Portfolio Image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                
                {/* Content - Mobile Optimized */}
                <div className="p-4 sm:p-5 lg:p-6">
                  {/* Date & Category Badge */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 flex-wrap">
                    <span className="text-xs sm:text-sm text-neutral-500">
                      {item.date ? new Date(item.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : '2024'}
                    </span>
                    {item.category && (
                      <>
                        <span className="text-neutral-300">•</span>
                        <span className="text-xs uppercase tracking-wider text-primary-600 font-semibold">
                          {item.category}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-neutral-900 mb-2 sm:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>

                  {/* Description */}
                  <div 
                    className="text-neutral-600 text-xs sm:text-sm leading-relaxed mb-3 sm:mb-4 line-clamp-2 prose prose-sm max-w-none prose-p:mb-1 prose-ul:my-1 prose-li:my-0"
                    dangerouslySetInnerHTML={{ __html: markdownToHtml(item.description || '') }}
                  />

                  {/* Client Info */}
                  {item.client && (
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-neutral-500 mb-3">
                      <span className="font-medium">Client:</span>
                      <span className="truncate">{item.client}</span>
                    </div>
                  )}

                  {/* Read More Link */}
                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-neutral-100">
                    <span className="text-primary-600 text-xs sm:text-sm font-medium inline-flex items-center group-hover:gap-2 transition-all">
                      Read more
                      <ChevronRight size={14} className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all sm:w-4 sm:h-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        )}

        {/* View All Button - Mobile Optimized */}
        <div className="text-center">
          <Button 
            href="/portofolio" 
            variant="outline"
            className="border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white text-sm sm:text-base lg:text-lg px-6 sm:px-8 py-3 sm:py-4 group w-full sm:w-auto"
          >
            View All Projects
            <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform sm:w-5 sm:h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}