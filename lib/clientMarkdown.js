/**
 * Client-side markdown to HTML converter
 * Lightweight function untuk rendering markdown di browser
 * Mendukung: paragraphs, bold, italic, lists, line breaks, headings
 */

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