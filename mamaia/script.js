// Initialize fullPage.js
new fullpage('#fullpage', {
    licenseKey: null,
    autoScrolling: true,
    scrollHorizontally: false,
    navigation: true,
    navigationPosition: 'right',
    showActiveTooltip: true,
    scrollingSpeed: 700,
    fitToSection: true,
    easing: 'easeInOutCubic',
    easingcss3: 'ease',
    loopBottom: false,
    loopTop: false,
    css3: true,
    scrollOverflow: false,
    touchSensitivity: 15,
    normalScrollElementTouchThreshold: 5,
    bigSectionsDestination: null,
    anchors: ['home', 'intro', 'beach', 'celebration', 'terrace', 'mountain', 'restaurant', 'portrait', 'memories', 'footer'],
    navigationTooltips: ['Acasă', 'Introducere', 'La Mare', 'Sărbătoare', 'Pe Terasă', 'La Munte', 'La Restaurant', 'Portret', 'Amintiri', 'Final'],
    
    // Callback fired after sections load
    afterLoad: function(origin, destination, direction) {
        // Add entrance animations for each section
        const section = destination.item;
        const content = section.querySelector('div[class$="-content"]');
        if (content) {
            content.style.opacity = '0';
            content.style.transform = 'translateY(20px)';
            requestAnimationFrame(() => {
                content.style.transition = 'all 0.7s ease-out';
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            });
        }
    },

    // Callback fired just after the section is loaded
    afterRender: function() {
        // Show initial content with animation
        const firstSection = document.querySelector('.section.active');
        if (firstSection) {
            const content = firstSection.querySelector('div[class$="-content"]');
            if (content) {
                content.style.opacity = '1';
                content.style.transform = 'translateY(0)';
            }
        }
    }
});

// Quote carousel functionality
let currentQuote = 0;
const quotes = document.querySelectorAll('.quote-slide');

function showQuote(n) {
    quotes.forEach(quote => {
        quote.style.opacity = '0';
        quote.style.display = 'none';
    });
    
    currentQuote = (n + quotes.length) % quotes.length;
    quotes[currentQuote].style.display = 'block';
    
    requestAnimationFrame(() => {
        quotes[currentQuote].style.transition = 'opacity 0.5s ease-in';
        quotes[currentQuote].style.opacity = '1';
    });
}

function nextQuote() {
    showQuote(currentQuote + 1);
}

function prevQuote() {
    showQuote(currentQuote - 1);
}

// Lightbox functionality with keyboard support
function openLightbox(photoCard) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const img = photoCard.querySelector('img');
    const caption = photoCard.querySelector('.photo-caption').textContent;

    if (img) {
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption;
        lightbox.style.display = 'block';
        
        requestAnimationFrame(() => {
            lightbox.style.opacity = '1';
        });

        // Disable fullpage scroll
        fullpage_api.setAllowScrolling(false);
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.style.opacity = '0';
    setTimeout(() => {
        lightbox.style.display = 'none';
        // Re-enable fullpage scroll
        fullpage_api.setAllowScrolling(true);
    }, 300);
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-content');
        if (hero) {
            hero.style.transform = `translate3d(0, ${scrolled * 0.4}px, 0)`;
        }
    });
    
    // Create floating hearts animation
    function createHeart() {
        const hero = document.querySelector('.hearts-bg');
        if (hero) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            hero.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }
    }
    
    // Create hearts periodically
    setInterval(createHeart, 3000);

    // Prevent scroll propagation on story text
    document.querySelectorAll('.story-text').forEach(element => {
        element.addEventListener('wheel', e => {
            e.stopPropagation();
        });
    });
}); 