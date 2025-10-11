const fs = require('fs');
const path = require('path');

// Buat folder public/admin jika belum ada
const adminDir = path.join(__dirname, 'public', 'admin');
if (!fs.existsSync(adminDir)) {
  fs.mkdirSync(adminDir, { recursive: true });
}

// Copy config.yml
const sourceConfig = path.join(__dirname, 'static', 'admin', 'config.yml');
const destConfig = path.join(adminDir, 'config.yml');

if (fs.existsSync(sourceConfig)) {
  fs.copyFileSync(sourceConfig, destConfig);
  console.log('✅ CMS config copied successfully');
} else {
  console.log('❌ Source config.yml not found');
}

// Buat index.html untuk CMS
const indexHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <title>B13 Factory CMS</title>
  <link rel="icon" type="image/x-icon" href="/uploads/favicon.ico">
  <link rel="apple-touch-icon" href="/uploads/apple-touch-icon.png">
  <script src="https://unpkg.com/netlify-cms@^2.10.192/dist/netlify-cms.js"></script>
</head>
<body>
  <script>
    if (typeof CMS !== 'undefined') {
      CMS.init();
    }
  </script>
</body>
</html>`;

fs.writeFileSync(path.join(adminDir, 'index.html'), indexHtml);
console.log('✅ CMS index.html created successfully');