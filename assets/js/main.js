(function () {
  ("use strict");
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };
  
 on(
   "click",
   ".scrollto",
   function (e) {
     if (select(this.hash)) {
       e.preventDefault();
       let navbar = select("#navbar");
       if (navbar.classList.contains("navbar-mobile")) {
         navbar.classList.remove("navbar-mobile");
         let navbarToggle = select(".mobile-nav-toggle");
         navbarToggle.classList.toggle("bi-list");
         navbarToggle.classList.toggle("bi-x");
       }
       scrollto(this.hash);
     }
   },
   true,
 );

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
  new Swiper(".testimonials-slider", {
    spaceBetween: 5,
    centeredSlides: true,
    speed: 600,
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

  // Portfolio details slider
  const portfolioLightbox = GLightbox({
    selector: ".Xuan_Phao",
  });
  new Swiper(".portfolio-details-slider", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  // Family Photo slider
  const familyPhoto = GLightbox({
    selector: ".Thanh_Hoa",
  });
  new Swiper(".thu_Trang", {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 500,
      disableOnInteraction: false,
    },
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
