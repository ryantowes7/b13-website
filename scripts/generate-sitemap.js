const { exec } = require('child_process');

exec('npx next-sitemap', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating sitemap: ${error}`);
    return;
  }
  console.log('Sitemap generated successfully');
});
