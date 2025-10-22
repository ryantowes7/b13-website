import { remark } from 'remark';
import html from 'remark-html';

/**
 * Convert markdown string to HTML
 * @param {string} markdown - Markdown content
 * @returns {Promise<string>} HTML string
 */
export async function markdownToHtml(markdown) {
  if (!markdown) return '';
  
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);
  
  return result.toString();
}

/**
 * Simple synchronous markdown to HTML for client-side rendering
 * Handles basic markdown: paragraphs, lists, bold, italic
 * @param {string} markdown - Markdown content
 * @returns {string} HTML string
 */
export function simpleMarkdownToHtml(markdown) {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Bold: **text** or __text__
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__(.+?)__/g, '<strong>$1</strong>');
  
  // Italic: *text* or _text_
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  html = html.replace(/_(.+?)_/g, '<em>$1</em>');
  
  // Unordered lists
  html = html.replace(/^\s*[-*+]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
  
  // Ordered lists
  html = html.replace(/^\s*\d+\.\s+(.+)$/gm, '<li>$1</li>');
  
  // Paragraphs (double line breaks)
  html = html.split('').map(para => {
    if (para.trim() && !para.includes('<ul>') && !para.includes('<li>')) {
      return `<p>${para.trim()}</p>`;
    }
    return para;
  }).join('');
  
  // Line breaks
  html = html.replace(/ /g, '<br />');
  
  return html;
}