import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    const portfolioDir = path.join(process.cwd(), 'public', 'content', 'portfolio');
    
    // Cek apakah folder ada
    if (!fs.existsSync(portfolioDir)) {
      return res.status(200).json({ portfolio: [] });
    }
    
    // Baca semua file .md di folder portfolio
    const files = fs.readdirSync(portfolioDir).filter(file => file.endsWith('.md'));
    
    // Parse setiap file
    const portfolio = files.map(fileName => {
      const slug = fileName.replace(/\.md$/, '');
      const filePath = path.join(portfolioDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      
      return {
        slug,
        ...data,
        details: content
      };
    });
    
    // Return portfolio
    return res.status(200).json({ 
      success: true,
      portfolio,
      count: portfolio.length
    });
  } catch (error) {
    console.error('Error reading portfolio:', error);
    return res.status(500).json({ 
      error: 'Failed to load portfolio',
      message: error.message 
    });
  }
}