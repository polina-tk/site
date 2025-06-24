       document.addEventListener('DOMContentLoaded', function() {
            const searchInput = document.getElementById('search');
            const sortButtons = document.querySelectorAll('.sort-btn');
            const productsContainer = document.getElementById('products-container');
            const products = Array.from(document.querySelectorAll('.product-card'));

            function filterProducts(searchTerm) {
                products.forEach(product => {
                    const productName = product.getAttribute('data-name').toLowerCase();
                    const productDescription = product.querySelector('.product-description').textContent.toLowerCase();
                    
                    if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                        product.style.display = 'block';
                    } else {
                        product.style.display = 'none';
                    }
                });
            }

            function sortProducts(sortType) {
                const sortedProducts = [...products].sort((a, b) => {
                    const priceA = parseInt(a.getAttribute('data-price'));
                    const priceB = parseInt(b.getAttribute('data-price'));
                    
                    if (sortType === 'price-asc') {
                        return priceA - priceB;
                    } else if (sortType === 'price-desc') {
                        return priceB - priceA;
                    }
                    return 0;
                });
                
                productsContainer.innerHTML = '';

                sortedProducts.forEach(product => {
                    productsContainer.appendChild(product);
                });
            }
            
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase().trim();
                filterProducts(searchTerm);
            });

            sortButtons.forEach(button => {
                button.addEventListener('click', function() {
                    const sortType = this.getAttribute('data-sort');
                    sortProducts(sortType);

                    sortButtons.forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                });
            });
        });