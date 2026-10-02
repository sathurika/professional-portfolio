/* =====================================================
   PORTFOLIO JAVASCRIPT
===================================================== */


/* =====================================================
   THEME TOGGLE
===================================================== */

const themeToggle = document.getElementById("theme-toggle");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {

    document.body.classList.add("light-mode");

    themeToggle.textContent = "🌙";

} else {

    themeToggle.textContent = "☀️";
}


themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const isLight =
        document.body.classList.contains("light-mode");

    if (isLight) {

        localStorage.setItem("theme", "light");

        themeToggle.textContent = "🌙";

    } else {

        localStorage.setItem("theme", "dark");

        themeToggle.textContent = "☀️";
    }

});


/* =====================================================
   MOBILE MENU
===================================================== */

const mobileMenuButton =
    document.getElementById("mobile-menu-btn");

const navLinks =
    document.querySelector(".nav-links");


mobileMenuButton.addEventListener("click", () => {

    navLinks.classList.toggle("mobile-open");

    const isOpen =
        navLinks.classList.contains("mobile-open");

    mobileMenuButton.textContent =
        isOpen ? "✕" : "☰";

});


document.querySelectorAll(".nav-links a")
    .forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("mobile-open");

            mobileMenuButton.textContent = "☰";

        });

    });


/* =====================================================
   NAVBAR SCROLL EFFECT
===================================================== */

const navbar =
    document.querySelector(".navbar");


window.addEventListener("scroll", () => {

    if (window.scrollY > 30) {

        navbar.style.boxShadow =
            "0 12px 35px rgba(0,0,0,0.18)";

    } else {

        navbar.style.boxShadow = "none";
    }

});


/* =====================================================
   ACTIVE NAVIGATION
===================================================== */

const sections =
    document.querySelectorAll("section[id]");

const navItems =
    document.querySelectorAll(".nav-links a");


function updateActiveNav() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop =
            section.offsetTop - 180;

        const sectionHeight =
            section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {

            currentSection =
                section.getAttribute("id");

        }

    });


    navItems.forEach(link => {

        link.classList.remove("active");

        const target =
            link.getAttribute("href").substring(1);

        if (target === currentSection) {

            link.classList.add("active");

        }

    });

}


window.addEventListener(
    "scroll",
    updateActiveNav
);

updateActiveNav();


/* =====================================================
   TYPEWRITER
===================================================== */

const roleElement =
    document.getElementById("role-text");


const roles = [

    "Software Developer",

    "AI/ML Enthusiast",

    "Generative AI Developer",

    "LLM Application Builder"

];


let roleIndex = 0;

let characterIndex = 0;

let deleting = false;


function typeEffect() {

    const currentRole =
        roles[roleIndex];


    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );

        characterIndex++;


        if (
            characterIndex >
            currentRole.length
        ) {

            deleting = true;

            setTimeout(
                typeEffect,
                1500
            );

            return;
        }

    } else {

        roleElement.textContent =
            currentRole.substring(
                0,
                characterIndex
            );

        characterIndex--;


        if (characterIndex < 0) {

            deleting = false;

            characterIndex = 0;

            roleIndex =
                (roleIndex + 1) %
                roles.length;

        }

    }


    setTimeout(

        typeEffect,

        deleting ? 45 : 90

    );

}


typeEffect();


/* =====================================================
   SKILL FILTER
===================================================== */

const skillTabs =
    document.querySelectorAll(".skill-tab");

const skillItems =
    document.querySelectorAll(".skill-item");


skillTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        skillTabs.forEach(item => {

            item.classList.remove("active");

        });

        tab.classList.add("active");


        const category =
            tab.dataset.category;


        skillItems.forEach(skill => {

            const skillCategory =
                skill.dataset.category;


            if (
                category === "all" ||
                skillCategory === category
            ) {

                skill.classList.remove("hidden");

            } else {

                skill.classList.add("hidden");

            }

        });

    });

});


/* =====================================================
   PROJECT CAROUSEL
===================================================== */

const projectSlides =
    document.querySelectorAll(".project-slide");

const carouselDots =
    document.querySelectorAll(".carousel-dot");

