'use strict';

///////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');
const nav = document.querySelector('.nav');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const section1 = document.querySelector('#section--1');
const scrollBtn = document
  .querySelector('.btn--scroll-to')
  .addEventListener('click', function () {
    section1.scrollIntoView({ behavior: 'smooth' });
  });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed component
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  if (!clicked) return;

  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //removing the class name
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //display content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// hover link
const eventHandler = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('img');

    siblings.forEach(s => s !== link && (s.style.opacity = this));

    logo.style.opacity = this;
  }
};

const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;

  !entry.isIntersecting
    ? nav.classList.add('sticky')
    : nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Revealing Sections

const revalSectionOptions = {
  root: null,
  threshold: 0.15,
};

const revealSection = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  sectionObserver.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(
  revealSection,
  revalSectionOptions
);

const sections = document.querySelectorAll('section');

sections.forEach(section => {
  // section.classList.add('section--hidden');
  sectionObserver.observe(section);
});

// Lazy Loading Images

const lazyLoading = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  imagesObserver.unobserve(entry.target);
};

const lazyLoadingOptions = {
  root: null,
  threshold: 0,
  rootMargin: '200px',
};

const imagesObserver = new IntersectionObserver(
  lazyLoading,
  lazyLoadingOptions
);

const images = document.querySelectorAll('img[data-src]');

images.forEach(image => {
  imagesObserver.observe(image);
});

const slider = function () {
  // Selectors
  const slides = document.querySelectorAll('.slide');
  const btnRight = document.querySelector('.slider__btn--right');
  const btnLeft = document.querySelector('.slider__btn--left');
  const containerDots = document.querySelector('.dots');

  let curSlide = 0;
  let slidesLength = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      const slideDot = `
           <button data-slide=${i} class="dots__dot" ></button>
    `;

      containerDots.insertAdjacentHTML('beforeend', slideDot);
    });
  };

  const goToSlide = function (slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
      s.dataset.slider = i;
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const nextSlide = function () {
    curSlide === slidesLength - 1 ? (curSlide = 0) : curSlide++;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const pervSlide = function () {
    curSlide === 0 ? (curSlide = slidesLength - 1) : curSlide--;
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    createDots();
    goToSlide(0);
    activateDot(0);
  };

  init();

  containerDots.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', pervSlide);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') pervSlide();

    if (e.key === 'ArrowRight') nextSlide();
  });
};

slider();
