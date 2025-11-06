// js/main.js

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// OS Detection
function detectOS() {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const platform = window.navigator.platform.toLowerCase();

    if (userAgent.indexOf('win') > -1 || platform.indexOf('win') > -1) {
        return 'windows';
    } else if (userAgent.indexOf('mac') > -1 || platform.indexOf('mac') > -1) {
        return 'macos';
    } else if (userAgent.indexOf('linux') > -1 || platform.indexOf('linux') > -1) {
        return 'linux';
    }
    return 'windows'; // Default fallback
}

// Update download buttons based on OS
function updateDownloadButtons() {
    const detectedOS = detectOS();
    const osNames = {
        'windows': 'Windows',
        'macos': 'macOS',
        'linux': 'Linux'
    };

    // Update hero button text
    const heroDownloadBtn = document.getElementById('hero-download-btn');
    const detectedOsSpan = document.getElementById('detected-os');
    if (detectedOsSpan) {
        detectedOsSpan.textContent = osNames[detectedOS];
    }

    // Highlight recommended platform card
    const cards = {
        'windows': document.getElementById('windows-card'),
        'linux': document.getElementById('linux-card'),
        'macos': document.getElementById('macos-card')
    };

    const recommendedCard = cards[detectedOS];
    if (recommendedCard) {
        recommendedCard.classList.add('recommended');
    }

    // Update hero button to scroll to recommended download
    if (heroDownloadBtn) {
        heroDownloadBtn.addEventListener('click', (e) => {
            e.preventDefault();
            recommendedCard?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }
}

// Initialize animations
function initAnimations() {
    // Hero animations
    const heroTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } });

    heroTimeline
        .to('.hero-content', {
            opacity: 1,
            duration: 1,
            delay: 0.3
        })
        .from('.title-line', {
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2
        }, '-=0.5')
        .from('.hero-subtitle', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-slogan', {
            y: 30,
            opacity: 0,
            duration: 0.6
        }, '-=0.4')
        .from('.hero-feature', {
            x: -30,
            opacity: 0,
            duration: 0.5,
            stagger: 0.1
        }, '-=0.3')
        .from('.cta-buttons', {
            y: 20,
            opacity: 0,
            duration: 0.5,
        }, '-=0.3');

    // Hero visual animations
    gsap.to('.hero-visual', {
        opacity: 1,
        duration: 1,
        delay: 0.5
    });

    gsap.from('.pdf-card', {
        scale: 0.8,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.8,
        ease: 'back.out(1.7)'
    });

    // Floating animation for PDF cards
    gsap.to('.card-1', {
        y: -20,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });

    gsap.to('.card-2', {
        y: -15,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.3
    });

    gsap.to('.card-3', {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 0.6
    });

    // Feature cards animation
    gsap.utils.toArray('.feature-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.05,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Why choose cards animation
    gsap.utils.toArray('.why-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Tech stack animation
    gsap.utils.toArray('.tech-item').forEach((item, index) => {
        gsap.to(item, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: index * 0.1,
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Download cards animation
    gsap.utils.toArray('.download-card').forEach((card, index) => {
        gsap.to(card, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            delay: index * 0.15,
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            opacity: 0,
            y: 30,
            duration: 0.8,
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        const navbar = document.querySelector('.navbar');

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = 'none';
        }

        lastScroll = currentScroll;
    });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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

// Add hover effects to buttons
function initButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            gsap.to(this, {
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        button.addEventListener('mouseleave', function () {
            gsap.to(this, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// Parallax effect for hero background
function initParallax() {
    const heroBackground = document.querySelector('.hero-background');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;

        if (heroBackground) {
            heroBackground.style.transform = `translateY(${rate}px)`;
        }
    });
}

// Mobile menu functionality
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');
    let isMenuOpen = false;

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = isMenuOpen ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !navLinks.contains(e.target) && !menuBtn.contains(e.target)) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
                isMenuOpen = false;
            }
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateDownloadButtons();
    initAnimations();
    initSmoothScroll();
    initButtonEffects();
    initParallax();
    initMobileMenu();

    console.log('LocalPDF Studio Website initialized');
});

// Handle window resize
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 250);
});