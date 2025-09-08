document.addEventListener('DOMContentLoaded', () => {
  // ===== SMOOTH SCROLL =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const toId = this.getAttribute('href').slice(1);
      const toElem = document.getElementById(toId);
      if (toElem) {
        e.preventDefault();
        toElem.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ===== LOAD GLOBAL SITE SETTINGS =====
  function loadSiteSettings() {
    fetch('content/settings/site.json')
      .then(res => res.json())
      .then(data => {
        // Logo
        const logoElem = document.querySelector('.logo-img');
        if (logoElem && data.logo) {
          logoElem.src = `static/assets/images/${data.logo}`;
          logoElem.alt = data.site_name || 'Logo';
        }
        // Site name di logo-text
        const logoTextElem = document.querySelector('.logo-text');
        if (logoTextElem && data.site_name) {
          logoTextElem.textContent = data.site_name;
        }
        // Favicon
        if (data.favicon) {
          let faviconElem = document.querySelector("link[rel~='icon']");
          if (!faviconElem) {
            faviconElem = document.createElement('link');
            faviconElem.rel = 'icon';
            document.head.appendChild(faviconElem);
          }
          faviconElem.href = `static/assets/images/${data.favicon}`;
        }
        // Title
        if (data.site_name) document.title = data.site_name;
        // Footer kontak info
        const footerAddr = document.querySelector('.footer-address');
        if (footerAddr && data.address) {
          footerAddr.textContent = data.address;
        }
        // Footer email/wa
        const footerEmail = document.querySelector('.site-email');
        if (footerEmail && data.contact_email) {
          footerEmail.textContent = data.contact_email;
        }
        const footerWA = document.querySelector('.site-wa');
        if (footerWA && data.whatsapp) {
          footerWA.href = "https://wa.me/" + data.whatsapp.replace(/\D/g, "");
          footerWA.textContent = data.whatsapp;
        }
        // Footer social
        const ig = document.querySelector('.site-instagram');
        if (ig && data.instagram) {
          ig.href = "https://instagram.com/" + data.instagram;
        }
        const fb = document.querySelector('.site-facebook');
        if (fb && data.facebook) {
          fb.href = "https://facebook.com/" + data.facebook;
        }
      });
  }
  loadSiteSettings();

  // ===== LOAD HOMEPAGE CONTENT =====
  if (
    window.location.pathname.endsWith('index.html') ||
    window.location.pathname === '/' ||
    window.location.pathname === '/index.html'
  ) {
    fetch('content/settings/home.json')
      .then(res => res.json())
      .then(home => {
        // Hero
        const heroTitle = document.querySelector('.hero-content h1');
        const heroText = document.querySelector('.hero-content p');
        const heroImg = document.querySelector('.hero-img img');
        if (heroTitle && home.hero_title) heroTitle.textContent = home.hero_title;
        if (heroText && home.hero_text) heroText.textContent = home.hero_text;
        if (heroImg && home.hero_image) heroImg.src = `static/assets/images/${home.hero_image}`;
        // CTA
        const ctaBtn = document.querySelector('.cta-btn');
        if (ctaBtn && home.cta_text) ctaBtn.textContent = home.cta_text;
        if (ctaBtn && home.cta_link) ctaBtn.href = home.cta_link;
        // Layanan
        const serviceSection = document.querySelector('.services');
        if (serviceSection && home.services) {
          const serviceTitle = serviceSection.querySelector('h2');
          if (serviceTitle && home.service_section_title) serviceTitle.textContent = home.service_section_title;
          const serviceList = serviceSection.querySelector('.service-list');
          if (serviceList) {
            serviceList.innerHTML = '';
            home.services.forEach(service => {
              serviceList.innerHTML += `
                <div class="service-card">
                  <img src="static/assets/images/${service.image}" alt="${service.title}">
                  <h3>${service.title}</h3>
                  <p>${service.description}</p>
                </div>
              `;
            });
          }
        }
        // Section titles
        const showcaseSection = document.querySelector('.showcase');
        if (showcaseSection && home.showcase_section_title)
          showcaseSection.querySelector('h2').textContent = home.showcase_section_title;
        const articlesSection = document.querySelector('.articles');
        if (articlesSection && home.articles_section_title)
          articlesSection.querySelector('h2').textContent = home.articles_section_title;
        const contactSection = document.querySelector('.contact');
        if (contactSection && home.contact_section_title)
          contactSection.querySelector('h2').textContent = home.contact_section_title;
      });
  }

  // ===== LOAD ABOUT PAGE CONTENT =====
  if (window.location.pathname.endsWith('about.html')) {
    fetch('content/settings/about.json')
      .then(res => res.json())
      .then(about => {
        const aboutSection = document.querySelector('.about-section');
        if (!aboutSection) return;
        // Judul & deskripsi
        const h2 = aboutSection.querySelector('h2');
        if (h2 && about.title) h2.textContent = about.title;
        const aboutContent = aboutSection.querySelector('.about-content');
        if (aboutContent) {
          aboutContent.innerHTML = `
            <img src="static/assets/images/${about.team_image || 'team.jpg'}" alt="Tim">
            <div>
              <p>${about.description}</p>
              <ul>
                ${about.services.map(s => `<li>${s}</li>`).join('')}
              </ul>
              <p>
                <strong>Alamat:</strong> <span class="about-address">${about.address}</span><br>
                <strong>Email:</strong> <span class="about-email">${about.email}</span><br>
                <strong>WhatsApp:</strong> <a class="about-wa" href="https://wa.me/${about.whatsapp.replace(/\D/g,'')}" target="_blank">${about.whatsapp}</a>
              </p>
            </div>
          `;
        }
      });
  }

  // ===== LOAD PRODUCTS (homepage & products.html) =====
  function loadProducts() {
    const productsList = document.getElementById('products-list');
    if (!productsList) return;
    fetch('content/products/index-products.json')
      .then(res => res.json())
      .then(products => {
        productsList.innerHTML = '';
        let showCount = (window.location.pathname.includes('products.html')) ? products.length : 4;
        products.slice(0, showCount).forEach(product => {
          const imgSrc = product.image ? `static/assets/uploads/${product.image}` : 'static/assets/images/product-default.jpg';
          productsList.innerHTML += `
            <div class="product-card">
              <img src="${imgSrc}" alt="${product.name}" onerror="this.src='static/assets/images/product-default.jpg'">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
              <span>Rp${Number(product.price).toLocaleString()}</span>
            </div>
          `;
        });
      })
      .catch(() => {
        productsList.innerHTML = "<p>Gagal memuat produk.</p>";
      });
  }
  if(document.getElementById('products-list')) loadProducts();

  // ===== LOAD ARTICLES (homepage & articles.html) =====
  function loadArticles() {
    const articlesList = document.getElementById('articles-list');
    if (!articlesList) return;
    fetch('content/articles/index-articles.json')
      .then(res => res.json())
      .then(articles => {
        articlesList.innerHTML = '';
        let showCount = (window.location.pathname.includes('articles.html')) ? articles.length : 4;
        articles.slice(0, showCount).forEach(article => {
          const imgSrc = article.image ? `static/assets/uploads/${article.image}` : 'static/assets/images/article-default.jpg';
          articlesList.innerHTML += `
            <div class="article-card">
              <img src="${imgSrc}" alt="${article.title}" onerror="this.src='static/assets/images/article-default.jpg'">
              <h3>${article.title}</h3>
              <p>${article.excerpt || ''}</p>
            </div>
          `;
        });

        // Search feature (on articles.html)
        const searchInput = document.getElementById('search-article');
        if (searchInput) {
          searchInput.addEventListener('input', function () {
            const keyword = this.value.toLowerCase();
            articlesList.innerHTML = '';
            const filtered = articles.filter(a =>
              a.title.toLowerCase().includes(keyword) ||
              (a.excerpt && a.excerpt.toLowerCase().includes(keyword)) ||
              (a.description && a.description.toLowerCase().includes(keyword))
            );
            if (filtered.length === 0) {
              articlesList.innerHTML = "<p>Tidak ditemukan artikel dengan kata tersebut.</p>";
            } else {
              filtered.forEach(article => {
                const imgSrc = article.image ? `static/assets/uploads/${article.image}` : 'static/assets/images/article-default.jpg';
                articlesList.innerHTML += `
                  <div class="article-card">
                    <img src="${imgSrc}" alt="${article.title}" onerror="this.src='static/assets/images/article-default.jpg'">
                    <h3>${article.title}</h3>
                    <p>${article.excerpt || ''}</p>
                  </div>
                `;
              });
            }
          });
        }
      })
      .catch(() => {
        articlesList.innerHTML = "<p>Gagal memuat artikel.</p>";
      });
  }
  if(document.getElementById('articles-list')) loadArticles();

  // ===== LOAD DOWNLOADS (download.html only) =====
  function loadDownloads() {
    const dlList = document.getElementById('downloads-list');
    if (!dlList) return;
    fetch('content/downloads/index-downloads.json')
      .then(res => res.json())
      .then(downloads => {
        if (!downloads || downloads.length === 0) {
          dlList.innerHTML = "<p>Belum ada file download tersedia.</p>";
          return;
        }
        dlList.innerHTML = '<ul>';
        downloads.forEach(file => {
          dlList.innerHTML += `
            <li>
              <a href="static/assets/uploads/${file.file}" download>
                <strong>${file.title}</strong>${file.category ? ' (' + file.category + ')' : ''}
              </a><br>
              <span>${file.description}</span>
            </li>
          `;
        });
        dlList.innerHTML += '</ul>';
      })
      .catch(() => {
        dlList.innerHTML = "<p>Gagal memuat file download.</p>";
      });
  }
  if(document.getElementById('downloads-list')) loadDownloads();

  // ===== CONTACT FORM HANDLER (all pages) =====
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert("Terima kasih, pesan Anda telah dikirim!");
      contactForm.reset();
    });
  }
});