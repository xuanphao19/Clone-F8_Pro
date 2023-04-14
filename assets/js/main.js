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
    });
  }
  const glightbox = GLightbox({
    selector: ".glightbox",
    //   Multiple data attributes / You can use the options as separated data attributes
    // <a
    //   class="glightbox || 1 - n"            Lớp. (Bộ chọn CSS = true)
    //   href="large.jpg"                      tiêu đề
    //   data-title="My title"                 thay thế
    //   data-description="description here"   Sự miêu tả
    //   data-desc-position="right"            mô tảVị trí
    //   data-type="image"                     kiểu
    //   data-effect="fade"                    tác dụng
    //   data-width="900px"                    chiều rộng
    //   data-height="auto"                    chiều cao
    //   data-zoomable="true"                  có thể phóng to
    //   data-draggable="true"                 có thể kéo được
    // ></a>
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

  // new Swiper(".recommend_slider", {
  //   // direction: "mặc định horizontal || auto; 'vertical === Thẳng đứng'",
  //   /*    effect: "fade",
  //   fadeEffect: { crossFade: true, }, Hiệu ứng mờ */
  //   // breakpointBase: "container",
  //   // centeredSlides: true,
  //   slidesPerView: 4,
  //   spaceBetween: 15,
  //   centeredSlides: false,
  //   speed: 4500,
  //   loop: true,
  //   autoplay: {
  //     delay: 1500,
  //     disableOnInteraction: false,
  //   },
  //   breakpoints: {
  //     // 480: {//   slidesPerView: 2, //   spaceBetween: 10, // },
  //     // 640: { //   slidesPerView: 3, //   spaceBetween: 10, // },
  //     // // when window width is >= 820px Ok cái này hay!
  //     // 820: { //   slidesPerView: 4, //   spaceBetween: 15, // },
  //   },
  // });

  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });
})();
