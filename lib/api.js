// API helper functions for SSG/ISR
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function getSiteConfig() {
  try {
    const response = await fetch(`${baseUrl}/api/content/site-config`);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error('Error fetching site config:', error);
  }
  
  return {
    title: 'B13 Factory - Garment & Advertising Specialist',
    description: 'Specialist dalam garment dan advertising. Jasa sablon, bordir, banner, dan berbagai kebutuhan promosi bisnis profesional.'
  };
}

export async function getHomeData() {
  try {
    const response = await fetch(`${baseUrl}/api/content/home`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching home data:', error);
  }
  
  return { success: false, home: null };
}

export async function getProducts() {
  try {
    const response = await fetch(`${baseUrl}/api/content/products`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
  
  return { success: false, products: [] };
}

export async function getProductCategories() {
  try {
    const response = await fetch(`${baseUrl}/api/content/product-categories`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching product categories:', error);
  }
  
  return { success: false, categories: [] };
}

export async function getPortfolio() {
  try {
    const response = await fetch(`${baseUrl}/api/content/portfolio`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching portfolio:', error);
  }
  
  return { success: false, portfolio: [] };
}

export async function getPortfolioCategories() {
  try {
    const response = await fetch(`${baseUrl}/api/content/portfolio-categories`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching portfolio categories:', error);
  }
  
  return { success: false, categories: [] };
}

export async function getAboutData() {
  try {
    const response = await fetch(`${baseUrl}/api/content/about`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching about data:', error);
  }
  
  return { success: false, about: null };
}

export async function getContactData() {
  try {
    const response = await fetch(`${baseUrl}/api/content/contact`);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error('Error fetching contact data:', error);
  }
  
  return { success: false, contact: null };
}