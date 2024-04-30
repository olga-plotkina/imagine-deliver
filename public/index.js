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
  const featuresSwiperContainer = document.querySelectorAll(
    '.features__images-swiper'
  );
  const featuresContentSwiperContainer = document.querySelectorAll(
    '.features__content-swiper'
  );
  featuresContentSwiperContainer.forEach(container => {
    const featuresContentSwiper = new Swiper(container, {
      loop: true,
      slidesPerView: 1,
      modules: [Navigation, Pagination, Thumbs, FreeMode, Manipulation],
      pagination: {
        el: '.features__content-swiper .swiper-pagination',
        clickable: true,
      },
      speed: 800,
      allowTouchMove: false,
    });
    const featuresSwiper = new Swiper(featuresSwiperContainer, {
      loop: true,
      slidesPerView: 1,
      modules: [Navigation, Pagination, Thumbs, FreeMode, Manipulation],
      pagination: {
        el: '.features__images-swiper .swiper-pagination',
        clickable: true,
      },
      speed: 800,
      controller: {
        control: featuresContentSwiper, // Connect featuresSwiper as controller
      },
    });

    if (featuresSwiperContainer) featuresSwiper.init();

    if (featuresContentSwiperContainer) featuresContentSwiper.init();
  });
  //feature slider and titles

  const featureTitles = [
    ...document.querySelectorAll('.features__big-titles h3'),
  ];
  let lastHoveredTitle = document.querySelector(
    '.features__big-titles h3.accent'
  );
  let lastHoveredSlide = document.querySelector(
    '.features__right-wrapper .feature__desktop-slide.is-shown'
  );
  let autoToggleTimer;

  const featureSlides = document.querySelectorAll(
    '.features__right-wrapper .feature__desktop-slide'
  );

  featureTitles.forEach(title => {
    title.addEventListener('mouseenter', function () {
      featureTitles.forEach(t => t.classList.remove('accent'));
      featureSlides.forEach(slide => slide.classList.remove('is-shown'));

      this.classList.add('accent');
      lastHoveredTitle = this;

      const dataId = this.textContent.trim().toLowerCase();
      const relevantSlide = document.querySelector(
        `.feature__desktop-slide[data-id="${dataId}"]`
      );

      relevantSlide.classList.add('is-shown');
      lastHoveredSlide = relevantSlide;

      clearInterval(autoToggleTimer);

      autoToggleTimer = setInterval(() => {
        const currentIndex = featureTitles.findIndex(
          title => title === lastHoveredTitle
        );
        const nextIndex = (currentIndex + 1) % featureTitles.length;
        const nextTitle = featureTitles[nextIndex];

        featureTitles.forEach(t => t.classList.remove('accent'));
        featureSlides.forEach(slide => slide.classList.remove('is-shown'));

        nextTitle.classList.add('accent');
        lastHoveredTitle = nextTitle;

        const dataId = nextTitle.textContent.trim().toLowerCase();
        const relevantSlide = document.querySelector(
          `.feature__desktop-slide[data-id="${dataId}"]`
        );

        relevantSlide.classList.add('is-shown');
        lastHoveredSlide = relevantSlide;
      }, 3000);
    });
  });

  autoToggleTimer = setInterval(() => {
    const currentIndex = featureTitles.findIndex(
      title => title === lastHoveredTitle
    );
    const nextIndex = (currentIndex + 1) % featureTitles.length;
    const nextTitle = featureTitles[nextIndex];

    featureTitles.forEach(t => t.classList.remove('accent'));
    featureSlides.forEach(slide => slide.classList.remove('is-shown'));

    nextTitle.classList.add('accent');
    lastHoveredTitle = nextTitle;

    const dataId = nextTitle.textContent.trim().toLowerCase();
    const relevantSlide = document.querySelector(
      `.feature__desktop-slide[data-id="${dataId}"]`
    );

    relevantSlide.classList.add('is-shown');
    lastHoveredSlide = relevantSlide;
  }, 3000);

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

  //parallax

  const parallaxContainers = document.querySelectorAll('.container');

  parallaxContainers.forEach(container => {
    const parallax = container.querySelectorAll('.parallax');
    const parallax1 = container.querySelectorAll('.parallax1');
    const parallax2 = container.querySelectorAll('.parallax2');

    window.addEventListener(
      'scroll',
      () => {
        const coordinateY = container.getBoundingClientRect();
        if (coordinateY.top <= 100) {
          parallax.forEach(img => {
            const amount = Math.round(coordinateY.top * 0.1);
            img.style.transform = 'translateY(' + amount + 'px)';
            img.style.transition = 'transform 0.5s linear';
          });

          parallax1.forEach(img => {
            const amount = Math.round(coordinateY.top * 0.02);
            img.style.transform = 'translateY(' + amount + 'px)';
            img.style.transition = 'transform 0.5s linear';
          });

          parallax2.forEach(img => {
            const amount = Math.round(coordinateY.top * 0.04);
            img.style.transform = 'translateY(' + amount + 'px)';
            img.style.transition = 'transform 0.5s linear';
          });
        }
      },
      false
    );
  });

  document.querySelectorAll('div.splitText').forEach(element => {
    const listText = [];

    const wrapTextNodes = node => {
      if (node.textContent) {
        return node.textContent
          .trim()
          .split(' ')
          .map(word => {
            const letters = word
              .split('')
              .map(letter => {
                if (letter !== '') {
                  return `<span class="letter">${letter}</span>`;
                }
              })
              .join('');
            return `<div class="word">${letters}</div>`;
          })
          .join(' ');
      }
    };

    element.childNodes.forEach(child => {
      if (child.nodeName === '#text') {
        listText.push(wrapTextNodes(child));
      }
      if (child.tagName === 'BR') {
        listText.push(child.outerHTML);
      } else {
        child.innerHTML = wrapTextNodes(child);
        listText.push(child.outerHTML);
      }
    });

    element.innerHTML = listText.join('');

    // element.innerHTML = element.innerText
    //   .split(" ")
    //   .map((word) => {
    //     const letters = word
    //       .split("")
    //       .map((letter) => `<span class="letter">${letter}</span>`)
    //       .join("");
    //     return `<div class="word">${letters}</div>`;
    //   })
    //   .join(" ");

    element.querySelectorAll('.letter').forEach((letter, index) => {
      letter.style.transitionDelay = index * 0.03 + 's';
    });

    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const target = entry.target;
            target.classList.add('is-visible');
            observer.unobserve(target);
          }
        });
      },
      { rootMargin: '-10%' }
    ).observe(element);
  });

  // Select the ticker container
  function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
      const now = new Date().getTime();
      if (now - lastCall < delay) {
        return;
      }
      lastCall = now;
      func(...args);
    };
  }

  const tickerContainers = document.querySelectorAll('.ticker__content');

  tickerContainers.forEach(container => {
    let lastScrollTop = 0;

    // Function to handle scroll ticker events
    function handleScroll() {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        if (container.parentElement.classList.contains('ticker--features')) {
          container.style.animationDuration = '10s';
          container.style.animationDirection = 'normal';

          setTimeout(() => {
            container.style.animationDuration = '17s';
            container.style.animationDirection = 'normal';
          }, 500);
        }
        if (container.parentElement.classList.contains('ticker--air-date')) {
          container.style.animationDuration = '16s';
          container.style.animationDirection = 'normal';

          setTimeout(() => {
            container.style.animationDuration = '17s';
            container.style.animationDirection = 'normal';
          }, 500);
        }
      } else {
        if (container.parentElement.classList.contains('ticker--features')) {
          container.style.animationDirection = 'reverse';
          container.style.animationDuration = '20s';

          // After 1 second, revert the animation direction to normal
          setTimeout(() => {
            container.style.animationDirection = 'normal';
            container.style.animationDuration = '17s';
          }, 500);
        }
        if (container.parentElement.classList.contains('ticker--air-date')) {
          container.style.animationDirection = 'reverse';
          container.style.animationDuration = '18s';

          // After 1 second, revert the animation direction to normal
          setTimeout(() => {
            container.style.animationDirection = 'normal';
            container.style.animationDuration = '17s';
          }, 500);
        }
      }

      // Update the last scroll position
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
    }
    const throttledScroll = throttle(handleScroll, 1000);
    // Add scroll event listener
    window.addEventListener('scroll', throttledScroll);
  });
});
