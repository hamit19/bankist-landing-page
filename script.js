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

// const message = document.createElement('div');

// message.classList.add('cookie-message');

// message.innerHTML =
//   'We use cookies to improve functionality and analytics <button class="btn btn--close-cookie" >Got it!</button>';

// header.prepend(message);

// document
//   .querySelector('.btn--close-cookie')
//   .addEventListener('click', function () {
//     message.remove();
//   });

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
  section.classList.add('section--hidden');
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
