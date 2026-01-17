const reviewsData = [
    {
        name: "Rajesh Sharma",
        role: "Plot Owner",
        rating: 5,
        text: "I bought a plot in Naigaon East through Dr. Munshilal Yadav developers. The process was completely transparent, and I got the documents verified easily. Highly recommended!"
    },
    {
        name: "Sunil Patil",
        role: "Flat Support",
        rating: 5,
        text: "Best builder in Vasai-Virar region. I purchased a 1BHK flat, and the construction quality is excellent. Delivered on time as promised."
    },
    {
        name: "Amit Verma",
        role: "Shop Owner",
        rating: 5,
        text: "Direct dealing with the owner made a huge difference. Saved brokerage and got a great deal on my shop. Honest people to work with."
    }
];

function renderReviews() {
    const reviewsContainer = document.getElementById('reviews-container');
    if (!reviewsContainer) return;

    // 1. Load static reviews
    let allReviews = [...reviewsData];

    // 2. Load local temporary reviews (Instant gratification for the user)
    const localReviews = JSON.parse(localStorage.getItem('my_reviews') || '[]');
    allReviews = [...localReviews, ...allReviews];

    reviewsContainer.innerHTML = allReviews.map(review => `
        <div class="card" style="padding: 2rem;">
            <div style="color: var(--accent-color); font-size: 1.5rem; margin-bottom: 1rem;">${'⭐'.repeat(review.rating)}</div>
            <p style="font-style: italic; margin-bottom: 1.5rem;">"${review.text}"</p>
            <h4 style="margin-bottom: 0;">- ${review.name}</h4>
            <span style="font-size: 0.9rem; color: #777;">${review.role || 'Client'}</span>
        </div>
    `).join('');
}

function handleReviewSubmit(e) {
    e.preventDefault();

    const name = document.getElementById('review-name').value;
    const rating = document.getElementById('review-rating').value;
    const text = document.getElementById('review-text').value;

    if (!name || !text) return;

    // 1. Create review object
    const newReview = {
        name: name,
        role: "Verified Customer",
        rating: parseInt(rating),
        text: text
    };

    // 2. Save to LocalStorage (So user sees it instantly)
    const localReviews = JSON.parse(localStorage.getItem('my_reviews') || '[]');
    localReviews.unshift(newReview);
    localStorage.setItem('my_reviews', JSON.stringify(localReviews));

    // 3. Re-render
    renderReviews();

    // 4. Send to WhatsApp for Owner Approval
    const phoneNumber = "919324185749"; // The new number
    const message = encodeURIComponent(`*New Website Review Submission*%0A%0A*Name:* ${name}%0A*Rating:* ${rating} Stars%0A*Review:* ${text}%0A%0A_Please copy this to your reviews data to publish it._`);

    // 5. Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

    // 6. Reset form and notify
    document.getElementById('review-form').reset();
    alert("Thank you! Your review has been added locally and saved. \n\nWe have also opened WhatsApp so you can send it to us for official verification and public listing.");
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderReviews();
    const form = document.getElementById('review-form');
    if (form) {
        // Remove old event listeners by cloning (simple trick) or just overwrite if using onclick (but we used addEventListener in main.js)
        // Since main.js runs first, we need to be careful. Ideally we remove the code from main.js
        form.addEventListener('submit', handleReviewSubmit);
    }
});
