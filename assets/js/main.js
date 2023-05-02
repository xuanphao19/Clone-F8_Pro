(function () {
  ("use strict");
  //e.stopPropagation();
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
      responsiveVoice.speak("Chào mừng bạn đến với F8, fullstack chấm edu chấm vn", "Vietnamese Female");
    });
  }
  const glightbox = GLightbox({
    selector: ".glightbox",
  });

  const portfolioLightbox = GLightbox({
    selector: ".Xuan_Phao",
  });
  new Swiper(".hero_slider", {
    spaceBetween: 5,
    centeredSlides: true,
    speed: 1600,
    loop: true,
    autoplay: {
      delay: 5500,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  const phaoThu = GLightbox({
    selector: ".phaoThu",
  });

  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
