import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  try {
    // Path ke file about content
    const filePath = path.join(process.cwd(), 'content', 'about', 'about.md');
    
    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'About content not found' });
    }
    
    // Baca file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // Parse frontmatter
    const { data, content } = matter(fileContents);
    
    // Return parsed data
    return res.status(200).json({
      success: true,
      about: {
        ...data,
        body: content
      }
    });
  } catch (error) {
    console.error('Error reading about content:', error);
    return res.status(500).json({ 
      error: 'Failed to load about content',
      message: error.message 
    });
  }
}