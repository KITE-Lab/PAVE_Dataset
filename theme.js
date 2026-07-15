const THEME_STORAGE_KEY = "themePreference";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
const themeButtons = Array.from(document.querySelectorAll("[data-theme-option]"));

function getStoredThemePreference() {
  const storedValue = localStorage.getItem(THEME_STORAGE_KEY);
  return storedValue === "light" || storedValue === "dark" || storedValue === "auto"
    ? storedValue
    : "auto";
}

function resolveTheme(preference) {
  if (preference === "auto") {
    return themeMediaQuery.matches ? "dark" : "light";
  }

  return preference;
}

function updateThemeControls(preference) {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeOption === preference;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function applyTheme(preference) {
  const resolvedTheme = resolveTheme(preference);

  document.documentElement.dataset.theme = resolvedTheme;
  document.documentElement.dataset.themePreference = preference;
  document.body.dataset.theme = resolvedTheme;
  document.body.dataset.themePreference = preference;

  updateThemeControls(preference);
}

function setThemePreference(preference) {
  localStorage.setItem(THEME_STORAGE_KEY, preference);
  applyTheme(preference);
}

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setThemePreference(button.dataset.themeOption);
  });
});

applyTheme(getStoredThemePreference());

themeMediaQuery.addEventListener("change", () => {
  if (getStoredThemePreference() === "auto") {
    applyTheme("auto");
  }
});

const vehicleCarousel = document.querySelector("[data-carousel]");

if (vehicleCarousel) {
  const AUTOPLAY_DELAY_MS = 5000;
  const SWIPE_THRESHOLD_PX = 48;
  const track = vehicleCarousel.querySelector("[data-carousel-track]");
  const slides = Array.from(vehicleCarousel.querySelectorAll("[data-carousel-slide]"));
  const previousButton = vehicleCarousel.querySelector("[data-carousel-previous]");
  const nextButton = vehicleCarousel.querySelector("[data-carousel-next]");
  const dots = Array.from(vehicleCarousel.querySelectorAll("[data-carousel-dot]"));
  const title = vehicleCarousel.querySelector("[data-carousel-title]");
  const count = vehicleCarousel.querySelector("[data-carousel-count]");
  const currentCount = vehicleCarousel.querySelector("[data-carousel-current]");
  const totalCount = vehicleCarousel.querySelector("[data-carousel-total]");
  const viewport = vehicleCarousel.querySelector(".vehicle-carousel__viewport");
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const pauseReasons = new Set();
  const vehicleNames = slides.map((slide) => {
    const image = slide.querySelector("img");
    const imageUrl = new URL(image.getAttribute("src"), document.baseURI);
    const fileName = decodeURIComponent(imageUrl.pathname.split("/").pop());
    return fileName.replace(/\.[^.]+$/, "");
  });

  let currentIndex = 0;
  let autoplayTimer = null;
  let touchStartX = null;
  let touchStartY = null;

  function normalizeIndex(index) {
    return (index + slides.length) % slides.length;
  }

  function renderCarousel() {
    track.style.transform = `translate3d(-${currentIndex * 100}%, 0, 0)`;

    slides.forEach((slide, index) => {
      slide.setAttribute("aria-hidden", String(index !== currentIndex));
    });

    dots.forEach((dot, index) => {
      const isActive = index === currentIndex;
      dot.classList.toggle("active", isActive);
      dot.setAttribute("aria-current", String(isActive));
    });

    title.textContent = vehicleNames[currentIndex];
    currentCount.textContent = String(currentIndex + 1);
    totalCount.textContent = String(slides.length);
    count.setAttribute("aria-label", `Slide ${currentIndex + 1} of ${slides.length}`);
  }

  function stopAutoplay() {
    if (autoplayTimer !== null) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function syncAutoplay() {
    stopAutoplay();

    if (slides.length <= 1 || reducedMotionQuery.matches || pauseReasons.size > 0) {
      return;
    }

    autoplayTimer = window.setInterval(() => {
      currentIndex = normalizeIndex(currentIndex + 1);
      renderCarousel();
    }, AUTOPLAY_DELAY_MS);
  }

  function showSlide(index, resetAutoplay = false) {
    currentIndex = normalizeIndex(index);
    renderCarousel();

    if (resetAutoplay) {
      syncAutoplay();
    }
  }

  function setPaused(reason, shouldPause) {
    if (shouldPause) {
      pauseReasons.add(reason);
    } else {
      pauseReasons.delete(reason);
    }

    syncAutoplay();
  }

  previousButton.addEventListener("click", () => {
    showSlide(currentIndex - 1, true);
  });

  nextButton.addEventListener("click", () => {
    showSlide(currentIndex + 1, true);
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showSlide(Number(dot.dataset.slideIndex), true);
    });
  });

  vehicleCarousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showSlide(currentIndex - 1, true);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      showSlide(currentIndex + 1, true);
    }
  });

  vehicleCarousel.addEventListener("mouseenter", () => {
    setPaused("hover", true);
  });

  vehicleCarousel.addEventListener("mouseleave", () => {
    setPaused("hover", false);
  });

  vehicleCarousel.addEventListener("focusin", () => {
    setPaused("focus", true);
  });

  vehicleCarousel.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => {
      setPaused("focus", vehicleCarousel.contains(document.activeElement));
    });
  });

  viewport.addEventListener(
    "touchstart",
    (event) => {
      if (event.touches.length !== 1) {
        return;
      }

      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    { passive: true }
  );

  viewport.addEventListener(
    "touchend",
    (event) => {
      if (touchStartX === null || touchStartY === null || event.changedTouches.length === 0) {
        return;
      }

      const deltaX = event.changedTouches[0].clientX - touchStartX;
      const deltaY = event.changedTouches[0].clientY - touchStartY;
      touchStartX = null;
      touchStartY = null;

      if (Math.abs(deltaX) < SWIPE_THRESHOLD_PX || Math.abs(deltaX) <= Math.abs(deltaY)) {
        return;
      }

      showSlide(currentIndex + (deltaX < 0 ? 1 : -1), true);
    },
    { passive: true }
  );

  document.addEventListener("visibilitychange", () => {
    setPaused("visibility", document.hidden);
  });

  reducedMotionQuery.addEventListener("change", syncAutoplay);

  renderCarousel();
  syncAutoplay();
}
