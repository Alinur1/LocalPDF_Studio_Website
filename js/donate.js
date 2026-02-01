// js/donate.js

class DonationManager {
    constructor() {
        this.initialized = false;
        this.init();
    }

    init() {
        if (this.initialized) return;

        this.setupEventListeners();
        this.initialized = true;
        // console.log('DonationManager initialized');
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
        }
    }

    hideBkashQR() {
        const modal = document.getElementById('bkash-qr-modal');
        if (modal) {
            modal.classList.add('hidden');
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
        animation: slideIn 0.3s ease-out;
    `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    initButtonEffects() {
        const buttons = document.querySelectorAll('.donate-btn, .alt-action-btn');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
            });

            button.addEventListener('mouseleave', function () {
            });
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new DonationManager();
});

window.DonationManager = DonationManager;