/* ============================================================
   MAIN.JS  —  Denis Muthui Portfolio
   Handles: nav toggle, slideshow, back-to-top, filter
   ============================================================ */

/* ── NAV TOGGLE ─────────────────────────────────────────────
   Toggles the fullscreen overlay + animates the hamburger    */
function myFunction() {
    const nav    = document.getElementById("myTopnav");
    const burger = document.getElementById("hamburger");
    if (nav)    nav.classList.toggle("responsive");
    if (burger) burger.classList.toggle("open");
}

// Close nav when a link is clicked (good UX on mobile)
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("#myTopnav a");
    links.forEach(function (link) {
        link.addEventListener("click", function () {
            const nav    = document.getElementById("myTopnav");
            const burger = document.getElementById("hamburger");
            if (nav && nav.classList.contains("responsive")) {
                nav.classList.remove("responsive");
                if (burger) burger.classList.remove("open");
            }
        });
    });
});

/* ── SLIDESHOW ───────────────────────────────────────────────
   Guarded — only runs when a slideshow actually exists        */
(function () {
    const slides = document.getElementsByClassName("mySlides");
    if (!slides.length) return; // no slideshow on this page — bail

    let slideIndex = 1;
    let slideTimer = null;

    // expose to inline onclick attributes
    window.plusSlides    = function (n) { showSlides(slideIndex += n); };
    window.currentSlide  = function (n) { showSlides(slideIndex = n);  };

    showSlides(slideIndex);

    function showSlides(n) {
        const dots        = document.getElementsByClassName("demo");
        const captionText = document.getElementById("caption");

        if (n > slides.length) slideIndex = 1;
        if (n < 1)             slideIndex = slides.length;

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
        if (captionText) captionText.innerHTML = dots[slideIndex - 1].alt;

        clearTimeout(slideTimer);
        slideTimer = setTimeout(() => showSlides(slideIndex + 1), 5000);
    }
})();

/* ── BACK TO TOP ─────────────────────────────────────────────
   Fallback — inline scripts on each page also handle this    */
document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("backToTop");
    if (!btn) return;
    /* Make sure href="#home" scrolls smoothly — CSS scroll-behavior
       handles it, but also ensure the element exists             */
    btn.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});

/* ── PROJECT FILTER ──────────────────────────────────────────
   Matches data-category on .proj-card against data-filter    */
document.addEventListener("DOMContentLoaded", function () {
    const filterBtns = document.querySelectorAll(".filter-btn");
    const grid       = document.getElementById("projectGrid");
    const emptyState = document.getElementById("projEmpty");

    if (!filterBtns.length || !grid) return; // not on portfolio page

    const cards = grid.querySelectorAll(".proj-card");

    filterBtns.forEach(function (btn) {
        btn.addEventListener("click", function () {

            filterBtns.forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");

            const filter = btn.dataset.filter;
            let visibleCount = 0;

            cards.forEach(function (card, idx) {
                const cat   = card.dataset.category; // ✅ fixed: was data-cat
                const match = filter === "all" || cat === filter;

                card.style.transitionDelay = match ? (idx * 50) + "ms" : "0ms";

                if (match) {
                    card.classList.remove("proj-card--hidden");
                    card.classList.add("proj-card--shown");
                    visibleCount++;
                } else {
                    card.classList.add("proj-card--hidden");
                    card.classList.remove("proj-card--shown");
                }
            });

            if (emptyState) {
                emptyState.style.display = visibleCount === 0 ? "flex" : "none";
            }
        });
    });

    // Trigger "All" on load so cards are visible by default
    const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
    if (allBtn) allBtn.click();
});