'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector('.header');

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

const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const tabsContainer = document.querySelector('.operations__tab-container');

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

// tabs.forEach(t => {
//   t.childNodes.forEach(childNode =>
//     childNode.addEventListener('click', e => e.stopPropagation())
//   );

//   t.addEventListener('click', function (e) {
//     tabs.forEach(tab => tab.classList.remove('operations__tab--active'));

//     e.target.classList.add('operations__tab--active');

//     tabsContent.forEach(c =>
//       c.classList.forEach(className =>
//         className.includes(e.target.dataset.tab)
//           ? c.classList.add('operations__content--active')
//           : c.classList.remove('operations__content--active')
//       )
//     );
//   });
// });

// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });
