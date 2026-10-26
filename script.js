
/* =========================
   MOBILE NAVIGATION
========================= */

const menuBtn = document.getElementById("menu-btn");
const navbar = document.getElementById("navbar");
const navLinks = document.querySelectorAll(".navbar a");

function closeMenu() {
  navbar.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
  menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
}

menuBtn.addEventListener("click", () => {
  const isOpen = navbar.classList.toggle("open");

  menuBtn.setAttribute("aria-expanded", String(isOpen));
  menuBtn.innerHTML = isOpen
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    closeMenu();
  });
});

document.addEventListener("click", (event) => {
  if (
    !navbar.contains(event.target) &&
    !menuBtn.contains(event.target)
  ) {
    closeMenu();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

/* =========================
   TYPING ANIMATION
========================= */

const typingElement = document.getElementById("typing");

const roles = [
  "Web Developer",
  "Frontend Developer",
  "UI/UX Designer",
  "Creative Thinker"
];

let roleIndex = 0;
let characterIndex = 0;
let isDeleting = false;

function typeWriter() {
  const role = roles[roleIndex];

  characterIndex += isDeleting ? -1 : 1;

  typingElement.textContent = role.substring(0, characterIndex);

  let delay = isDeleting ? 45 : 90;

  if (!isDeleting && characterIndex === role.length) {
    isDeleting = true;
    delay = 1300;
  } else if (isDeleting && characterIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  setTimeout(typeWriter, delay);
}

typeWriter();

/* =========================
   SCROLL REVEAL ANIMATION
========================= */

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -25px 0px"
  }
);

revealItems.forEach((element, index) => {
  if (
    element.classList.contains("education-card") ||
    element.classList.contains("skill-card") ||
    element.classList.contains("project-card")
  ) {
    element.style.transitionDelay = `${(index % 3) * 100}ms`;
  }

  revealObserver.observe(element);
});

/* =========================
   SKILL BAR ANIMATION
========================= */

const skillsSection = document.getElementById("skills");
const skillBars = document.querySelectorAll(".progress span");

const skillObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillBars.forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });

        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

skillObserver.observe(skillsSection);

/* =========================
   ACTIVE NAVIGATION
========================= */

const pageSections = document.querySelectorAll("main section[id]");

const navigationObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navLinks.forEach((link) => {
        const active =
          link.getAttribute("href") === `#${entry.target.id}`;

        link.classList.toggle("active", active);
      });
    });
  },
  {
    rootMargin: "-30% 0px -60% 0px",
    threshold: 0
  }
);

pageSections.forEach((section) => {
  navigationObserver.observe(section);
});

/* =========================
   CURRENT FOOTER YEAR
========================= */

document.getElementById("year").textContent =
  new Date().getFullYear();

/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    formStatus.textContent = "Please fill in all fields.";
    return;
  }

  // Replace this with your real email address.
  const recipient = "your@email.com";

  const subject = encodeURIComponent(
    `Portfolio message from ${name}`
  );

  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );

  formStatus.textContent =
    "Opening your email application...";

  window.location.href =
    `mailto:${recipient}?subject=${subject}&body=${body}`;
});