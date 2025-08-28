// Product Loader
async function loadProducts() {
    try {
        const response = await fetch('/data/products.json');
        const products = await response.json();
        
        const container = document.getElementById('products-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        products.forEach(product => {
            const productCard = `
                <div class="product-card">
                    ${product.featured ? '<div class="product-badge">Featured</div>' : ''}
                    <div class="product-image" style="background-image: url('${product.image}')">
                        <div class="product-overlay">
                            <div class="product-actions">
                                <div class="action-btn"><i class="fas fa-eye"></i></div>
                                <div class="action-btn"><i class="fas fa-heart"></i></div>
                                <div class="action-btn"><i class="fas fa-shopping-cart"></i></div>
                            </div>
                        </div>
                    </div>
                    <div class="product-info">
                        <h3>${product.title}</h3>
                        <p>${product.description}</p>
                        <div class="product-price">${product.price}</div>
                        <a href="#" class="add-to-cart contact-btn">Pesan Sekarang</a>
                    </div>
                </div>
            `;
            container.innerHTML += productCard;
        });
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

// Articles Loader
async function loadArticles() {
    try {
        const response = await fetch('/data/articles.json');
        const articles = await response.json();
        
        const container = document.getElementById('articles-container');
        if (!container) return;
        
        container.innerHTML = '';
        
        articles.forEach(article => {
            if (!article.published) return;
            
            const articleCard = `
                <article class="article-card">
                    <div class="article-image" style="background-image: url('${article.featured_image}')"></div>
                    <div class="article-content">
                        <div class="article-meta">
                            <span><i class="far fa-calendar"></i> ${new Date(article.date).toLocaleDateString('id-ID')}</span>
                            <span><i class="far fa-user"></i> ${article.author}</span>
                            <span><i class="far fa-folder"></i> ${article.category}</span>
                        </div>
                        <h3>${article.title}</h3>
                        <p>${article.excerpt}</p>
                        <a href="#" class="read-more">Baca Selengkapnya <i class="fas fa-arrow-right"></i></a>
                    </div>
                </article>
            `;
            container.innerHTML += articleCard;
        });
    } catch (error) {
        console.error('Error loading articles:', error);
    }
}

// Load data when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('products-container')) {
        loadProducts();
    }
    if (document.getElementById('articles-container')) {
        loadArticles();
    }
});