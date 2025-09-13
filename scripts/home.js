// Slider
fetch('content/settings/home.json')
  .then(res => res.json())
  .then(data => {
    const slider = document.getElementById('hero-slider');
    const controls = document.getElementById('slider-controls');
    if (!slider || !data.hero_slider) return;
    let html = '';
    data.hero_slider.forEach((slide, i) => {
      html += `
      <div class="slide${i===0?' active':''}">
        <img src="static/assets/uploads/${slide.image}" alt="">
        <div class="caption">${slide.caption||''}</div>
      </div>`;
    });
    slider.innerHTML = html;
    // controls
    let ctrl = '';
    for(let i=0; i<data.hero_slider.length; i++) {
      ctrl += `<div class="slider-dot${i===0?' active':''}" data-index="${i}"></div>`;
    }
    controls.innerHTML = ctrl;

    // slider logic
    let current = 0;
    function showSlide(idx){
      let slides = slider.querySelectorAll('.slide');
      let dots = controls.querySelectorAll('.slider-dot');
      slides.forEach((s,i)=>s.classList.toggle('active',i===idx));
      dots.forEach((d,i)=>d.classList.toggle('active',i===idx));
      current = idx;
    }
    controls.querySelectorAll('.slider-dot').forEach((d,i)=>{
      d.onclick = ()=>showSlide(i);
    });
    setInterval(()=>showSlide((current+1)%data.hero_slider.length), 5000);
  });

// Produk Pilihan
fetch('content/products')
  .then(res => res.json())
  .then(list => {
    // filter featured & aktif, sort by 'order'
    let items = Object.values(list)
      .filter(p => p.featured && (p.active!==false))
      .sort((a,b)=>(a.order||0)-(b.order||0))
      .slice(0,6);

    let html = '';
    items.forEach(p => {
      html += `<div class="product-card">
        <img src="static/assets/uploads/${p.image}" alt="">
        <h3>${p.name}</h3>
        <p>${p.description||''}</p>
        <span>${p.price||''}</span>
        <a class="see-more" href="products.html#${p.slug||''}">Lihat Detail</a>
      </div>`;
    });
    document.getElementById('product-featured-list').innerHTML = html;
  });

// Portofolio
fetch('content/portfolio')
  .then(res => res.json())
  .then(list => {
    let items = Object.values(list).sort((a,b)=>(a.order||0)-(b.order||0)).slice(0,6);
    let html = '';
    items.forEach(p => {
      html += `<div class="portfolio-card">
        <img src="static/assets/uploads/${p.image}" alt="">
        <h3>${p.title}</h3>
        <p>${p.description||''}</p>
        <a class="see-more" href="portfolio.html#${p.slug||''}">Lihat Detail</a>
      </div>`;
    });
    document.getElementById('portfolio-list').innerHTML = html;
  });

// Kontak (site.json)
fetch('content/settings/site.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('contact-address').textContent = data.address;
    document.getElementById('contact-email').textContent = data.contact_email;
    let wa = document.getElementById('contact-wa');
    wa.textContent = data.whatsapp;
    wa.href = 'https://wa.me/' + data.whatsapp.replace(/\D/g,"");
    let map = document.getElementById('gmap-frame');
    if (data.maps_embed) map.src = data.maps_embed;
  });