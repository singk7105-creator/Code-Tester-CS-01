document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  const header = document.getElementById("siteHeader");
  const backToTop = document.getElementById("backToTop");
  const languageToggle = document.getElementById("languageToggle");

  // Mobile navigation
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const opened = mainNav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(opened));
    });
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Sticky header and back-to-top button
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("scrolled", y > 15);
    if (backToTop) backToTop.classList.toggle("show", y > 350);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  // Current year
  const year = document.getElementById("currentYear");
  if (year) year.textContent = new Date().getFullYear();

  // Hindi / English toggle. Preference is saved in local storage.
  const applyLanguage = lang => {
    document.documentElement.lang = lang === "en" ? "en" : "hi";
    document.querySelectorAll("[data-hi][data-en]").forEach(el => {
      const value = el.dataset[lang];
      if (value !== undefined) el.innerHTML = value;
    });
    if (languageToggle) languageToggle.textContent = lang === "hi" ? "EN" : "हिंदी";
    try { localStorage.setItem("bckp_language", lang); } catch (_) {}
  };

  let savedLanguage = "hi";
  try { savedLanguage = localStorage.getItem("bckp_language") || "hi"; } catch (_) {}
  applyLanguage(savedLanguage);

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      const next = document.documentElement.lang === "hi" ? "en" : "hi";
      applyLanguage(next);
    });
  }
});