const projectCurrent =
    document.getElementById("project-current");

const previousButton =
    document.getElementById("project-prev");

const nextButton =
    document.getElementById("project-next");


let currentProject = 0;


function showProject(index) {

    if (index < 0) {

        index =
            projectSlides.length - 1;

    }

    if (
        index >=
        projectSlides.length
    ) {

        index = 0;

    }


    projectSlides.forEach(slide => {

        slide.classList.remove("active");

    });


    carouselDots.forEach(dot => {

        dot.classList.remove("active");

    });


    projectSlides[index]
        .classList.add("active");


    carouselDots[index]
        .classList.add("active");


    projectCurrent.textContent =
        String(index + 1).padStart(2, "0");


    currentProject = index;

}


previousButton.addEventListener(
    "click",
    () => {

        showProject(
            currentProject - 1
        );

    }
);


nextButton.addEventListener(
    "click",
    () => {

        showProject(
            currentProject + 1
        );

    }
);


carouselDots.forEach(dot => {

    dot.addEventListener("click", () => {

        showProject(
            Number(dot.dataset.slide)
        );

    });

});


/* =====================================================
   AUTO PROJECT SLIDE
===================================================== */

let autoSlide =
    setInterval(() => {

        showProject(
            currentProject + 1
        );

    }, 7000);


const carousel =
    document.querySelector(".project-carousel");


carousel.addEventListener(
    "mouseenter",
    () => {

        clearInterval(autoSlide);

    }
);


carousel.addEventListener(
    "mouseleave",
    () => {

        autoSlide =
            setInterval(() => {

                showProject(
                    currentProject + 1
                );

            }, 7000);

    }
);


/* =====================================================
   KEYBOARD CAROUSEL
===================================================== */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "ArrowLeft") {

            showProject(
                currentProject - 1
            );

        }

        if (event.key === "ArrowRight") {

            showProject(
                currentProject + 1
            );

        }

    }
);


/* =====================================================
   TOUCH SWIPE FOR PROJECTS
===================================================== */

let touchStartX = 0;

let touchEndX = 0;


carousel.addEventListener(
    "touchstart",
    event => {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    { passive: true }
);


carousel.addEventListener(
    "touchend",
    event => {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    { passive: true }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 50) {
        return;
    }


    if (difference > 0) {

        showProject(
            currentProject + 1
        );

    } else {

        showProject(
            currentProject - 1
        );

    }

}


/* =====================================================
   SCROLL REVEAL
===================================================== */

const revealElements = [

    ...document.querySelectorAll(
        ".section-header"
    ),

    ...document.querySelectorAll(
        ".about-main"
    ),

    ...document.querySelectorAll(
        ".developer-card"
    ),

    ...document.querySelectorAll(
        ".skill-item"
    ),

    ...document.querySelectorAll(
        ".achievement-card"
    ),

    ...document.querySelectorAll(
        ".resume-card"
    ),

    ...document.querySelectorAll(
        ".contact-link"
    )

];


revealElements.forEach(
    element => {

        element.classList.add("reveal");

    }
);


const revealObserver =
    new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (
                    entry.isIntersecting
                ) {

                    entry.target.classList
                        .add("show");

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


revealElements.forEach(
    element => {

        revealObserver.observe(element);

    }
);


/* =====================================================
   PROFILE IMAGE
===================================================== */

const profileImage =
    document.querySelector(".profile-image");


profileImage.addEventListener(
    "mouseenter",
    () => {

        profileImage.style.transform =
            "scale(1.035)";

    }
);


profileImage.addEventListener(
    "mouseleave",
    () => {

        profileImage.style.transform =
            "scale(1)";

    }
);


/* =====================================================
   CONSOLE SIGNATURE
===================================================== */

console.log(
    "%cSathurika R",
    "font-size:22px;font-weight:800;color:#4f8cff;"
);

console.log(
    "%cSoftware Developer • AI/ML Enthusiast",
    "font-size:13px;color:#8e9bad;"
);

console.log(
    "%cBuilding intelligent software, one project at a time.",
    "font-size:12px;color:#46d39a;"
);