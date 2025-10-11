const fs = require('fs');
const path = require('path');

// Buat folder public/admin jika belum ada
const adminDir = path.join(__dirname, 'public', 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

// Copy config.yml
const sourceFile = path.join(__dirname, 'static', 'admin', 'config.yml');
const destFile = path.join(adminDir, 'config.yml');

if (fs.existsSync(sourceFile)) {
  fs.copyFileSync(sourceFile, destFile);
  console.log('✅ CMS config copied successfully');
} else {
  console.log('❌ Source config.yml not found');
}