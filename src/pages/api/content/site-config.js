import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  try {
    // Path ke file site config
    const filePath = path.join(process.cwd(), 'site-config.json');
    
    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
      // Return default config
      return res.status(200).json({
        title: 'B13 Factory - Garment & Advertising',
        description: 'Produsen garment dan advertising berkualitas tinggi untuk kebutuhan bisnis Anda',
        logo: '/uploads/logo1.png',
        favicon: '/uploads/favicon.ico',
        contact_email: 'info@b13factory.com',
        contact_phone: '+62 812-3456-7890',
        address: 'Jl. Arowana Perum Kebon Agung Indah, Jember, Indonesia'
      });
    }
    
    // Baca file
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(fileContents);
    
    // Return config
    return res.status(200).json(config);
  } catch (error) {
    console.error('Error reading site config:', error);
    return res.status(500).json({ 
      error: 'Failed to load site config',
      message: error.message 
    });
  }
}