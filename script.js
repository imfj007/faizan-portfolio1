/* ============================================
   MUHAMMAD FAIZAN PORTFOLIO - SCRIPTS
   ============================================ */

// ---- Loading Screen ----
document.addEventListener("DOMContentLoaded", () => {
  const loadingScreen = document.getElementById("loadingScreen");
  const loadingBar = document.getElementById("loadingBar");
  const loadingText = document.getElementById("loadingText");

  let progress = 0;
  const loadInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadInterval);
      setTimeout(() => {
        loadingScreen.classList.add("hidden");
        document.body.style.overflow = "auto";
        initAnimations();
      }, 400);
    }
    loadingBar.style.width = progress + "%";
    loadingText.textContent = Math.floor(progress) + "%";
  }, 150);
});

// ---- Custom Cursor ----
const cursor = document.getElementById("cursor");
const cursorFollower = document.getElementById("cursorFollower");

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

// Smooth follower
function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.left = followerX + "px";
  cursorFollower.style.top = followerY + "px";
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor hover effects
const hoverTargets = document.querySelectorAll("a, button, .what-content, .work-card, .resume-button");
hoverTargets.forEach((target) => {
  target.addEventListener("mouseenter", () => {
    cursor.classList.add("cursor-hover");
    cursorFollower.classList.add("cursor-follower-hover");
  });
  target.addEventListener("mouseleave", () => {
    cursor.classList.remove("cursor-hover");
    cursorFollower.classList.remove("cursor-follower-hover");
  });
});

// ---- Nav Fade on Scroll ----
const navFade = document.querySelector(".nav-fade");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navFade.classList.add("active");
  } else {
    navFade.classList.remove("active");
  }
});

// ---- Smooth Scroll for Nav Links ----
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ---- Scroll Reveal ----
function initAnimations() {
  const revealElements = document.querySelectorAll(".reveal");

  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---- Career Timeline Animation ----
  const careerTimeline = document.getElementById("careerTimeline");
  if (careerTimeline) {
    const timelineObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            careerTimeline.classList.add("active");
          }
        });
      },
      { threshold: 0.2 }
    );
    timelineObserver.observe(careerTimeline);
  }

  // ---- What I Do Section - Toggle ----
  const whatContents = document.querySelectorAll(".what-content");
  whatContents.forEach((content) => {
    content.addEventListener("click", () => {
      whatContents.forEach((c) => c.classList.remove("what-content-active"));
      content.classList.add("what-content-active");
    });
  });

  // ---- Observe What I Do Cards ----
  const whatCardsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }
  );
  whatContents.forEach((c) => whatCardsObserver.observe(c));
}

// ---- Parallax Effect on Landing Circles ----
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  const circle1 = document.querySelector(".landing-circle1");
  const circle2 = document.querySelector(".landing-circle2");

  if (circle1) {
    circle1.style.opacity = Math.max(0, 0.5 - scrollY / 1000);
  }
  if (circle2) {
    circle2.style.opacity = Math.max(0, 0.4 - scrollY / 1200);
  }
});

// ---- Set viewport height variable ----
function setVH() {
  document.documentElement.style.setProperty("--vh", window.innerHeight + "px");
}
setVH();
window.addEventListener("resize", setVH);

// ---- Work Card Hover Tilt Effect ----
const workCards = document.querySelectorAll(".work-card");
workCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateX(0)";
  });
});

// ---- Marquee Pause on Hover ----
const marqueeContents = document.querySelectorAll(".marquee-content");
marqueeContents.forEach((mc) => {
  mc.addEventListener("mouseenter", () => {
    mc.style.animationPlayState = "paused";
  });
  mc.addEventListener("mouseleave", () => {
    mc.style.animationPlayState = "running";
  });
});
