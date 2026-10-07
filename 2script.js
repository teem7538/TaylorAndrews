/* =================================
   MOBILE + DESKTOP SAFE SETUP
================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================
       MOBILE MENU
    ================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("open");

            /* Accessibility */
            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

        });


        /* Close menu when navigation link is clicked */

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            if (
                !navLinks.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        /* Close menu when pressing Escape */

        document.addEventListener("keydown", event => {

            if (event.key === "Escape") {

                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    /* =================================
       HEADER ON SCROLL
    ================================= */

    const header = document.querySelector(".header");

    function updateHeader() {

        if (!header) return;

        if (window.scrollY > 40) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    updateHeader();


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

            const selectedCategory =
                filter.dataset.filter;

            issueCards.forEach(card => {

                const cardCategory =
                    card.dataset.category;

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

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");

    if (contactForm && formMessage) {

        contactForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();

                const nameInput =
                    document.getElementById("name");

                const emailInput =
                    document.getElementById("email");

                const messageInput =
                    document.getElementById("message");


                const name =
                    nameInput?.value.trim() || "";

                const email =
                    emailInput?.value.trim() || "";

                const message =
                    messageInput?.value.trim() || "";


                /* Validate form */

                if (!name || !email || !message) {

                    formMessage.textContent =
                        "Please complete all fields.";

                    formMessage.style.color =
                        "#d52b3c";

                    return;

                }


                /* Basic email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                if (!emailPattern.test(email)) {

                    formMessage.textContent =
                        "Please enter a valid email address.";

                    formMessage.style.color =
                        "#d52b3c";

                    return;

                }


                /* Success */

                formMessage.textContent =
                    `Thank you, ${name}. Your message has been recorded for this demo.`;

                formMessage.style.color =
                    "#185b88";

                contactForm.reset();

            }
        );

    }


    /* =================================
       CURRENT YEAR
    ================================= */

    const currentYear =
        document.getElementById("currentYear");

    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =================================
       SCROLL REVEAL
    ================================= */

    const revealElements =
        document.querySelectorAll(
            ".issue-card, .timeline-item, .copy-block, .portrait-card"
        );


    /* Respect reduced-motion settings */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {

        revealElements.forEach(element => {

            element.style.opacity = "1";

            element.style.transform =
                "translateY(0)";

        });

    } else {

        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";

        });


        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.style.opacity = "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            revealObserver.unobserve(
                                entry.target
                            );

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

    }


    /* =================================
       ACTIVE NAVIGATION
    ================================= */

    const sections =
        document.querySelectorAll("section[id]");

    const navItems =
        document.querySelectorAll(".nav-links a");


    function updateActiveNavigation() {

        let currentSection = "";

        const scrollPosition =
            window.scrollY + 180;


        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;


            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navItems.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    }


    updateActiveNavigation();


    /* =================================
       OPTIMIZED SCROLL HANDLING
    ================================= */

    let scrollTicking = false;

    window.addEventListener(
        "scroll",
        () => {

            if (!scrollTicking) {

                window.requestAnimationFrame(() => {

                    updateHeader();
                    updateActiveNavigation();

                    scrollTicking = false;

                });

                scrollTicking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =================================
       HANDLE SCREEN SIZE CHANGES
    ================================= */

    window.addEventListener(
        "resize",
        () => {

            /* Automatically close mobile
               menu when returning to desktop */

            if (
                window.innerWidth > 768 &&
                navLinks
            ) {

                navLinks.classList.remove("open");

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }

            }

        },
        {
            passive: true
        }
    );

});