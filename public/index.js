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
  window.addEventListener('scroll', onScroll, false);

  //Get all the section reference
  var sectionOne = document.querySelector('.features');
  var sectionTwo = document.querySelector('#case-1');
  const sectionTwoContainer = sectionTwo.querySelector('.cases__container');
  var sectionThree = document.querySelector('#case-2');
  const sectionThreeContainer = sectionThree.querySelector('cases__container');
  var sectionFourth = document.querySelector('#case-3');
  const sectionFourContainer = sectionFourth.querySelector('cases__container');
  var sectionFifth = document.querySelector('#case-4');
  var sectionSix = document.querySelector('.insights');

  //Calculate their individual height
  var SectionOneHeight = getComputedStyle(sectionOne).height.split('px')[0];
  var SectionTwoHeight = getComputedStyle(sectionTwo).height.split('px')[0];
  var SectionThreeHeight = getComputedStyle(sectionThree).height.split('px')[0];
  var SectionFourthHeight =
    getComputedStyle(sectionFourth).height.split('px')[0];
  var SectionFifthHeight = getComputedStyle(sectionFifth).height.split('px')[0];

  //calculate the checkpoint where item need to be modified
  var checkPointTwo = sectionTwo.getBoundingClientRect().top;
  var checkPointThree = sectionThree.getBoundingClientRect().top;

  var checkPointFourth = sectionFourth.getBoundingClientRect().top;

  var checkPointFifth = sectionFifth.getBoundingClientRect().top;

  //Scroll logic
  function onScroll() {
    var scrollBarPosition = window.pageYOffset;
    if (scrollBarPosition >= 0 && scrollBarPosition < checkPointTwo) {
      removeClass(sectionTwo, sectionThree);
      removeBackground(sectionTwo);
      removeBackground(sectionThree);
      removeBackground(sectionFourth);
    } else if (
      window.pageYOffset >= checkPointTwo &&
      window.pageYOffset < checkPointThree
    ) {
      addClass(sectionTwo);
      addBackground(sectionTwo);
      removeBackground(sectionThree);
    } else if (
      window.pageYOffset >= checkPointThree &&
      window.pageYOffset < checkPointFourth
    ) {
      addClass(sectionThree);
      addBackground(sectionThree);
      removeBackground(sectionFourth);
    } else if (
      window.pageYOffset >= checkPointFourth &&
      window.pageYOffset < checkPointFifth
    ) {
      addClass(sectionFourth);
      addBackground(sectionFourth);
    } else if (scrollBarPosition === 0) {
      removeBackground(sectionTwo);
      removeBackground(sectionThree);
      removeBackground(sectionFourth);
    }
  }
  function addClass(elemOne) {
    elemOne.classList.add('fixed');
  }
  function addAbs(elemOne, margin) {
    elemOne.style.top = margin + 'px';
    elemOne.style.position = 'absolute';
  }
  function addBackground(elem) {
    elem.classList.add('background-grey');
  }

  function removeBackground(elem) {
    elem.classList.remove('background-grey');
  }
  function removeClass(elemOne, elemTwo) {
    elemOne.classList.remove('fixed');
    elemTwo.classList.remove('absolute');
  }
  // document.addEventListener('wheel', () => {
  //   const viewportHeight = window.innerHeight;

  //   if (event.deltaY < 0) {
  //     for (let i = 0; i < items.length; i++) {
  //       const topOffset = items[i].getBoundingClientRect().top;
  //       const bottomOffset = items[i].getBoundingClientRect().bottom;

  //       if (topOffset >= viewportHeight) {
  //         if (items[i - 1]) {
  //           items[i - 1].classList.remove('fixed');
  //           items[i - 1].classList.add('absolute-top');
  //         }
  //       } else {
  //       }
  //       if (topOffset >= 0 && topOffset < 60 && i === items.length - 1) {
  //         items.forEach(item => {
  //           item.classList.remove('static');
  //           item.classList.add('fixed');
  //         });

  //         items[i].classList.add('absolute-bottom');
  //         items[i].classList.remove('static');
  //         items[i].classList.remove('fixed');
  //       }
  //     }
  //   } else {
  //     for (let i = 0; i < items.length; i++) {
  //       const topOffset = items[i].getBoundingClientRect().top;
  //       const bottomOffset = items[i].getBoundingClientRect().bottom;

  //       if (topOffset <= 0 && bottomOffset >= window.innerHeight) {
  //         if (i < items.length - 1) {
  //           items[i].classList.add('fixed');
  //           items[i].classList.add('changed-background');
  //           items[i].classList.remove('absolute');
  //         } else {
  //           items.forEach(item => {
  //             item.classList.add('static');
  //             item.classList.remove('absolute-top');
  //             item.classList.remove('absolute-bottom');
  //             item.classList.remove('fixed');

  //             item.classList.remove('absolute');
  //           });
  //         }
  //       }
  //     }
  //   }
  // });

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

  //grey background for cases

  // const allCaseItems = document.querySelectorAll('.cases__item');
  // if (allCaseItems.length) {
  //   allCaseItems.forEach(item => {
  //     if (!item.classList.contains('cases__item--guides')) {
  //       item.addEventListener('click', e => {
  //         item.classList.toggle('changed-background');
  //       });
  //     }
  //   });
  // }
});
