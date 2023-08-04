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

  const backtotop = ((sle) => {
    const el = select(sle);
    if (el)
      onscroll(document, () => {
        if (window.scrollY > 100) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
  })(".back-to-top");

  const preloader = ((sle) => {
    if (select(sle)) {
      window.addEventListener("load", () => {
        select(sle).remove();
      });
    }
  })("#preloader");

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
      pauseOnMouseEnter: true,
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
  document.addEventListener("DOMContentLoaded", function () {
    responsiveVoice.speak("Chào mừng bạn đến với F8, fullstack chấm edu chấm vn", "Vietnamese Female");
  });
  const gcse = ((sle) => {
    const gs = select(sle);
    if (gs) {
      gs.addEventListener(
        "click",
        (e) => {
          if (e.target.name === "search")
            responsiveVoice.speak("Xin mời nhập nội dung bạn cần tìm kiếm", "Vietnamese Female");
        } /*, {once: true} */,
      );
    }
  })(".Search_wrapper ");
})();
