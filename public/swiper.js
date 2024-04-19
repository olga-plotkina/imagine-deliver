// css import separately
import Swiper from 'swiper';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

const settings = {
  team: {
    loop: true,
    slidesPerView: 1,
    autoplay: {
      delay: 4200,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  },
  reviews: {
    loop: true,
    slidesPerView: 1,
    autoHeight: true,
    autoplay: {
      delay: 3700,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        autoHeight: false,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  },
};

function loaderInit(elements) {
  window.swiperSliders = {};

  elements.forEach(element => {
    const swiperBlock = element.closest('[data-swiper-block]');
    const sliderName = element.dataset.swiperSlider;
    const config = settings[sliderName];
    const prev = swiperBlock.querySelector('.js-slider-prev');
    const next = swiperBlock.querySelector('.js-slider-next');
    const pagination = swiperBlock.querySelector('.slider-pagination');

    config['modules'] = [Navigation, Autoplay, Pagination];

    config['navigation'] = {
      prevEl: prev,
      nextEl: next,
    };

    config['pagination'] = {
      el: pagination,
    };

    window.swiperSliders[sliderName] = new Swiper(element, config); // eslint-disable-line no-unused-vars
  });
}

export { loaderInit };
