document.addEventListener('DOMContentLoaded', function() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            const thumbnailImage = this.style.backgroundImage;
            
            mainImage.style.backgroundImage = thumbnailImage;

            thumbnails.forEach(thumb => {
                thumb.classList.remove('active');
            });

            this.classList.add('active');
        });
    });
    const reviewsList = document.querySelector('.reviews-list');
    
    loadReviews();

    document.getElementById('reviewForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('reviewName').value.trim();
        const rating = document.getElementById('reviewRating').value;
        const text = document.getElementById('reviewText').value.trim();
        
        if (name && text) {
            addReview(name, rating, text);
            this.reset();
        } else {
            alert('Пожалуйста, заполните все обязательные поля');
        }
    });
    
    function addReview(name, rating, text) {
        const review = {
            name,
            rating,
            text,
            date: new Date().toLocaleDateString('ru-RU')
        };
        
        let reviews = JSON.parse(localStorage.getItem('pizzaReviews')) || [];
        reviews.push(review);
        localStorage.setItem('pizzaReviews', JSON.stringify(reviews));
        loadReviews();
    }
    
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem('pizzaReviews')) || [];
        const staticReviews = Array.from(document.querySelectorAll('.review')).filter(review => {
            return !review.classList.contains('user-review');
        });
        
        reviewsList.innerHTML = '';
        
        staticReviews.forEach(review => {
            reviewsList.appendChild(review);
        });
        
        reviews.forEach(review => {
            const reviewElement = document.createElement('div');
            reviewElement.className = 'review user-review';
            
            let stars = '';
            for (let i = 0; i < 5; i++) {
                stars += i < review.rating ? '★' : '☆';
            }
            
            reviewElement.innerHTML = `
                <div class="review-header">
                    <div class="review-author">${review.name}</div>
                    <div class="review-date">${review.date}</div>
                </div>
                <div class="review-rating">${stars}</div>
                <div class="review-text">${review.text}</div>
            `;
            
            reviewsList.appendChild(reviewElement);
        });
    }
});