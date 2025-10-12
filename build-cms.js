const fs = require('fs');
const path = require('path');

console.log('🔧 Starting CMS build preparation...');

// Buat folder public/admin jika belum ada
const adminDir = path.join(__dirname, 'public', 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
  console.log('✅ Created public/admin directory');
}

// Verify admin files exist
const configYml = path.join(adminDir, 'config.yml');

if (fs.existsSync(configYml)) {
  console.log('✅ CMS config.yml verified: OK');
} else {
    console.log('⚠️  Warning: public/admin/config.yml not found');
  process.exit(1);
}

// Ensure content subdirectories exist
const contentDirs = ['home', 'products', 'portfolio', 'services', 'blog', 'pages', 'testimonials', 'team', 'categories', 'settings'];
contentDirs.forEach(dir => {
  const dirPath = path.join(contentDir, dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    console.log(`✅ Created ${dir} directory`);
  }
});

console.log('✅ CMS build preparation completed successfully!');