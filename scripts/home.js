// ========== SLIDER ==========
fetch('content/settings/home.json')
  .then(res => res.json())
  .then(home => {
    const slides = home.hero_slider || [];
    const slider = document.getElementById('hero-slider');
    const controls = document.getElementById('slider-controls');
    if (!slider || slides.length === 0) return;
    slider.innerHTML = slides.map((s, i) => `
      <div class="slide${i === 0 ? ' active' : ''}">
        <img src="static/assets/uploads/${s.image}" alt="${s.caption || ''}">
        <div class="caption">${s.caption || ''}</div>
      </div>
    `).join('');
    controls.innerHTML = slides.map((s, i) =>
      `<div class="slider-dot${i === 0 ? ' active' : ''}" data-idx="${i}"></div>`
    ).join('');
    let idx = 0, timer;
    function go(n) {
      idx = n;
      const allSlides = slider.querySelectorAll('.slide');
      const dots = controls.querySelectorAll('.slider-dot');
      allSlides.forEach((el, i) => el.classList.toggle('active', i === idx));
      dots.forEach((el, i) => el.classList.toggle('active', i === idx));
    }
    function next() {
      idx = (idx + 1) % slides.length;
      go(idx);
    }
    controls.onclick = e => {
      if (e.target.classList.contains('slider-dot')) {
        go(Number(e.target.dataset.idx));
        resetTimer();
      }
    };
    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(next, 3600);
    }
    resetTimer();
  });

// ========== PRODUK PILIHAN ==========
fetch('content/products/index-products.json')
  .then(res => res.json())
  .then(products => {
    const featured = products.filter(p => p.featured).slice(0,6);
    const grid = document.getElementById('product-featured-list');
    if (!grid) return;
    grid.innerHTML = '';
    featured.forEach(product => {
      grid.innerHTML += `
        <div class="product-card">
          <img src="static/assets/uploads/${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <a class="see-more" href="products.html#${encodeURIComponent(product.name)}"><i class="fas fa-search"></i> Detail</a>
        </div>
      `;
    });
  });

// ========== PORTFOLIO ==========
fetch('content/portfolio/index-portfolio.json')
  .then(res => res.json())
  .then(portos => {
    const grid = document.getElementById('portfolio-list');
    if (!grid) return;
    grid.innerHTML = '';
    portos.slice(0,6).forEach(item => {
      grid.innerHTML += `
        <div class="portfolio-card">
          <img src="static/assets/uploads/${item.image}" alt="${item.title}">
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a class="see-more" href="portfolio.html#${encodeURIComponent(item.title)}"><i class="fas fa-search"></i> Detail</a>
        </div>
      `;
    });
  });

// ========== KONTAK & FOOTER DATA ==========
fetch('content/settings/site.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('title-site').textContent = data.site_name || 'B13 Factory';
    document.getElementById('logo-img').src = data.logo ? `static/assets/images/${data.logo}` : 'static/assets/uploads/logo.png';
    document.getElementById('logo-img').alt = data.site_name || 'Logo';
    document.getElementById('logo-text').textContent = data.site_name || 'B13 Factory';
    document.getElementById('footer-site-name').textContent = data.site_name || 'B13 Factory';
    document.getElementById('contact-address').textContent = data.address || '';
    document.getElementById('contact-email').textContent = data.contact_email || '';
    document.getElementById('contact-phone').textContent = data.phone || '';
    document.getElementById('contact-wa').textContent = data.whatsapp || '';
    // Footer social
    const ig = document.querySelector('.site-instagram');
    if (ig && data.instagram) ig.href = "https://instagram.com/" + data.instagram;
    const fb = document.querySelector('.site-facebook');
    if (fb && data.facebook) fb.href = "https://facebook.com/" + data.facebook;
    const email = document.querySelector('.site-email');
    if (email && data.contact_email) email.href = "mailto:" + data.contact_email;
    const wa = document.querySelector('.site-wa');
    if (wa && data.whatsapp) wa.href = "https://wa.me/" + data.whatsapp.replace(/\D/g, "");
  });