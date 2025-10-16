// pages/api/content/contact.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const contactFile = path.join(process.cwd(), 'content', 'contact', 'contact.md');
    
    // Check if file exists
    if (!fs.existsSync(contactFile)) {
      console.warn('Contact file not found:', contactFile);
      return res.status(200).json({ 
        success: true,
        contact: null
      });
    }
    
    const fileContents = fs.readFileSync(contactFile, 'utf8');
    const { data } = matter(fileContents);
    
    res.status(200).json({
      success: true,
      contact: data
    });
  } catch (error) {
    console.error('Error fetching contact data:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch contact data',
      message: error.message
    });
  }
}