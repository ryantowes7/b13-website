// Utility functions for dynamic positioning and styling
const getVerticalAlignment = (vertical) => {
  switch (vertical) {
    case 'top': return 'items-start pt-20';
    case 'bottom': return 'items-end pb-20';
    case 'center':
    default: return 'items-center';
  }
};

const getHorizontalAlignment = (horizontal) => {
  switch (horizontal) {
    case 'left': return 'justify-start';
    case 'right': return 'justify-end';
    case 'center':
    default: return 'justify-center';
  }
};

const getTextAlignment = (textAlign) => {
  switch (textAlign) {
    case 'left': return 'text-left';
    case 'right': return 'text-right';
    case 'center':
    default: return 'text-center mx-auto';
  }
};

const getTitleSize = (size) => {
  switch (size) {
    case 'small': return 'text-2xl sm:text-3xl md:text-4xl';
    case 'medium': return 'text-3xl sm:text-4xl md:text-5xl';
    case 'large': return 'text-4xl sm:text-5xl md:text-6xl';
    case 'extra-large': return 'text-5xl sm:text-6xl md:text-7xl lg:text-8xl';
    default: return 'text-4xl md:text-5xl lg:text-6xl';
  }
};

const getSubtitleSize = (size) => {
  switch (size) {
    case 'small': return 'text-sm sm:text-base md:text-lg';
    case 'medium': return 'text-base sm:text-lg md:text-xl';
    case 'large': return 'text-lg sm:text-xl md:text-2xl';
    default: return 'text-xl md:text-2xl';
  }
};

const formatMarkdown = (text) => {
  if (!text) return '';
  
  let html = text;
  
  // Bold: **text**
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Italic: *text*
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  
  // Bullet lists
  const lines = html.split('<br />');
  let inList = false;
  const processed = lines.map(line => {
    if (line.trim().match(/^[-*]\s/)) {
      const content = line.trim().replace(/^[-*]\s/, '');
      if (!inList) {
        inList = true;
        return '<ul class=\"list-disc list-inside\"><li>' + content + '</li>';
      }
      return '<li>' + content + '</li>';
    } else {
      if (inList) {
        inList = false;
        return '</ul>' + line;
      }
      return line;
    }
  });
  
  if (inList) processed.push('</ul>');
  
  return processed.join('<br />');
};

export default function ContactBanner({ banner }) {
  // Fallback jika tidak ada banner data
  if (!banner) {
    return (
      <section className="relative bg-gradient-to-r from-secondary-600 to-secondary-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-white/90 leading-relaxed">
              Siap membantu kebutuhan garment dan advertising Anda. Hubungi kami untuk konsultasi gratis.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const textPos = banner.banner_text_position || {};

  return (
    <section className="relative h-[400px] overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: `url(${banner.banner_image || '/uploads/placeholder.jpg'})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40" />
      </div>

      {/* Content with Dynamic Positioning */}
      <div className={`relative h-full container-custom flex ${getVerticalAlignment(textPos.vertical)} ${getHorizontalAlignment(textPos.horizontal)}`}>
        <div className={`max-w-3xl text-white ${getTextAlignment(textPos.text_align)}`}>
          <h1 className={`font-bold mb-4 leading-tight ${getTitleSize(textPos.title_size)}`}>
            {banner.banner_title || 'Contact Us'}
          </h1>
          <div 
            className={`text-white/90 leading-relaxed prose prose-invert ${getSubtitleSize(textPos.subtitle_size)}`}
            dangerouslySetInnerHTML={{ __html: formatMarkdown(banner.banner_subtitle || 'Siap membantu kebutuhan garment dan advertising Anda. Hubungi kami untuk konsultasi gratis.') }}
          />
        </div>
      </div>
    </section>
  );
}