document.addEventListener('DOMContentLoaded', () => {
  // ==========================================
  // DOM ELEMENTS
  // ==========================================

  const siteHeader = document.querySelector('.site-header');

  const navLinks = document.querySelectorAll('.nav-link');

  const sections = document.querySelectorAll('main section');

  const smoothScrollLinks = document.querySelectorAll(
    '.navbar a[href^="#"], .primary-button[href^="#"], .secondary-button[href^="#"]'
  );


  // ==========================================
  // 1. SMOOTH SCROLLING
  // ==========================================

  smoothScrollLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();

      const targetId = link.getAttribute('href');

      const targetSection = document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      const headerHeight = siteHeader.offsetHeight;

      const targetPosition =
        targetSection.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });


  // ==========================================
  // 2. NAVBAR RESIZING
  // ==========================================

  const updateNavbarSize = () => {
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  };


  // ==========================================
  // 3. POSITION INDICATOR
  // ==========================================

  const updateActiveNavLink = () => {
    const headerBottom = siteHeader.offsetHeight + 2;

    let currentSectionId = 'home';

    sections.forEach((section) => {
      const sectionPosition = section.getBoundingClientRect();

      if (
        sectionPosition.top <= headerBottom &&
        sectionPosition.bottom > headerBottom
      ) {
        currentSectionId = section.id;
      }
    });

    /*
      The assignment specifically requires the last
      navigation item to be highlighted when the user
      reaches the bottom of the page.
    */

    const reachedBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    if (reachedBottom) {
      currentSectionId = sections[sections.length - 1].id;
    }

    navLinks.forEach((link) => {
      link.classList.remove('active');

      const targetId = link.getAttribute('href').substring(1);

      if (targetId === currentSectionId) {
        link.classList.add('active');
      }
    });
  };


  // ==========================================
  // 4. SCROLL HANDLER
  // ==========================================

  const handleScroll = () => {
    updateNavbarSize();
    updateActiveNavLink();
  };

  window.addEventListener('scroll', handleScroll, {
    passive: true,
  });

  window.addEventListener('resize', handleScroll);


  // ==========================================
  // 5. CAROUSEL
  // ==========================================

  const carouselTrack =
    document.querySelector('.carousel-track');

  const carouselSlides =
    document.querySelectorAll('.carousel-slide');

  const previousButton =
    document.querySelector('.carousel-button-prev');

  const nextButton =
    document.querySelector('.carousel-button-next');

  const carouselDots =
    document.querySelectorAll('.carousel-dot');

  let currentSlide = 0;


  const showSlide = (slideIndex) => {
    currentSlide = slideIndex;

    carouselTrack.style.transform =
      `translateX(-${currentSlide * 100}%)`;

    carouselDots.forEach((dot, index) => {
      dot.classList.toggle(
        'active',
        index === currentSlide
      );
    });
  };


  nextButton.addEventListener('click', () => {
    currentSlide =
      (currentSlide + 1) % carouselSlides.length;

    showSlide(currentSlide);
  });


  previousButton.addEventListener('click', () => {
    currentSlide =
      (
        currentSlide -
        1 +
        carouselSlides.length
      ) %
      carouselSlides.length;

    showSlide(currentSlide);
  });


  carouselDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const slideIndex = Number(dot.dataset.slide);

      showSlide(slideIndex);
    });
  });


  // ==========================================
  // 6. MODAL
  // ==========================================

  const modal =
    document.querySelector('#experience-modal');

  const modalDialog =
    document.querySelector('.modal-dialog');

  const modalOpenButtons =
    document.querySelectorAll('.modal-open-button');

  const modalCloseButton =
    document.querySelector('.modal-close-button');

  const modalBackdrop =
    document.querySelector('.modal-backdrop');

  const modalTitle =
    document.querySelector('#modal-title');

  const modalLocation =
    document.querySelector('#modal-location');

  const modalText =
    document.querySelector('#modal-text');

  let previouslyFocusedElement = null;


  const openModal = (button) => {
    previouslyFocusedElement = button;

    modalTitle.textContent =
      button.dataset.modalTitle;

    modalLocation.textContent =
      button.dataset.modalLocation;

    modalText.textContent =
      button.dataset.modalText;

    modal.classList.add('active');

    modal.setAttribute('aria-hidden', 'false');

    document.body.classList.add('modal-open');

    modalCloseButton.focus();
  };


  const closeModal = () => {
    modal.classList.remove('active');

    modal.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');

    if (previouslyFocusedElement) {
      previouslyFocusedElement.focus();
    }
  };


  modalOpenButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openModal(button);
    });
  });


  modalCloseButton.addEventListener(
    'click',
    closeModal
  );


  modalBackdrop.addEventListener(
    'click',
    closeModal
  );


  document.addEventListener('keydown', (event) => {
    if (
      event.key === 'Escape' &&
      modal.classList.contains('active')
    ) {
      closeModal();
    }
  });


  // Prevent clicks inside the dialog from
  // behaving like backdrop clicks.

  modalDialog.addEventListener('click', (event) => {
    event.stopPropagation();
  });


  // ==========================================
  // INITIAL STATE
  // ==========================================

  showSlide(0);

  handleScroll();
});