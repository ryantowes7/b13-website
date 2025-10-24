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
      
      // Normalize image fields for better compatibility
      // Extract images from images_section if they exist
      let image = data.image; // Use existing image if present
      let home_image = data.home_image;
      let card_image = data.card_image;
      let detail_image = data.detail_image;
      
      // If images_section exists, extract all image types
      if (data.images_section) {
        home_image = home_image || data.images_section.home_image;
        card_image = card_image || data.images_section.card_image;
        detail_image = detail_image || data.images_section.detail_image;
      }
      
      // Set main image field with priority: existing image > home_image > card_image > detail_image
      if (!image) {
        image = home_image || card_image || detail_image;
      }
      
      return {
        slug,
        ...data,
        image, // Main image for general use (especially featured products)
        home_image, // For home page display
        card_image, // For product list cards
        detail_image, // For product detail page
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