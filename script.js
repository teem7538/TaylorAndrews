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
    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const button = contactForm.querySelector(
            'button[type="submit"]'
        );

        let status = document.getElementById("contactStatus");

        if (!status) {
            status = document.createElement("p");
            status.id = "contactStatus";
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            contactForm.appendChild(status);
        }

        const originalText = button.textContent;
        button.disabled = true;
        button.textContent = "Sending...";
        status.textContent = "";

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error("Form submission failed.");
            }

            status.textContent = "Thank you! Your message was submitted.";
            status.style.color = "#218838";
            contactForm.reset();
        } catch (error) {
            status.textContent =
                "Unable to send your message. Please try again or contact the campaign by email.";
            status.style.color = "#d52b3c";
        } finally {
            button.disabled = false;
            button.textContent = originalText;
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
