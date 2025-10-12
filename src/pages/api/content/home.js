import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    // Path ke file home content
    const filePath = path.join(process.cwd(), 'public', 'content', 'home', 'home.md');
    
    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Home content not found' });
    }
    
    // Baca file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const { data, content } = matter(fileContents);
    
    // Return parsed data
    return res.status(200).json({
      success: true,
      data: {
        ...data,
        body: content
      }
    });
  } catch (error) {
    console.error('Error reading home content:', error);
    return res.status(500).json({ 
      error: 'Failed to load home content',
      message: error.message 
    });
  }
}