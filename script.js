// ========================
// NAVIGATION FUNCTIONALITY
// ========================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// ========================
// SMOOTH SCROLL & ACTIVE LINK
// ========================

window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================
// MOVIE CARD INTERACTIONS
// ========================

const movieCards = document.querySelectorAll('.movie-card');

movieCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.animation = 'fadeIn 0.3s ease';
    });

    const playBtn = card.querySelector('.btn-play');
    if (playBtn) {
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const movieTitle = card.querySelector('.movie-info h3').textContent;
            showNotification(`Now playing: ${movieTitle}`);
        });
    }
});

// ========================
// CONTACT FORM HANDLING
// ========================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = contactForm.querySelector('input[placeholder="Your Name"]').value;
        const email = contactForm.querySelector('input[placeholder="Your Email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        if (name && email && message) {
            showNotification(`Thank you ${name}! Your message has been sent successfully.`);
            contactForm.reset();
        } else {
            showNotification('Please fill in all fields', 'error');
        }
    });
}

// ========================
// NEWSLETTER FORM
// ========================

const newsletterForm = document.querySelector('.newsletter');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = newsletterForm.querySelector('input[type="email"]').value;
        
        if (email) {
            showNotification('Successfully subscribed to our newsletter!');
            newsletterForm.reset();
        } else {
            showNotification('Please enter a valid email', 'error');
        }
    });
}

// ========================
// NOTIFICATION SYSTEM
// ========================

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.5s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideInLeft 0.5s ease reverse';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ========================
// SCROLL ANIMATIONS
// ========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe movie cards
movieCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// Observe trending cards
const trendingCards = document.querySelectorAll('.trending-card');
trendingCards.forEach(card => {
    card.style.opacity = '0';
    observer.observe(card);
});

// ========================
// BUTTON HOVER EFFECTS
// ========================

const buttons = document.querySelectorAll('.btn-primary, .btn-watch');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ========================
// RESPONSIVE HAMBURGER ANIMATION
// ========================

const hamburgerSpans = document.querySelectorAll('.hamburger span');

hamburger.addEventListener('click', () => {
    hamburgerSpans[0].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(45deg) translate(10px, 10px)' 
        : 'rotate(0) translate(0, 0)';
    
    hamburgerSpans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    
    hamburgerSpans[2].style.transform = navMenu.classList.contains('active') 
        ? 'rotate(-45deg) translate(7px, -7px)' 
        : 'rotate(0) translate(0, 0)';
});

// ========================
// BACK TO TOP BUTTON
// ========================

function createBackToTopButton() {
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.id = 'backToTop';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #D4AF37, #FF6B35);
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 999;
        display: none;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    backToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px)';
    });
    
    backToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
}

// Initialize back to top button
createBackToTopButton();

// ========================
// LAZY LOADING IMAGES
// ========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => imageObserver.observe(img));
}

// ========================
// SEARCH FUNCTIONALITY
// ========================

function searchMovies(query) {
    const movies = document.querySelectorAll('.movie-card');
    let found = 0;

    movies.forEach(movie => {
        const title = movie.querySelector('.movie-info h3').textContent.toLowerCase();
        if (title.includes(query.toLowerCase())) {
            movie.style.display = 'block';
            found++;
        } else {
            movie.style.display = 'none';
        }
    });

    if (found === 0) {
        showNotification('No movies found matching your search', 'error');
    }
}

// ========================
// KEYBOARD SHORTCUTS
// ========================

document.addEventListener('keydown', (e) => {
    // 'Home' key to go back to top
    if (e.key === 'Home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 'Escape' key to close mobile menu
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ========================
// PERFORMANCE OPTIMIZATION
// ========================

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ========================
// DARK MODE TOGGLE (Optional)
// ========================

function initDarkModeToggle() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    darkModeToggle.id = 'darkModeToggle';
    darkModeToggle.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #333;
        border: 2px solid #D4AF37;
        color: #D4AF37;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 999;
        transition: all 0.3s ease;
        display: none;
    `;
    
    // Uncomment to enable dark mode toggle
    // document.body.appendChild(darkModeToggle);
}

// ========================
// PAGE LOAD ANIMATIONS
// ========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Add animation to hero on load
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.animation = 'fadeInUp 1s ease';
    }
});

// ========================
// CONSOLE WELCOME MESSAGE
// ========================

console.log('%c Welcome to AFRICANASTREAMS! ', 'background: #D4AF37; color: #0f0f0f; font-size: 14px; font-weight: bold; padding: 10px;');
console.log('%c Your gateway to African cinema ', 'background: #FF6B35; color: white; font-size: 12px; padding: 5px;');

// ========================
// UTILITY FUNCTIONS
// ========================

// Get current scroll position
function getScrollPosition() {
    return {
        x: window.scrollX,
        y: window.scrollY
    };
}

// Smooth scroll to element
function scrollToElement(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ========================
// INITIALIZATION
// ========================

document.addEventListener('DOMContentLoaded', () => {
    console.log('AFRICANASTREAMS initialized successfully');
    
    // Add initial animations
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================
// EXPORT FUNCTIONS FOR EXTERNAL USE
// ========================

window.africanastreams = {
    showNotification,
    searchMovies,
    scrollToElement,
    isInViewport,
    getScrollPosition
};