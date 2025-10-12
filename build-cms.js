const fs = require('fs');
const path = require('path');

// Buat folder public/admin jika belum ada
const adminDir = path.join(__dirname, 'public', 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
  console.log('✅ Created public/admin directory');
}

// Verify admin files exist
const indexHtml = path.join(adminDir, 'index.html');
const configYml = path.join(adminDir, 'config.yml');

if (fs.existsSync(indexHtml) && fs.existsSync(configYml)) {
  console.log('✅ CMS files verified successfully');
  console.log('   - index.html: OK');
  console.log('   - config.yml: OK');
} else {
if (!fs.existsSync(indexHtml)) {
    console.log('⚠️  Warning: public/admin/index.html not found');
  }
  if (!fs.existsSync(configYml)) {
    console.log('⚠️  Warning: public/admin/config.yml not found');
  }
}

// Buat folder content jika belum ada
const contentDir = path.join(__dirname, 'public', 'content');
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
  console.log('✅ Created public/content directory');
}

console.log('✅ CMS build preparation completed');