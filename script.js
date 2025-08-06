document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  menuToggle.addEventListener("click", function () {
    this.classList.toggle("active");
    mainNav.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  // Close mobile menu when clicking on a nav link
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuToggle.classList.remove("active");
      mainNav.classList.remove("active");
      document.body.classList.remove("no-scroll");
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Back to Top Button
  const backToTopBtn = document.getElementById("backToTop");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Pricing Tabs
  const pricingTabs = document.querySelectorAll(".pricing-tab");
  const priceCards = document.querySelectorAll(".price-card");

  pricingTabs.forEach((tab) => {
    tab.addEventListener("click", function () {
      // Remove active class from all tabs
      pricingTabs.forEach((t) => t.classList.remove("active"));

      // Add active class to clicked tab
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      // Show/hide price cards based on category
      priceCards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Testimonial Slider
  const testimonialSlider = document.querySelector(".testimonials-slider");
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const sliderPrev = document.querySelector(".slider-prev");
  const sliderNext = document.querySelector(".slider-next");
  const sliderDots = document.querySelector(".slider-dots");

  // Create dots
  testimonialCards.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("slider-dot");
    if (index === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
    sliderDots.appendChild(dot);
  });

  const dots = document.querySelectorAll(".slider-dot");
  let currentSlide = 0;

  function goToSlide(slideIndex) {
    testimonialSlider.scrollTo({
      left: testimonialCards[slideIndex].offsetLeft,
      behavior: "smooth",
    });

    // Update dots
    dots.forEach((dot) => dot.classList.remove("active"));
    dots[slideIndex].classList.add("active");

    currentSlide = slideIndex;
  }

  sliderPrev.addEventListener("click", () => {
    currentSlide =
      (currentSlide - 1 + testimonialCards.length) % testimonialCards.length;
    goToSlide(currentSlide);
  });

  sliderNext.addEventListener("click", () => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    goToSlide(currentSlide);
  });

  // Auto-scroll testimonials
  let autoScrollInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % testimonialCards.length;
    goToSlide(currentSlide);
  }, 5000);

  // Pause auto-scroll on hover
  testimonialSlider.addEventListener("mouseenter", () => {
    clearInterval(autoScrollInterval);
  });

  testimonialSlider.addEventListener("mouseleave", () => {
    autoScrollInterval = setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonialCards.length;
      goToSlide(currentSlide);
    }, 5000);
  });

  // Form Submission
  const appointmentForm = document.getElementById("appointmentForm");

  if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const formData = new FormData(this);
      const data = Object.fromEntries(formData.entries());

      // Here you would typically send the data to a server
      console.log("Form submitted:", data);

      // Show success message
      alert(
        "Randevu talebiniz alınmıştır. En kısa sürede sizinle iletişime geçilecektir. Teşekkür ederiz!"
      );

      // Reset form
      this.reset();
    });
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in, .zoom-in").forEach((el) => {
    observer.observe(el);
  });

  // Sticky header on scroll
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }

    lastScroll = currentScroll;
  });

  // Active nav link based on scroll position
  const sections = document.querySelectorAll("section");
  const nav1Links = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Initialize first tab as active
  if (pricingTabs.length > 0) {
    pricingTabs[0].click();
  }
});
