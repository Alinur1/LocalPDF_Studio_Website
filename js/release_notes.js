document.addEventListener('DOMContentLoaded', () => {
    const releaseItems = document.querySelectorAll('.release-item');

    gsap.set('.release-content', { height: 0, overflow: 'hidden' });

    releaseItems.forEach(item => {
        const header = item.querySelector('.release-header');
        const content = item.querySelector('.release-content');
        const toggle = item.querySelector('.version-toggle');

        header.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');

            if (isOpen) {
                gsap.to(content, { 
                    height: 0, 
                    duration: 0.5, 
                    ease: 'power2.inOut' 
                });
                item.classList.remove('open');
            } else {
                gsap.to(content, { 
                    height: 'auto', 
                    duration: 0.5, 
                    ease: 'power2.inOut' 
                });
                item.classList.add('open');
            }
        });
    });
});
