import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    const productsDir = path.join(process.cwd(), 'content', 'products');
    
    // Cek apakah folder ada
    if (!fs.existsSync(productsDir)) {
      return res.status(200).json({ products: [] });
    }
    
    // Baca semua file .md di folder products
    const files = fs.readdirSync(productsDir).filter(file => file.endsWith('.md'));
    
    // Parse setiap file
    const products = files.map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(productsDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        ...data,
        body: content
      };
    });
    
    // Return products
    return res.status(200).json({ 
      success: true,
      products,
      count: products.length
    });
  } catch (error) {
    console.error('Error reading products:', error);
    return res.status(500).json({ 
      error: 'Failed to load products',
      message: error.message 
    });
  }
}