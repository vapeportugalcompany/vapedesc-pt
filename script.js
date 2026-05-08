document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-list a');

    // Toggle Menu
    function toggleMenu() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    hamburger.addEventListener('click', toggleMenu);
    closeMenu.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu when clicking outside (on the overlay mostly if we had one, 
    // but here the menu is 100vh right aligned. 
    // Let's add click outside listener just in case user clicks the left empty area if the menu was not full width, 
    // but our CSS makes it a drawer. Let's assume clicking 'close' is enough or sliding.)
});

// Age verification modal
const ageModal = document.getElementById("ageModal");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

if (ageModal && yesBtn && noBtn) {
    window.addEventListener("load", () => {
        if (localStorage.getItem("ageConfirmed") != "true") {
            ageModal.style.display = "flex";
        } else {
            ageModal.style.display = "none";
        }
    });

    yesBtn.addEventListener("click", () => {
        localStorage.setItem("ageConfirmed", "true");
        ageModal.style.display = "none";
    });

    noBtn.addEventListener("click", () => {
        alert("Acesso recusado. Este site destina-se apenas a maiores de 18 anos.");
        window.close();
        window.location.href = "https://www.google.pt";
    });
}

// Hide the top warning when the page is scrolled
const warn = document.querySelector(".warn");
const header = document.querySelector(".header");
if (warn) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 10) {
            warn.style.display = "none";
            header.style.position = "fixed";
        } else {
            warn.style.display = "";
            header.style.position = "";
        }
    });
}

// JNR Slider Logic
document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.jnr-slider-track');
    const prevBtn = document.querySelector('.jnr-slider-btn.prev');
    const nextBtn = document.querySelector('.jnr-slider-btn.next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    const cards = document.querySelectorAll('.jnr-card');
    const totalCards = cards.length;
    function getVisibleItems() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 900) return 2;
        return 3;
    }

    function updateSlider() {
        const visibleItems = getVisibleItems();
        const cardWidth = cards[0].offsetWidth;
        const gap = 20; // 20px gap defined in CSS
        const moveAmount = (cardWidth + gap) * currentIndex;

        track.style.transform = `translateX(-${moveAmount}px)`;

        // Disable buttons at boundaries
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'all';

        const maxIndex = totalCards - visibleItems;
        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'all';
    }

    nextBtn.addEventListener('click', () => {
        const visibleItems = getVisibleItems();
        if (currentIndex < totalCards - visibleItems) {
            currentIndex++;
            updateSlider();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Update on resize
    window.addEventListener('resize', () => {
        updateSlider();
    });

    // Touch / Swipe Logic
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    track.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        // Minimum swipe distance threshold
        if (Math.abs(touchStartX - touchEndX) < 50) return;

        const visibleItems = getVisibleItems();

        if (touchStartX - touchEndX > 50) {
            // Swipe Left (Next)
            if (currentIndex < totalCards - visibleItems) {
                currentIndex++;
                updateSlider();
            }
        }

        if (touchEndX - touchStartX > 50) {
            // Swipe Right (Prev)
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        }
    }

    // Initialize
    updateSlider();
});


const city = document.getElementById("city");
const cont = document.querySelectorAll(".foot-cont-three a");
city.addEventListener("click", toggleCont);
function toggleCont() {
    city.classList.toggle("active");
    Array.from(cont).forEach((el) => {
        el.style.display = el.style.display === "block" ? "none" : "block";
    });
}

const yearSpan = document.querySelector('#year');
if (yearSpan) {
    yearSpan.innerText = new Date().getFullYear();
}

// Description Section "Show More" Logic
const descLoadMoreBtn = document.getElementById('descLoadMore');
if (descLoadMoreBtn) {
    descLoadMoreBtn.addEventListener('click', () => {
        const hiddenItems = document.querySelectorAll('.desc-item.desc-hidden');
        hiddenItems.forEach(item => {
            item.style.display = 'block';
            // Optional: minimal animation
            item.style.opacity = 0;
            setTimeout(() => {
                item.style.opacity = 1;
            }, 50);
        });
        descLoadMoreBtn.style.display = 'none';
    });
}