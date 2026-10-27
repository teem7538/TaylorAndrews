/* =================================
   MOBILE MENU
================================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("open");

});


/* Close menu when navigation link is clicked */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

    });

});


/* =================================
   HEADER ON SCROLL
================================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

});


/* =================================
   ISSUE FILTER
================================= */

const filters = document.querySelectorAll(".filter");
const issueCards = document.querySelectorAll(".issue-card");

filters.forEach(filter => {

    filter.addEventListener("click", () => {

        /* Remove active state */
        filters.forEach(button => {
            button.classList.remove("active");
        });

        /* Activate selected filter */
        filter.classList.add("active");

        const selectedCategory = filter.dataset.filter;

        issueCards.forEach(card => {

            const cardCategory = card.dataset.category;

            if (
                selectedCategory === "all" ||
                selectedCategory === cardCategory
            ) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* =================================
   CONTACT FORM
================================= */

/* =====================================
   FORMSPREE CONTACT FORM
===================================== */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const contactStatus = document.getElementById("contactStatus");
    const contactSubmit = document.getElementById("contactSubmit");

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        if (!contactForm.reportValidity()) return;

        const originalButtonText = contactSubmit.textContent;

        contactSubmit.disabled = true;
        contactSubmit.textContent = "Sending...";
        contactStatus.textContent = "Sending your message...";
        contactStatus.style.color = "";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    "Accept": "application/json"
                }
            });

            if (response.ok) {
                contactStatus.textContent =
                    "Thank you! Your message was sent successfully.";
                contactStatus.style.color = "#218838";
                contactForm.reset();
            } else {
                let message =
                    "We couldn't send your message. Please try again.";

                try {
                    const result = await response.json();

                    if (result.errors && result.errors.length) {
                        message = result.errors
                            .map(error => error.message)
                            .join(" ");
                    }
                } catch (_) {
                    // Use the default error message.
                }

                contactStatus.textContent = message;
                contactStatus.style.color = "#d52b3c";
            }
        } catch (error) {
            contactStatus.textContent =
                "Connection error. Please check your internet and try again.";
            contactStatus.style.color = "#d52b3c";
        } finally {
            contactSubmit.disabled = false;
            contactSubmit.textContent = originalButtonText;
        }
    });
}



/* =================================
   CURRENT YEAR
================================= */

document.getElementById("currentYear").textContent =
    new Date().getFullYear();


/* =================================
   SCROLL REVEAL
================================= */

const revealElements = document.querySelectorAll(
    ".issue-card, .timeline-item, .copy-block, .portrait-card"
);


revealElements.forEach(element => {

    element.style.opacity = "0";

    element.style.transform = "translateY(25px)";

    element.style.transition =
        "opacity 0.7s ease, transform 0.7s ease";

});


const revealObserver = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform =
                    "translateY(0)";

                revealObserver.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =================================
   ACTIVE NAVIGATION
================================= */

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection = section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.style.color = "";

        if (
            link.getAttribute("href") ===
            `#${currentSection}`
        ) {

            link.style.color = "#ef5967";

        }

    });

});
