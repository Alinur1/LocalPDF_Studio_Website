// js/privacy_policy.js

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class PrivacyPolicyManager {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;

        this.setupEventListeners();
        this.initAnimations();
        this.initialized = true;
        console.log('PrivacyPolicyManager initialized');
    }

    setupEventListeners() {
        // Setup button interactions
        const buttons = document.querySelectorAll('.transparency-btn, .contact-btn');

        buttons.forEach(button => {
            if (button.tagName === 'A') {
                // Links are handled by default behavior
                return;
            }

            button.addEventListener('click', (e) => {
                const href = button.getAttribute('href');
                if (href) {
                    window.open(href, '_blank', 'noopener,noreferrer');
                }
            });
        });
    }

    initAnimations() {
        // Hero animation
        gsap.from('.shield-icon', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 0.2
        });

        gsap.from('.privacy-hero .hero-title', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4
        });

        gsap.from('.privacy-hero .hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.6
        });

        // Commitment message animation
        gsap.from('.commitment-message', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.commitment-message',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Privacy cards animation
        gsap.utils.toArray('.privacy-card').forEach((card, index) => {
            gsap.from(card, {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.1,
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Transparency card animation
        gsap.from('.transparency-card', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.transparency-card',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Contact card animation
        gsap.from('.contact-card', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.contact-card',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Button hover effects
        this.initButtonEffects();
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.transparency-btn, .contact-btn');

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
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PrivacyPolicyManager();
});

window.PrivacyPolicyManager = PrivacyPolicyManager;
