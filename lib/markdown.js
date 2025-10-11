import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getAllProducts() {
  const productsDir = path.join(contentDirectory, 'products');
  const fileNames = fs.readdirSync(productsDir);
  
  const products = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(productsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    
    return {
      slug,
      ...data
    };
  });
  
  return products;
}

export function getSiteConfig() {
  const configPath = path.join(process.cwd(), 'site-config.json');
  const configData = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(configData);
}