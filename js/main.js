// js/main.js

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

// Animations removed - initAnimations function deleted

// Smooth scroll removed - initSmoothScroll function deleted

// Parallax effect removed - initParallax function deleted

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
    initMobileMenu();

    const video = document.getElementById('demoVideo');

    if (video) {
        video.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            video.controls = !video.controls;
        });

        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });
    }

    // AppImage Modal Logic
    const appimageDownloadBtn = document.getElementById('linux-appimage-download-btn');
    const appimageModal = document.getElementById('appimage-modal');
    const modalCloseButtons = appimageModal ? appimageModal.querySelectorAll('.modal-close-btn') : [];
    const copyCommandBtn = document.querySelector('#appimage-modal .copy-btn');
    const appimageCommandElement = document.getElementById('appimage-command');

    if (appimageDownloadBtn && appimageModal) {
        appimageDownloadBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default navigation/download

            // Trigger the download programmatically
            const downloadLink = this.href;
            const filename = downloadLink.substring(downloadLink.lastIndexOf('/') + 1);

            // Create a temporary anchor element to trigger download
            const tempLink = document.createElement('a');
            tempLink.href = downloadLink;
            tempLink.download = filename; // Suggest filename
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // Update the command in the modal with the correct filename
            if (appimageCommandElement && copyCommandBtn) {
                appimageCommandElement.textContent = `chmod +x ${filename}`;
                copyCommandBtn.dataset.command = `chmod +x ${filename}`;
            }

            // Show the modal
            appimageModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });

        modalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                appimageModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });

        // Close modal on overlay click
        appimageModal.addEventListener('click', (e) => {
            if (e.target === appimageModal) {
                appimageModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });


        if (copyCommandBtn) {
            copyCommandBtn.addEventListener('click', async () => {
                const commandToCopy = copyCommandBtn.dataset.command;
                try {
                    await navigator.clipboard.writeText(commandToCopy);
                    const originalText = copyCommandBtn.textContent;
                    copyCommandBtn.textContent = 'Copied!';
                    setTimeout(() => {
                        copyCommandBtn.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy command: ', err);
                    alert('Failed to copy command. Please copy it manually: ' + commandToCopy);
                }
            });
        }
    }

    // macOS Modal Logic
    const macosDownloadBtn = document.getElementById('macos-dmg-download-btn');
    const macosModal = document.getElementById('macos-modal');
    const macosModalCloseButtons = macosModal ? macosModal.querySelectorAll('.modal-close-btn') : [];

    if (macosDownloadBtn && macosModal) {
        macosDownloadBtn.addEventListener('click', function (e) {
            e.preventDefault(); // Prevent default navigation/download

            // Trigger the download programmatically
            const downloadLink = this.href;
            const filename = downloadLink.substring(downloadLink.lastIndexOf('/') + 1);

            const tempLink = document.createElement('a');
            tempLink.href = downloadLink;
            tempLink.download = filename;
            document.body.appendChild(tempLink);
            tempLink.click();
            document.body.removeChild(tempLink);

            // Show the modal
            macosModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
        });

        macosModalCloseButtons.forEach(button => {
            button.addEventListener('click', () => {
                macosModal.classList.remove('active');
                document.body.style.overflow = ''; // Restore scrolling
            });
        });
        macosModal.addEventListener('click', (e) => {
            if (e.target === macosModal) {
                macosModal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});