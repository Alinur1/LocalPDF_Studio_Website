// js/donate.js

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

class DonationManager {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;

        this.setupEventListeners();
        this.initAnimations();
        this.initialized = true;
        console.log('DonationManager initialized');
    }

    setupEventListeners() {
        this.setupDonationHandlers();
        this.setupSupportHandlers();
        this.setupQRModal();
    }

    setupDonationHandlers() {
        const bkashBtn = document.getElementById('show-bkash-qr');
        if (bkashBtn) {
            bkashBtn.addEventListener('click', () => this.showBkashQR());
        }

        const gumroadOneTimeBtn = document.getElementById('gumroad-donate-onetime');
        if (gumroadOneTimeBtn) {
            gumroadOneTimeBtn.addEventListener('click', () => this.openOnetimeGumroad());
        }

        const gumroadMonthlyBtn = document.getElementById('gumroad-donate-monthly');
        if (gumroadMonthlyBtn) {
            gumroadMonthlyBtn.addEventListener('click', () => this.openMonthlyGumroad());
        }

        const fundraisingBtn = document.getElementById('show-fundraising-sheet');
        if (fundraisingBtn) {
            fundraisingBtn.addEventListener('click', () => this.openExternal('https://docs.google.com/spreadsheets/d/1dZtq7XCQ-jI0-ib7mR5trBLqtb9JuRKXkMFP6O41z3E/edit?usp=sharing'));
        }
    }

    setupSupportHandlers() {
        const actions = {
            'alt-star': () => this.openExternal('https://github.com/Alinur1/LocalPDF_Studio'),
            'alt-share': () => this.shareApp(),
            'alt-report': () => this.openExternal('https://github.com/Alinur1/LocalPDF_Studio/issues'),
            'alt-suggest': () => this.openExternal('https://github.com/Alinur1/LocalPDF_Studio/issues/new?template=feature_request.md'),
            'show-fundraising-sheet': () => this.openExternal('https://docs.google.com/spreadsheets/d/1dZtq7XCQ-jI0-ib7mR5trBLqtb9JuRKXkMFP6O41z3E/edit?usp=sharing')
        };

        Object.entries(actions).forEach(([id, action]) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', action);
            }
        });
    }

    setupQRModal() {
        const qrModal = document.getElementById('bkash-qr-modal');
        if (!qrModal) return;

        const closeHandlers = [
            document.getElementById('qr-close'),
            document.getElementById('bkash-modal-close'),
            document.getElementById('bkash-modal-overlay')
        ];

        closeHandlers.forEach(handler => {
            if (handler) {
                handler.addEventListener('click', () => this.hideBkashQR());
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && qrModal && !qrModal.classList.contains('hidden')) {
                this.hideBkashQR();
            }
        });
    }

    showBkashQR() {
        const modal = document.getElementById('bkash-qr-modal');
        if (modal) {
            modal.classList.remove('hidden');
            gsap.fromTo('.modal-container',
                { scale: 0.8, opacity: 0 }, // from values
                {
                    scale: 1,
                    opacity: 1,
                    duration: 0.3,
                    ease: 'back.out(1.7)'
                } // to values
            );
        }
    }

    hideBkashQR() {
        const modal = document.getElementById('bkash-qr-modal');
        if (modal) {
            gsap.to('.modal-container', {
                scale: 0.8,
                opacity: 0,
                duration: 0.2,
                onComplete: () => {
                    modal.classList.add('hidden');
                }
            });
        }
    }

    openOnetimeGumroad() {
        this.openExternal('https://alinur3.gumroad.com/coffee');
    }

    openMonthlyGumroad() {
        this.openExternal('https://alinur3.gumroad.com/l/csbhxr');
    }

    async shareApp() {
        const shareText = 'Check out LocalPDF Studio - A complete offline PDF toolkit! Free, open source, and privacy-focused.';
        const shareUrl = 'https://github.com/Alinur1/LocalPDF_Studio';

        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'LocalPDF Studio',
                    text: shareText,
                    url: shareUrl
                });
                return;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.log('Share failed:', err);
                }
            }
        }

        await this.copyToClipboard(`${shareText}\n\n${shareUrl}`);
    }

    async copyToClipboard(text) {
        try {
            await navigator.clipboard.writeText(text);
            this.showNotification('✅ Link copied to clipboard!', 'success');
        } catch (err) {
            this.showNotification('ℹ️ Please copy manually:\n\n' + text, 'info');
        }
    }

    openExternal(url) {
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            z-index: 3000;
            font-weight: 600;
            max-width: 300px;
        `;

        document.body.appendChild(notification);

        gsap.from(notification, {
            x: 100,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.out'
        });

        setTimeout(() => {
            gsap.to(notification, {
                x: 100,
                opacity: 0,
                duration: 0.3,
                onComplete: () => notification.remove()
            });
        }, 3000);
    }

    initAnimations() {
        // Hero animation
        gsap.from('.heart-icon', {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            ease: 'back.out(1.7)',
            delay: 0.2
        });

        gsap.from('.donate-hero .hero-title', {
            y: 30,
            opacity: 0,
            duration: 0.8,
            delay: 0.4
        });

        gsap.from('.donate-hero .hero-subtitle', {
            y: 20,
            opacity: 0,
            duration: 0.6,
            delay: 0.6
        });

        // Reason cards animation
        gsap.utils.toArray('.reason-card').forEach((card, index) => {
            gsap.from(card, {
                y: 50,
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

        // Donation options animation
        gsap.utils.toArray('.donation-option').forEach((option, index) => {
            gsap.from(option, {
                scale: 0.9,
                opacity: 0,
                duration: 0.6,
                delay: index * 0.2,
                scrollTrigger: {
                    trigger: option,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Alternative support cards
        gsap.utils.toArray('.alt-support-card').forEach((card, index) => {
            gsap.from(card, {
                y: 40,
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

        // Thank you card animation
        gsap.from('.thank-you-card', {
            scale: 0.9,
            opacity: 0,
            duration: 0.8,
            scrollTrigger: {
                trigger: '.thank-you-card',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        });

        // Button hover effects
        this.initButtonEffects();
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.donate-btn, .alt-action-btn');

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
    new DonationManager();
});

window.DonationManager = DonationManager;