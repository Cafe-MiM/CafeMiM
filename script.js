// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the menu functionality
    initializeMenu();
    
    // Generate QR code
    generateQRCode();
    
    // Add smooth scrolling for better UX
    addSmoothScrolling();
});

// Initialize menu tab functionality
function initializeMenu() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuSections = document.querySelectorAll('.menu-section');
    
    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetCategory = this.getAttribute('data-category');
            
            // Remove active class from all buttons and sections
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            menuSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show target section
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Smooth scroll to the section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add hover effects for menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0) scale(1)';
        });
    });
}

// Generate QR code for the menu
function generateQRCode() {
    const qrContainer = document.getElementById('qrCode');
    
    if (qrContainer && typeof QRCode !== 'undefined') {
        // Get current page URL
        const currentURL = window.location.href;
        
        // Generate QR code
        QRCode.toCanvas(qrContainer, currentURL, {
            width: 70,
            height: 70,
            margin: 2,
            color: {
                dark: '#8b4513',
                light: '#f5f1e8'
            }
        }, function(error) {
            if (error) {
                console.error('Error generating QR code:', error);
                // Fallback: show text instead
                qrContainer.innerHTML = '<span style="font-size: 10px; color: #8b4513;">QR</span>';
            }
        });
    } else {
        // Fallback if QRCode library is not loaded
        qrContainer.innerHTML = '<span style="font-size: 12px; color: #8b4513;">QR</span>';
    }
}

// Add smooth scrolling functionality
function addSmoothScrolling() {
    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Add loading animation
function addLoadingAnimation() {
    const menuItems = document.querySelectorAll('.menu-item');
    
    menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add search functionality (optional enhancement)
function addSearchFunctionality() {
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchContainer.innerHTML = `
        <input type="text" id="searchInput" placeholder="جستجو در منو..." class="search-input">
        <i class="fas fa-search search-icon"></i>
    `;
    
    // Insert search before menu content
    const menuContent = document.querySelector('.menu-content');
    if (menuContent) {
        menuContent.parentNode.insertBefore(searchContainer, menuContent);
    }
    
    // Add search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const menuItems = document.querySelectorAll('.menu-item');
            
            menuItems.forEach(item => {
                const itemName = item.querySelector('h3').textContent.toLowerCase();
                const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
                
                if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
                    item.style.display = 'flex';
                    item.style.animation = 'fadeIn 0.3s ease-in-out';
                } else {
                    item.style.display = 'none';
                }
            });
            
            // Show/hide sections based on search results
            const sections = document.querySelectorAll('.menu-section');
            sections.forEach(section => {
                const visibleItems = section.querySelectorAll('.menu-item[style*="display: flex"]');
                if (visibleItems.length > 0 || searchTerm === '') {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    }
}

// Add keyboard navigation
function addKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const activeButton = document.querySelector('.category-btn.active');
        const buttons = Array.from(document.querySelectorAll('.category-btn'));
        const currentIndex = buttons.indexOf(activeButton);
        
        switch(e.key) {
            case 'ArrowRight':
                e.preventDefault();
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
                buttons[prevIndex].click();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                const nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
                buttons[nextIndex].click();
                break;
        }
    });
}

// Add touch gestures for mobile
function addTouchGestures() {
    let startX = 0;
    let endX = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
    });
    
    document.addEventListener('touchend', function(e) {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = startX - endX;
        
        if (Math.abs(diff) > swipeThreshold) {
            const activeButton = document.querySelector('.category-btn.active');
            const buttons = Array.from(document.querySelectorAll('.category-btn'));
            const currentIndex = buttons.indexOf(activeButton);
            
            if (diff > 0) {
                // Swipe left - next category
                const nextIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
                buttons[nextIndex].click();
            } else {
                // Swipe right - previous category
                const prevIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
                buttons[prevIndex].click();
            }
        }
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation after a short delay
    setTimeout(addLoadingAnimation, 500);
    
    // Add keyboard navigation
    addKeyboardNavigation();
    
    // Add touch gestures for mobile
    addTouchGestures();
    
    // Add search functionality (uncomment to enable)
    // addSearchFunctionality();
});

// Add CSS for search functionality (if enabled)
const searchStyles = `
.search-container {
    position: relative;
    margin-bottom: 20px;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
}

.search-input {
    width: 100%;
    padding: 15px 50px 15px 20px;
    border: 2px solid #8b4513;
    border-radius: 25px;
    font-family: 'Vazirmatn', sans-serif;
    font-size: 16px;
    background: rgba(255, 255, 255, 0.9);
    color: #8b4513;
    outline: none;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: #654321;
    box-shadow: 0 5px 15px rgba(139, 69, 19, 0.2);
    background: rgba(255, 255, 255, 1);
}

.search-input::placeholder {
    color: #8b4513;
    opacity: 0.7;
}

.search-icon {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    color: #8b4513;
    font-size: 18px;
}
`;

// Inject search styles if needed
if (typeof document !== 'undefined') {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = searchStyles;
    document.head.appendChild(styleSheet);
} 