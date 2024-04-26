import './css/common.scss';

import PhotoSwipeLightbox from '/node_modules/photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from '/node_modules/photoswipe/dist/photoswipe.esm.js';
import Swiper from 'swiper/bundle';

// import styles bundle
import 'swiper/css/bundle';

import {
  Navigation,
  Pagination,
  Manipulation,
  Thumbs,
  FreeMode,
} from 'swiper/modules';

document.addEventListener('DOMContentLoaded', () => {
  //   const lightbox = new PhotoSwipeLightbox({
  //     gallery: '.features__images-swiper .swiper-wrapper',
  //     children: 'a',
  //     pswpModule: PhotoSwipe,
  //   });

  //   lightbox.init();
  const featuresSwiperContainer = document.querySelector(
    '.features__images-swiper'
  );

  const featuresSwiper = new Swiper('.features__images-swiper', {
    loop: true,
    slidesPerView: 1,
    modules: [Navigation, Pagination, Thumbs, FreeMode, Manipulation],
    //  navigation: {
    //    nextEl: '.home-hero-swiper .swiper-button-next',
    //    prevEl: '.home-hero-swiper .swiper-button-prev',
    //  },

    pagination: {
      el: '.features__images-swiper .swiper-pagination',
      clickable: true,
    },
    speed: 800,
  });

  if (featuresSwiperContainer) featuresSwiper.init();

  const featuresContentSwiperContainer = document.querySelector(
    '.features__images-swiper'
  );

  const featuresContentSwiper = new Swiper('.features__content-swiper', {
    loop: true,
    slidesPerView: 1,
    modules: [Navigation, Pagination, Thumbs, FreeMode, Manipulation],
    //  navigation: {
    //    nextEl: '.home-hero-swiper .swiper-button-next',
    //    prevEl: '.home-hero-swiper .swiper-button-prev',
    //  },

    pagination: {
      el: '.features__images-swiper .swiper-pagination',
      clickable: true,
    },
    speed: 800,
  });

  if (featuresContentSwiperContainer) featuresContentSwiper.init();

  //feature slider and titles

  const featureTitles = document.querySelectorAll('.features__big-titles h3');
  let lastHoveredTitle = null;
  let lastHoveredSlide = null;

  const featureSlides = document.querySelectorAll(
    '.features__right-wrapper .feature__desktop-slide'
  );

  featureTitles.forEach(title => {
    title.addEventListener('mouseenter', function () {
      featureTitles.forEach(t => t.classList.remove('accent'));
      featureSlides.forEach(slide => slide.classList.remove('is-shown'));

      this.classList.add('accent');
      lastHoveredTitle = this;

      // Find the relevant slide based on data-id
      const dataId = this.textContent.trim().toLowerCase();
      const relevantSlide = document.querySelector(
        `.feature__desktop-slide[data-id="${dataId}"]`
      );

      // Add class "is-shown" to relevant slide and remove from others
      relevantSlide.classList.add('is-shown');
      lastHoveredSlide = relevantSlide;
    });
  });

  //cases animation

  const items = document.querySelectorAll('.cases__item');

  document.addEventListener('wheel', () => {
    const viewportHeight = window.innerHeight;

    if (event.deltaY < 0) {
      for (let i = 0; i < items.length; i++) {
        const topOffset = items[i].getBoundingClientRect().top;
        if (topOffset >= viewportHeight) {
          if (items[i - 1]) {
            items[i - 1].classList.remove('fixed');
            items[i - 1].classList.add('absolute-top');
          }
        } else {
          if (i < items.length - 1) {
            items[i].classList.add('fixed');
            items[i].classList.remove('static');
          } else {
            items[i].classList.add('absolute-bottom');
            items[i].classList.remove('static');
          }
        }
      }
    } else {
      for (let i = 0; i < items.length; i++) {
        const topOffset = items[i].getBoundingClientRect().top;
        const bottomOffset = items[i].getBoundingClientRect().bottom;

        if (topOffset <= 0 && bottomOffset >= window.innerHeight) {
          if (i < items.length - 1) {
            items[i].classList.add('fixed');
            items[i].classList.remove('absolute');
          } else {
            items.forEach(item => {
              item.classList.add('static');
              item.classList.remove('absolute-top');
              item.classList.remove('absolute-bottom');
              item.classList.remove('fixed');

              item.classList.remove('absolute');
            });
          }
        }
      }
    }
  });
  //burger menu
  const sideMenuItems = document.querySelectorAll(
    '.burger-menu__sidemenu [data-menu]'
  );
  const mainMenuItems = document.querySelectorAll(
    '.burger-menu__main [data-id]'
  );
  const burgerButton = document.querySelector('.burger-button');
  const closeIcon = document.querySelector('.burger-button__close');
  const burgerMenu = document.querySelector('.burger-menu');
  const mainSection = document.querySelector('main');
  const headerSection = document.querySelector('header');

  burgerButton.addEventListener('click', function (e) {
    burgerButton.classList.toggle('close');
    burgerMenu.classList.toggle('open');
    mainSection.classList.toggle('menu-open');
    headerSection.classList.toggle('menu-open');

    sideMenuItems.forEach(item => {
      item.classList.remove('hovered');
    });
    mainMenuItems.forEach(item => {
      item.classList.remove('hovered');
      item.classList.remove('other-hovered');
      item.classList.remove('submenu-shown');
    });
  });

  // submenu header

  const mainMenu = document.querySelector('.burger-menu');

  const menuLinks = document.querySelectorAll('.burger-menu__main  a');
  if (window.matchMedia('(max-width: 768px)').matches) {
    menuLinks.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        if (e.target === link) {
          menuLinks.forEach(link => {
            link.parentElement.classList.remove('submenu-shown');
          });
          link.parentElement.classList.add('submenu-shown');
        } else {
          link.parentElement.classList.remove('submenu-shown');
        }
      });
    });
  }
  mainMenuItems.forEach(mainItem => {
    mainItem.addEventListener('mouseover', function () {
      mainMenuItems.forEach(mainItemAny => {
        if (mainItemAny !== mainItem) {
          mainItemAny.classList.add('other-hovered');
          mainItemAny.classList.remove('hovered');
        } else {
          mainItemAny.classList.add('hovered');
          mainItemAny.classList.remove('other-hovered');
        }
      });
      const dataId = this.getAttribute('data-id');
      sideMenuItems.forEach(item => {
        if (item.getAttribute('data-menu') === dataId) {
          item.classList.add('hovered');
          mainItem.classList.add('hovered');
        } else {
          item.classList.remove('hovered');
          mainItem.classList.remove('hovered');
        }
      });
    });
  });
});
