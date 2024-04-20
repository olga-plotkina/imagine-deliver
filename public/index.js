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

  let coveringIndex = -1;

  window.addEventListener('scroll', function () {
    const items = document.querySelectorAll('.cases__item');
    const windowHeight = window.innerHeight;

    // Check if the top of each item touches the top of the viewport
    const itemRects = Array.from(items).map(item =>
      item.getBoundingClientRect()
    );
    const itemTops = itemRects.map(rect => rect.top <= 0);

    // Start covering animation when the second item touches the top
    if (itemTops[1]) {
      coveringIndex = 1;
    }

    // Add 'covering' class to the next item to be covered
    if (
      coveringIndex >= 0 &&
      coveringIndex < items.length - 1 &&
      itemTops[coveringIndex + 1]
    ) {
      items[coveringIndex + 1].classList.add('covering');
      coveringIndex++;
    }
  });
});
