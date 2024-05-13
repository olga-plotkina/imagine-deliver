import './css/common.scss';

import PhotoSwipeLightbox from '/node_modules/photoswipe/dist/photoswipe-lightbox.esm.js';
import PhotoSwipe from '/node_modules/photoswipe/dist/photoswipe.esm.js';
import Swiper from 'swiper/bundle';
import Scrollbar from 'smooth-scrollbar';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger
import { TimelineMax } from 'gsap';
import NiceSelect from 'nice-select2';

// const lenis = new Lenis();

// import styles bundle
import 'swiper/css/bundle';

import {
  Navigation,
  Pagination,
  Manipulation,
  Thumbs,
  FreeMode,
} from 'swiper/modules';
// import { forEach } from 'lodash';
import { Timeline } from 'gsap/gsap-core';

document.addEventListener('DOMContentLoaded', () => {
  //   const lightbox = new PhotoSwipeLightbox({
  //     gallery: '.features__images-swiper .swiper-wrapper',
  //     children: 'a',
  //     pswpModule: PhotoSwipe,
  //   });

  //   lightbox.init();
  const mobileSwiperContainers = document.querySelectorAll(
    '.features__mobile-swipers'
  );

  if (mobileSwiperContainers.length) {
    mobileSwiperContainers.forEach(container => {
      console.log(container);
      const featuresSwiperContainer = container.querySelector(
        '.features__images-swiper'
      );
      const featuresContentSwiperContainer = container.querySelector(
        '.features__content-swiper'
      );
      const featuresContentSwiper = new Swiper(featuresContentSwiperContainer, {
        loop: true,
        slidesPerView: 1,
        modules: [Navigation, Pagination, Thumbs, FreeMode, Manipulation],
        pagination: {
          el: '.features__content-swiper .swiper-pagination',
          clickable: true,
        },
        speed: 800,
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
      });

      featuresContentSwiper.controller.control = featuresSwiper;
      featuresSwiper.controller.control = featuresContentSwiper;
    });
  }

  //feature slider and titles

  const bigTitlesContainers = document.querySelectorAll('.features__container');
  if (bigTitlesContainers.length) {
    bigTitlesContainers.forEach(container => {
      const featureTitles = [
        ...container.querySelectorAll('.features__big-titles h3'),
      ];
      const featureSlides = container.querySelectorAll(
        '.features__right-wrapper .feature__desktop-slide'
      );
      let lastHoveredTitle = container.querySelector(
        '.features__big-titles h3.accent'
      );
      let lastHoveredSlide = container.querySelector(
        '.features__right-wrapper .feature__desktop-slide.is-shown'
      );
      let autoToggleTimer;

      startAutoToggleTimer(container);

      function startAutoToggleTimer(container) {
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

          const relevantSlide = container.querySelector(
            `.feature__desktop-slide[data-id="${dataId}"]`
          );

          relevantSlide.classList.add('is-shown');
          lastHoveredSlide = relevantSlide;
        }, 3000);
      }

      featureTitles.forEach(title => {
        const titleHeight = title.clientHeight;

        const overlayHeight = titleHeight * 0.8; // Adjust as needed
        const overlayTop = (titleHeight - overlayHeight) / 2;

        const overlay = document.createElement('div');
        overlay.classList.add('title-overlay');
        overlay.style.position = `absolute`;

        overlay.style.top = `${overlayTop}px`;
        overlay.style.left = `0`;

        overlay.style.height = `${overlayHeight}px`;
        overlay.style.width = `25vw`;

        title.appendChild(overlay);

        overlay.addEventListener('mouseover', e => {
          const dataId = title.textContent.trim().toLowerCase();
          const relevantSlide = container.querySelector(
            `.feature__desktop-slide[data-id="${dataId}"]`
          );
          featureTitles.forEach(t => t.classList.remove('accent'));
          featureSlides.forEach(slide => slide.classList.remove('is-shown'));
          title.classList.add('accent');
          relevantSlide.classList.add('is-shown');
          lastHoveredTitle = title;
          lastHoveredSlide = relevantSlide;
          if (autoToggleTimer) {
            clearInterval(autoToggleTimer);
          }
        });
        overlay.addEventListener('mouseleave', e => {
          startAutoToggleTimer(container);
        });
      });
    });
  }

  //cases animation

  const items = document.querySelectorAll('.cases__item');
  const itemContainerHome = document.getElementById('home-cases');

  if (itemContainerHome) {
    window.addEventListener('scroll', onScroll, false);

    //Get all the section reference
    var sectionOne = document.querySelector('.features');
    var sectionTwo = document.querySelector('#case-1');
    const sectionTwoContainer = sectionTwo.querySelector('.cases__container');
    var sectionThree = document.querySelector('#case-2');
    const sectionThreeContainer =
      sectionThree.querySelector('cases__container');
    var sectionFourth = document.querySelector('#case-3');
    const sectionFourContainer =
      sectionFourth.querySelector('cases__container');
    var sectionFifth = document.querySelector('#case-4');
    var sectionSix = document.querySelector('.insights');
    //Calculate their individual height
    var SectionOneHeight = getComputedStyle(sectionOne).height.split('px')[0];
    var SectionTwoHeight = getComputedStyle(sectionTwo).height.split('px')[0];
    var SectionThreeHeight =
      getComputedStyle(sectionThree).height.split('px')[0];
    var SectionFourthHeight =
      getComputedStyle(sectionFourth).height.split('px')[0];
    var SectionFifthHeight =
      getComputedStyle(sectionFifth).height.split('px')[0];

    //calculate the checkpoint where item need to be modified
    var checkPointTwo = sectionTwo.getBoundingClientRect().top;
    var checkPointThree = sectionThree.getBoundingClientRect().top;

    var checkPointFourth = sectionFourth.getBoundingClientRect().top;

    var checkPointFifth = sectionFifth.getBoundingClientRect().top;

    // Load the saved state of each section from local storage
    var savedSectionStates =
      JSON.parse(localStorage.getItem('sectionStates')) || {};
    if (savedSectionStates) {
      applySavedSectionStates(savedSectionStates);
    }
    //Scroll logic
    function onScroll() {
      var scrollBarPosition = window.pageYOffset;

      // Store the current state of each section in local storage
      localStorage.setItem('sectionStates', JSON.stringify(sectionStates));

      if (scrollBarPosition >= 0 && scrollBarPosition < checkPointTwo) {
        removeClass(sectionTwo, sectionThree);
        // removeBackground(sectionTwo);
        // removeBackground(sectionThree);
        // removeBackground(sectionFourth);
      } else if (
        window.pageYOffset >= checkPointTwo &&
        window.pageYOffset < checkPointThree
      ) {
        addClass(sectionTwo);
        // addBackground(sectionTwo);
        // removeBackground(sectionThree);
      } else if (
        window.pageYOffset >= checkPointThree &&
        window.pageYOffset < checkPointFourth
      ) {
        addClass(sectionThree);
        // addBackground(sectionThree);
        // removeBackground(sectionFourth);
      } else if (
        window.pageYOffset >= checkPointFourth &&
        window.pageYOffset < checkPointFifth
      ) {
        addClass(sectionFourth);
        // addBackground(sectionFourth);
      }
      // else if (scrollBarPosition === 0) {
      //   removeBackground(sectionTwo);
      //   removeBackground(sectionThree);
      //   removeBackground(sectionFourth);
      // }

      // Check if each section is fixed or absolute
      var sectionStates = {
        sectionTwo: isSectionFixed(sectionTwo),
        sectionThree: isSectionFixed(sectionThree),
        sectionFourth: isSectionFixed(sectionFourth),
        sectionFifth: isSectionFixed(sectionFifth),
      };

      localStorage.setItem('sectionStates', JSON.stringify(sectionStates));
    }
    // Function to check if a section is fixed
    function isSectionFixed(section) {
      return section.classList.contains('fixed');
    }
    // Function to apply saved section states
    function applySavedSectionStates(savedSectionStates) {
      if (savedSectionStates.sectionTwo) {
        sectionTwo.classList.add('fixed');
      }
      if (savedSectionStates.sectionThree) {
        sectionThree.classList.add('fixed');
      }
      if (savedSectionStates.sectionFourth) {
        sectionFourth.classList.add('fixed');
      }
      if (savedSectionStates.sectionFifth) {
        sectionFifth.classList.add('fixed');
      }
    }
    function addClass(elemOne) {
      elemOne.classList.add('fixed');
    }
    function addAbs(elemOne, margin) {
      elemOne.style.top = margin + 'px';
      elemOne.style.position = 'absolute';
    }
    // function addBackground(elem) {
    //   elem.classList.add('background-grey');
    // }

    // function removeBackground(elem) {
    //   elem.classList.remove('background-grey');
    // }
    function removeClass(elemOne, elemTwo) {
      elemOne.classList.remove('fixed');
      elemTwo.classList.remove('absolute');
    }

    [sectionTwo, sectionThree, sectionFourth, sectionFifth].forEach(section => {
      section.addEventListener('transitionend', () => {
        onScroll();
      });
    });
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
  }

  //burger menu
  const sideMenuItems = document.querySelectorAll(
    '.burger-menu__sidemenu [data-id]'
  );
  const mainMenuItems = document.querySelectorAll('.burger-menu__main >li');
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

  const menuLinks = document.querySelectorAll('.burger-menu__main  > li > a');
  if (window.matchMedia('(max-width: 768px)').matches) {
    menuLinks.forEach(link => {
      if (link.parentElement.id !== 'menu-item-61') {
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
      }
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
      const dataId = this.getAttribute('id');
      sideMenuItems.forEach(item => {
        if (item.getAttribute('data-id') === dataId) {
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
      return node.textContent
        .split(' ')
        .map(word => {
          if (word) {
            const letters = word
              .split('')
              .map(letter => {
                if (letter !== '') {
                  return `<span class="letter">${letter}</span>`;
                }
              })
              .join('');
            return `<div class="word">${letters} </div>`;
          }
        })
        .join(' ');
    };

    element.childNodes.forEach(child => {
      if (child.textContent) {
        listText.push(wrapTextNodes(child));
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
  // function throttle(func, delay) {
  //   let lastCall = 0;
  //   return function (...args) {
  //     const now = new Date().getTime();
  //     if (now - lastCall < delay) {
  //       return;
  //     }
  //     lastCall = now;
  //     func(...args);
  //   };
  // }

  // const tickerContainers = document.querySelectorAll('.ticker__content');

  // tickerContainers.forEach(container => {
  //   let lastScrollTop = 0;

  //   // Function to handle scroll ticker events
  //   function handleScroll() {
  //     const scrollTop =
  //       window.pageYOffset || document.documentElement.scrollTop;

  //     if (scrollTop > lastScrollTop) {
  //       if (container.parentElement.classList.contains('ticker--features')) {
  //         container.style.animationDuration = '10s';
  //         container.style.animationDirection = 'normal';

  //         setTimeout(() => {
  //           container.style.animationDuration = '17s';
  //           container.style.animationDirection = 'normal';
  //         }, 500);
  //       }
  //       if (container.parentElement.classList.contains('ticker--air-date')) {
  //         container.style.animationDuration = '16s';
  //         container.style.animationDirection = 'normal';

  //         setTimeout(() => {
  //           container.style.animationDuration = '17s';
  //           container.style.animationDirection = 'normal';
  //         }, 500);
  //       }
  //     } else {
  //       if (container.parentElement.classList.contains('ticker--features')) {
  //         container.style.animationDirection = 'reverse';
  //         container.style.animationDuration = '20s';

  //         // After 1 second, revert the animation direction to normal
  //         setTimeout(() => {
  //           container.style.animationDirection = 'normal';
  //           container.style.animationDuration = '17s';
  //         }, 500);
  //       }
  //       if (container.parentElement.classList.contains('ticker--air-date')) {
  //         container.style.animationDirection = 'reverse';
  //         container.style.animationDuration = '18s';

  //         // After 1 second, revert the animation direction to normal
  //         setTimeout(() => {
  //           container.style.animationDirection = 'normal';
  //           container.style.animationDuration = '17s';
  //         }, 500);
  //       }
  //     }

  //     // Update the last scroll position
  //     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  //   }
  //   const throttledScroll = throttle(handleScroll, 1000);
  //   // Add scroll event listener
  //   window.addEventListener('scroll', throttledScroll);
  // });

  //gsap ticker

  // gsap.registerEffect({
  //   name: 'ticker',
  //   effect(targets, config) {
  //     buildTickers({
  //       targets: targets,
  //       clone:
  //         config.clone ||
  //         (el => {
  //           let clone = el.children[0].cloneNode(true);
  //           el.insertBefore(clone, el.children[0]);
  //           return clone;
  //         }),
  //     });
  //     function buildTickers(config, originals) {
  //       let tickers;
  //       if (originals && originals.clones) {
  //         // on window resizes, we should delete the old clones and reset the widths
  //         originals.clones.forEach(
  //           el => el && el.parentNode && el.parentNode.removeChild(el)
  //         );
  //         originals.forEach((el, i) =>
  //           originals.inlineWidths[i]
  //             ? (el.style.width = originals.inlineWidths[i])
  //             : el.style.removeProperty('width')
  //         );
  //         tickers = originals;
  //       } else {
  //         tickers = config.targets;
  //       }
  //       const clones = (tickers.clones = []),
  //         inlineWidths = (tickers.inlineWidths = []);
  //       tickers.forEach((el, index) => {
  //         // Set the width of the ticker section to match the screen width
  //         el.style.width = '100vw';
  //         el.children[0].style.display = 'inline-block';
  //         let width = el.children[0].offsetWidth,
  //           cloneCount = Math.ceil(window.innerWidth / width),
  //           right = el.dataset.direction === 'right',
  //           i;
  //         el.style.width = width * (cloneCount + 1) + 'px';
  //         for (i = 0; i < cloneCount; i++) {
  //           clones.push(config.clone(el));
  //         }
  //         gsap.fromTo(
  //           el,
  //           {
  //             x: right ? -width : 0,
  //           },
  //           {
  //             x: right ? 0 : -width,
  //             duration: width / 100 / parseFloat(el.dataset.speed || 1),
  //             repeat: -1,
  //             overwrite: 'auto',
  //             ease: 'none',
  //           }
  //         );
  //       });
  //       originals ||
  //         window.addEventListener('resize', () =>
  //           buildTickers(config, tickers)
  //         );
  //     }
  //   },
  // });

  // gsap.effects.ticker('.ticker-section');

  ////

  // gsap.registerPlugin(ScrollTrigger);
  // gsap.registerPlugin(TimelineMax);
  // const timeline = gsap.timeline();

  // const lenis = new Lenis();

  // lenis.on('scroll', e => {
  //   ScrollTrigger.update();
  // });

  // lenis.on('scroll', ScrollTrigger.update);

  // gsap.ticker.add(time => {
  //   lenis.raf(time * 1000);
  // });

  // gsap.ticker.lagSmoothing(0);

  // ScrollTrigger.create({
  //   trigger: '.ticker-section',
  //   start: 'top top',
  //   end: 'bottom bottom',
  //   scrub: true,
  //   onUpdate: self => {
  //     const scrollDirection = self.direction === 1 ? 1 : -1;
  //     const reverseDuration = 0.5; // Duration for reverse animation

  //     // Reverse animation when scrolling up
  //     if (scrollDirection === 1) {
  //       timeline.to('.ticker-section', {
  //         duration: reverseDuration,
  //         onComplete: () => gsap.to('.ticker-section'),
  //       });
  //     }
  //   },
  // });

  // if you want to customize the cloning process, you can define a function that'll be passed the target and you do the cloning and return the element from the function:
  // gsap.effects.ticker(".hero__ticker-init", {
  //   clone: el => {
  //     const list = el.querySelector("ul");
  //     const clone = list.cloneNode(true);
  //     list.parentNode.insertBefore(clone, list.prevSibling);
  //     return clone;
  //   }
  // });

  //team members modal

  const membersData = [
    {
      name: 'Kate Downing Khaled',
      position: 'Founder, Managing Director',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Kate.jpg',
      info: '<p>Kate is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Taqee Khaled',
      position: 'Co-Founder, Advisor',
      pronounce: 'He/His/Him',
      src: './images/img/ID-team-Taqee.jpg',
      info: '<p>Taqee is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Tiffany Xiong',
      position: 'Head of Growth & Operations',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Tiffany.jpg',
      info: '<p>Tiffany is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Johnna White',
      position: 'Principal Strategist',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Johnna.jpg',
      info: '<p>Johnna is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Monica Cruz-Zorilla',
      position: 'Principal Strategist',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Monica.jpg',
      info: '<p>Monica is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Sami Milliren',
      position: 'Executive & Special Projects Coordinator',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Sami.jpg',
      info: '<p>Sami is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Jenny Tam',
      position: 'Strategy Consultant',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Jenny.jpg',
      info: '<p>Jenny is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Chiamaka Gabrielle Ifedi',
      position: 'Associate Strategist',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Chiamaka.jpg',
      info: '<p>Chiamaka is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Matilda Chang',
      position: 'Digital Strategist',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Matilda.jpg',
      info: '<p>Matilda is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Fatima Mubarak',
      position: 'Senior Growth & Operations Manager',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Fatima.jpg',
      info: '<p>Fatima is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Allie Palmer',
      position: 'Strategy Consultant',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Allie.jpg',
      info: '<p>Allie is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
    {
      name: 'Amina Mohamed',
      position: 'Senior Strategy Consultant',
      pronounce: 'She/Her/Hers',
      src: './images/img/ID-team-Amina.jpg',
      info: '<p>Amina is the kind of leader who will believe in you even when you don’t believe in yourself. As a strategist and former community organizer, she’s an expert at listening to teams and leading them in transformative directions. She has the uncanny ability to see beyond the limitations others place on themselves to spot brilliance in the people around her. With nearly two decades of experience in philanthropy, community-based research and human-centered design, Kate knows the best services and products are designed by the people who use them. Named a Minneapolis And Saint Paul Business Journal 40 Under 40 Honoree and Tech 20 in 2022, Kate founded Imagine Deliver because she routinely saw systems operating in ways that excluded people from problem solving rather than meaningfully including them.</p> <p>As Imagine Deliver’s managing director, Kate helps bold, intersectional leaders across healthcare, government, philanthropy, and financial services sectors eliminate that disconnect by showing them how to tap </p>',
    },
  ];
  const teamGalleryContainer = document.querySelector('.js-team-gallery');

  const teamMemberModal = document.getElementById('team-memeber-modal');
  const closeModalButtonsArray = document.querySelectorAll(
    '.modal__close-button'
  );
  const modalsArray = document.querySelectorAll('.modal');

  if (modalsArray.length) {
    modalsArray.forEach(modal => {
      modal.addEventListener('click', e => {
        if (e.target === e.currentTarget) {
          modal.classList.add('is-hidden');
          document.body.classList.remove('modal-open');
        }
      });
    });
  }
  if (closeModalButtonsArray.length) {
    closeModalButtonsArray.forEach(button => {
      const closestModal = button.closest('.modal');
      button.addEventListener('click', e => {
        closestModal.classList.add('is-hidden');
        document.body.classList.remove('modal-open');
      });
    });
  }
  if (teamGalleryContainer && teamMemberModal) {
    // const memberPicture = teamMemberCard.querySelector(
    //   '.team-member__image-wrapper img'
    // );
    // const memberContent = teamMemberCard.querySelector('.team-member__content');
    // const memberName = teamMemberCard.querySelector('.team-member__name');
    // const memberPosition = teamMemberCard.querySelector(
    //   '.team-member__position'
    // );
    // const memberPronounce = teamMemberCard.querySelector(
    //   '.team-member__pronounce'
    // );
    const membersCardArray = teamMemberModal.querySelectorAll('.team-member');
    const teamMembersArray = teamGalleryContainer.querySelectorAll(
      '.case-gallery__item'
    );
    if (teamMembersArray.length) {
      teamMembersArray.forEach(member => {
        const openModalButton = member.querySelector('.js-open-modal-button');

        openModalButton.addEventListener('click', e => {
          teamMemberModal.classList.remove('is-hidden');
          document.body.classList.add('modal-open');
          membersCardArray.forEach(card => {
            card.style.display = 'none';
            if (card.id === member.dataset.id) {
              card.style.display = 'block';
            }
          });
        });
      });
    }
  }

  var selectElement = document.getElementById('cases-filter');
  var niceSelectContainer = document.querySelector('.nice-select    ');
  var filterWrapper = document.querySelector('.hero__clear-filter-wrapper');

  if (selectElement) {
    new NiceSelect(selectElement, { searchable: true });

    selectElement.addEventListener('change', function () {
      filterWrapper.classList.remove('is-hidden');
    });
  }

  // const lenis = new Lenis();
  // lenis.on('scroll', e => {
  //   console.log(e);
  // });

  // function raf(time) {
  //   lenis.raf(time);
  //   requestAnimationFrame(raf);
  // }

  // requestAnimationFrame(raf);

  // const tickerContainer = document.querySelectorAll('.ticker__content');

  // tickerContainer.forEach(container => {
  //   // Define the base animation duration

  //   let baseDuration;
  //   let temporaryDuration;
  //   if (container.parentElement.classList.contains('ticker--air-date')) {
  //     baseDuration = 5;
  //     temporaryDuration = 4;
  //   } else {
  //     baseDuration = 5;
  //     temporaryDuration = 4;
  //   }

  //   let timeoutID; // Initialize timeoutID here

  //   // Listen for scroll events on the window
  //   window.addEventListener('scroll', () => {
  //     // Get the scroll position of the ticker container relative to the viewport
  //     const tickerRect = container.getBoundingClientRect();
  //     const tickerTop = tickerRect.top;
  //     const tickerBottom = tickerRect.bottom;

  //     // Calculate the percentage of the ticker container visible in the viewport
  //     const viewportHeight = window.innerHeight;
  //     let visiblePercentage;
  //     if (container.parentElement.classList.contains('ticker--air-date')) {
  //       visiblePercentage = Math.min(
  //         Math.max(0, (viewportHeight - tickerTop) / 1000),
  //         1
  //       );
  //     } else {
  //       visiblePercentage = Math.min(
  //         Math.max(0, (viewportHeight - tickerTop) / 600),
  //         1
  //       );
  //     }

  //     // Calculate the new animation duration based on the visible percentage
  //     const newDuration = baseDuration / visiblePercentage;

  //     // Apply the new animation duration to the ticker container
  //     container.style.animationDuration = `${newDuration}s`;

  //     // Reset the animation duration to the default value after a certain period
  //     if (timeoutID) clearTimeout(timeoutID);
  //     timeoutID = setTimeout(() => {
  //       container.style.animationDuration = `${baseDuration}s`;
  //     }, temporaryDuration * 1000); // Convert seconds to milliseconds
  //   });

  //   // Start the Lenis animation loop
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  // });
});
