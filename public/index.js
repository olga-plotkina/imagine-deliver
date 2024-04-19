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
});