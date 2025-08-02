// Modern Menu System with Enhanced Animations
class ModernMenu {
    constructor() {
        this.categoryButtons = document.querySelectorAll('.category-btn');
        this.menuSections = document.querySelectorAll('.menu-section');
        this.menuItems = document.querySelectorAll('.menu-item');
        this.currentCategory = 'coffee-based';
        this.isAnimating = false;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.addParallaxEffects();
        this.addIntersectionObserver();
        this.addMouseTracking();
        this.generateQRCode();
        this.addKeyboardNavigation();
        this.addTouchGestures();
        this.addLoadingAnimations();
    }
    
    setupEventListeners() {
        // Category button clicks with enhanced animations
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (this.isAnimating) return;
                
                const targetCategory = button.getAttribute('data-category');
                this.switchCategory(targetCategory, button);
            });
            
            // Enhanced hover effects
            button.addEventListener('mouseenter', () => {
                this.addRippleEffect(button, e);
            });
        });
        
        // Menu item interactions
        this.menuItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                this.animateMenuItem(item, 'enter');
            });
            
            item.addEventListener('mouseleave', () => {
                this.animateMenuItem(item, 'leave');
            });
            
            // Click effect
            item.addEventListener('click', () => {
                this.addClickEffect(item);
            });
        });
    }
    
    switchCategory(targetCategory, clickedButton) {
        this.isAnimating = true;
        
        // Remove active states with animation
        this.categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.style.transform = 'scale(0.95)';
        });
        
        this.menuSections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px) scale(0.95)';
            section.classList.remove('active');
        });
        
        // Add active state with animation
        setTimeout(() => {
            clickedButton.classList.add('active');
            clickedButton.style.transform = 'scale(1.05)';
            
            const targetSection = document.getElementById(targetCategory);
            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.opacity = '1';
                targetSection.style.transform = 'translateY(0) scale(1)';
                
                // Animate menu items sequentially
                const items = targetSection.querySelectorAll('.menu-item');
                items.forEach((item, index) => {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px)';
                    
                    setTimeout(() => {
                        item.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
            }
            
            // Smooth scroll to section
            setTimeout(() => {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                this.isAnimating = false;
            }, 300);
        }, 200);
    }
    
    animateMenuItem(item, action) {
        const price = item.querySelector('.item-price');
        const title = item.querySelector('h3');
        
        if (action === 'enter') {
            item.style.transform = 'translateX(-15px) scale(1.03)';
            price.style.transform = 'scale(1.15) rotate(3deg)';
            title.style.transform = 'translateX(8px)';
        } else {
            item.style.transform = 'translateX(0) scale(1)';
            price.style.transform = 'scale(1) rotate(0deg)';
            title.style.transform = 'translateX(0)';
        }
    }
    
    addRippleEffect(button, event) {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    addClickEffect(item) {
        item.style.transform = 'scale(0.98)';
        setTimeout(() => {
            item.style.transform = 'scale(1)';
        }, 150);
    }
    
    addParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.header, .section-header');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    addIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);
        
        this.menuItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            observer.observe(item);
        });
    }
    
    addMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX / window.innerWidth;
            const mouseY = e.clientY / window.innerHeight;
            
            // Subtle background movement
            document.body.style.setProperty('--mouse-x', mouseX);
            document.body.style.setProperty('--mouse-y', mouseY);
            
            // Floating elements follow mouse
            const floatingElements = document.querySelectorAll('.container::before, .container::after');
            floatingElements.forEach(element => {
                const x = (mouseX - 0.5) * 20;
                const y = (mouseY - 0.5) * 20;
                element.style.transform = `translate(${x}px, ${y}px)`;
            });
        });
    }
    
    generateQRCode() {
        const qrContainer = document.getElementById('qrCode');
        
        if (qrContainer && typeof QRCode !== 'undefined') {
            const currentURL = window.location.href;
            
            QRCode.toCanvas(qrContainer, currentURL, {
                width: 80,
                height: 80,
                margin: 3,
                color: {
                    dark: '#8b4513',
                    light: 'rgba(245, 241, 232, 0.1)'
                }
            }, (error) => {
                if (error) {
                    console.error('QR Code generation error:', error);
                    qrContainer.innerHTML = '<span style="font-size: 12px; color: #8b4513;">QR</span>';
                }
            });
        }
    }
    
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            const activeButton = document.querySelector('.category-btn.active');
            const buttons = Array.from(this.categoryButtons);
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
                case 'Enter':
                    e.preventDefault();
                    if (activeButton) {
                        activeButton.click();
                    }
                    break;
            }
        });
    }
    
    addTouchGestures() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;
        
        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            this.handleSwipe(startX, startY, endX, endY);
        });
    }
    
    handleSwipe(startX, startY, endX, endY) {
        const swipeThreshold = 50;
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > swipeThreshold) {
            const activeButton = document.querySelector('.category-btn.active');
            const buttons = Array.from(this.categoryButtons);
            const currentIndex = buttons.indexOf(activeButton);
            
            if (diffX > 0) {
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
    
    addLoadingAnimations() {
        // Initial page load animation
        const header = document.querySelector('.header');
        const nav = document.querySelector('.menu-nav');
        const content = document.querySelector('.menu-content');
        
        if (header) {
            header.style.opacity = '0';
            header.style.transform = 'translateY(-30px)';
            setTimeout(() => {
                header.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                header.style.opacity = '1';
                header.style.transform = 'translateY(0)';
            }, 100);
        }
        
        if (nav) {
            nav.style.opacity = '0';
            nav.style.transform = 'translateY(20px)';
            setTimeout(() => {
                nav.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                nav.style.opacity = '1';
                nav.style.transform = 'translateY(0)';
            }, 300);
        }
        
        if (content) {
            content.style.opacity = '0';
            setTimeout(() => {
                content.style.transition = 'all 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                content.style.opacity = '1';
            }, 500);
        }
    }
}

// Enhanced Search Functionality
class AdvancedSearch {
    constructor() {
        this.searchContainer = null;
        this.searchInput = null;
        this.searchResults = [];
        this.isSearchActive = false;
        
        this.init();
    }
    
    init() {
        this.createSearchInterface();
        this.setupSearchLogic();
    }
    
    createSearchInterface() {
        this.searchContainer = document.createElement('div');
        this.searchContainer.className = 'search-container';
        this.searchContainer.innerHTML = `
            <div class="search-wrapper">
                <input type="text" id="searchInput" placeholder="جستجو در منو..." class="search-input">
                <i class="fas fa-search search-icon"></i>
                <div class="search-suggestions" id="searchSuggestions"></div>
            </div>
        `;
        
        const menuContent = document.querySelector('.menu-content');
        if (menuContent) {
            menuContent.parentNode.insertBefore(this.searchContainer, menuContent);
        }
        
        this.searchInput = document.getElementById('searchInput');
    }
    
    setupSearchLogic() {
        if (!this.searchInput) return;
        
        let searchTimeout;
        
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            const searchTerm = e.target.value.trim();
            
            searchTimeout = setTimeout(() => {
                this.performSearch(searchTerm);
            }, 300);
        });
        
        this.searchInput.addEventListener('focus', () => {
            this.showSuggestions();
        });
        
        this.searchInput.addEventListener('blur', () => {
            setTimeout(() => {
                this.hideSuggestions();
            }, 200);
        });
    }
    
    performSearch(searchTerm) {
        if (searchTerm.length < 2) {
            this.showAllItems();
            return;
        }
        
        const menuItems = document.querySelectorAll('.menu-item');
        const sections = document.querySelectorAll('.menu-section');
        let hasResults = false;
        
        menuItems.forEach(item => {
            const itemName = item.querySelector('h3').textContent.toLowerCase();
            const itemDescription = item.querySelector('.item-description').textContent.toLowerCase();
            const matches = itemName.includes(searchTerm.toLowerCase()) || 
                           itemDescription.includes(searchTerm.toLowerCase());
            
            if (matches) {
                item.style.display = 'flex';
                item.style.animation = 'searchResult 0.4s ease-out';
                hasResults = true;
            } else {
                item.style.display = 'none';
            }
        });
        
        // Show/hide sections based on results
        sections.forEach(section => {
            const visibleItems = section.querySelectorAll('.menu-item[style*="display: flex"]');
            if (visibleItems.length > 0) {
                section.style.display = 'block';
                section.style.animation = 'sectionShow 0.4s ease-out';
            } else {
                section.style.display = 'none';
            }
        });
        
        this.updateSearchUI(hasResults);
    }
    
    showAllItems() {
        const menuItems = document.querySelectorAll('.menu-item');
        const sections = document.querySelectorAll('.menu-section');
        
        menuItems.forEach(item => {
            item.style.display = 'flex';
            item.style.animation = '';
        });
        
        sections.forEach(section => {
            section.style.display = 'block';
            section.style.animation = '';
        });
        
        this.updateSearchUI(true);
    }
    
    updateSearchUI(hasResults) {
        const searchInput = this.searchInput;
        if (hasResults) {
            searchInput.style.borderColor = '#4facfe';
            searchInput.style.boxShadow = '0 0 0 3px rgba(79, 172, 254, 0.1)';
        } else {
            searchInput.style.borderColor = '#f5576c';
            searchInput.style.boxShadow = '0 0 0 3px rgba(245, 87, 108, 0.1)';
        }
    }
    
    showSuggestions() {
        // Implementation for search suggestions
    }
    
    hideSuggestions() {
        // Implementation for hiding suggestions
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize modern menu
    const modernMenu = new ModernMenu();
    
    // Initialize advanced search (uncomment to enable)
    // const advancedSearch = new AdvancedSearch();
    
    // Add CSS animations
    addCustomAnimations();
});

// Add custom CSS animations
function addCustomAnimations() {
    const animations = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes searchResult {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes sectionShow {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .search-container {
            position: relative;
            margin-bottom: 30px;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
        }
        
        .search-wrapper {
            position: relative;
        }
        
        .search-input {
            width: 100%;
            padding: 18px 60px 18px 25px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 30px;
            font-family: 'Vazirmatn', sans-serif;
            font-size: 16px;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            color: white;
            outline: none;
            transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .search-input:focus {
            border-color: rgba(255, 255, 255, 0.5);
            box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.15);
        }
        
        .search-input::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }
        
        .search-icon {
            position: absolute;
            right: 25px;
            top: 50%;
            transform: translateY(-50%);
            color: rgba(255, 255, 255, 0.8);
            font-size: 18px;
            pointer-events: none;
        }
        
        .search-suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 15px;
            margin-top: 10px;
            max-height: 200px;
            overflow-y: auto;
            display: none;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = animations;
    document.head.appendChild(styleSheet);
} 