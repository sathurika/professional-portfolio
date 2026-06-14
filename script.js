// ============================
// THEME TOGGLE
// ============================

const themeToggle = document.getElementById("theme-toggle");

// Load saved theme

if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "🌙";
}

// Toggle theme

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


// ============================
// NAVBAR SHADOW ON SCROLL
// ============================

window.addEventListener("scroll", () => {

    const navbar =
        document.querySelector(".navbar");

    if (window.scrollY > 40) {

        navbar.style.boxShadow =
            "0 10px 30px rgba(0,0,0,0.15)";

    } else {

        navbar.style.boxShadow = "none";
    }
});


// ============================
// FADE-IN ANIMATION
// ============================

const observer = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
            }
        });

    },

    {
        threshold: 0.15
    }
);

const hiddenElements =
    document.querySelectorAll(
        ".section, .project-card"
    );

hiddenElements.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
});


// ============================
// ACTIVE NAV LINK
// ============================

const sections =
    document.querySelectorAll("section");

const navLinks =
    document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop - 150;

        const sectionHeight =
            section.clientHeight;

        if (
            pageYOffset >= sectionTop
        ) {
            current =
                section.getAttribute("id");
        }
    });

    navLinks.forEach((link) => {

        link.classList.remove("active");

        if (
            link.getAttribute("href") ===
            `#${current}`
        ) {
            link.classList.add("active");
        }
    });
});


// ============================
// TYPEWRITER EFFECT
// ============================

const roleElement =
    document.querySelector(".hero-right h2");

const roles = [
    "AI Engineer Aspirant",
    "AI & ML Developer",
    "Prompt Engineer",
    "Future Entrepreneur"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {

    const currentRole =
        roles[roleIndex];

    if (!deleting) {

        roleElement.textContent =
            currentRole.substring(
                0,
                charIndex++
            );

        if (
            charIndex >
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
                charIndex--
            );

        if (charIndex < 0) {

            deleting = false;

            roleIndex =
                (roleIndex + 1) %
                roles.length;
        }
    }

    setTimeout(
        typeEffect,
        deleting ? 50 : 100
    );
}

typeEffect();


// ============================
// HERO IMAGE HOVER EFFECT
// ============================

const profileImage =
    document.querySelector(
        ".profile-image"
    );

profileImage.addEventListener(
    "mouseenter",
    () => {

        profileImage.style.transform =
            "scale(1.05)";
    }
);

profileImage.addEventListener(
    "mouseleave",
    () => {

        profileImage.style.transform =
            "scale(1)";
    }
);


// ============================
// CONSOLE SIGNATURE
// ============================

console.log(
    "%cPortfolio Designed & Built by Sathurika",
    "font-size:18px;font-weight:bold;color:#4f8cff;"
);

console.log(
    "%cAI Engineer Aspirant 🚀",
    "font-size:14px;color:#999;"
);