import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const categoriesDir = path.join(process.cwd(), 'content', 'product-categories');
    
    // Check if folder exists
    if (!fs.existsSync(categoriesDir)) {
      console.error('Categories directory not found:', categoriesDir);
      return res.status(200).json({ 
        success: true,
        categories: [],
        count: 0
      });
    }
    
    // Read all .md files in product-categories folder
    const files = fs.readdirSync(categoriesDir).filter(file => file.endsWith('.md'));
    
    // Parse each file
    const categories = files.map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(categoriesDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      
      return {
        slug: data.slug || slug,
        name: data.name || '',
        description: data.description || '',
        banners: data.banners || [],
        color: data.color || 'blue',
        icon: data.icon || 'Package',
        is_default: data.is_default || false,
      };
    })
    .sort((a, b) => {
      // Sort with default category first
      if (a.is_default) return -1;
      if (b.is_default) return 1;
      return a.name.localeCompare(b.name);
    });
    
    res.status(200).json({
      success: true,
      categories,
      count: categories.length
    });
  } catch (error) {
    console.error('Error fetching product categories:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product categories',
      message: error.message,
      categories: []
    });
  }
}