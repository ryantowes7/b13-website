import { getAllProductCategories } from '../../../../lib/markdown';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const categories = getAllProductCategories();
    
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
      categories: []
    });
  }
}