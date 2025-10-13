import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { slug, variants } = req.body;

    if (!slug) {
      return res.status(400).json({ error: 'Slug is required' });
    }

    const productsDir = path.join(process.cwd(), 'content', 'products');
    
    // Find the product file
    const files = fs.readdirSync(productsDir).filter(file => file.endsWith('.md'));
    const productFile = files.find(file => file.replace(/\.md$/, '') === slug);

    if (!productFile) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const filePath = path.join(productsDir, productFile);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    // Update variants
    data.variants = variants;

    // Reconstruct the markdown file
    const newContent = matter.stringify(content, data);

    // Write back to file
    fs.writeFileSync(filePath, newContent, 'utf8');

    return res.status(200).json({ 
      success: true,
      message: 'Stock updated successfully'
    });
  } catch (error) {
    console.error('Error updating product stock:', error);
    return res.status(500).json({ 
      error: 'Failed to update stock',
      message: error.message 
    });
  }
}