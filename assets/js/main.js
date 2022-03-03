var error = "";
var paridad = -1;
var complemento = "";
var andResult = "";

(function() {
  "use strict";

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 16
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  // Libreria Swiper, es lo de las "opiniones de los clientes"
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 40
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  });
  
  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

})()

function bitParidad() {
    let value1 = document.forms["myForm"]["value1"].value;
    let unos = 0;
    paridad = -1;

        if(value1.length > 0) {
            for (let idx = 0; idx < value1.length; idx++) {
                if(value1.charAt(idx) != 1 && value1.charAt(idx) != 0) {
                    document.forms["myForm"]["value1"].classList.add("is-invalid");
                    error = "Error: Introduce un binario correcto. En el campo 1.";
                }
                
                if(value1.charAt(idx) == 1){
                    unos++;   
                }
            }
        } else {
            document.forms["myForm"]["value1"].classList.add("is-invalid");
            error = "Error: Introduce algun valor! En el campo 1.";
        }

        if(error == "") {
            if((unos % 2) == 0) {
                paridad = 0;
            } else {
                paridad = 1;
            }
            
        }

    }

    function complementoA1() {
        let value1 = document.forms["myForm"]["value1"].value;
        complemento = "";

        if(value1.length > 0){
            for (let idx = 0; idx < value1.length; idx++) {
                if(value1.charAt(idx) != 1 && value1.charAt(idx) != 0) {
                    document.forms["myForm"]["value1"].classList.add("is-invalid");
                    error = "Error: Introduce un binario correcto. En el campo 1.";
                }

                if(value1.charAt(idx) == 0) {
                    complemento = complemento + 1;
                } else {
                    complemento = complemento + 0;
                }
            }
        } else {
          document.forms["myForm"]["value1"].classList.add("is-invalid");
            error = "Error: Introduce algun valor! En el campo 1.";
        }

        if(error != ""){
            complemento = "";
        }

    }

    function and() {
        let value1 = document.forms["myForm"]["value1"].value;
        let value2 = document.forms["myForm"]["value2"].value;
        andResult = "";
        complemento = "";
        paridad = -1;

        if(value1.length > 0){
          if(value2.length > 0){

            if(value1.length > value2.length){
              let newValor = "";
              for (let i = 0; i < (value1.length - value2.length); i++) {
                newValor += "0";
                
              }
              newValor += document.forms["myForm"]["value2"].value;
              value2 = newValor;

            } else {
              let newValor = "";
              for (let i = 0; i < (value2.length - value1.length); i++) {
                newValor += "0";
                
              }

              newValor += document.forms["myForm"]["value1"].value;
              value1 = newValor;
            }

            for (let idx = 0; idx < value1.length; idx++) {
              if(value1.charAt(idx) != 1 && value1.charAt(idx) != 0) {
                  document.forms["myForm"]["value1"].classList.add("is-invalid");
                  error = "Error: Introduce un binario correcto. En el campo 1.";
              }

              if(value2.charAt(idx) != 0 && value2.charAt(idx) != 1) {
                document.forms["myForm"]["value2"].classList.add("is-invalid");
                error = "Error: Introduce un binario correcto. En el campo 2.";
              }

              andResult = andResult + (value1.charAt(idx) * value2.charAt(idx));
            }
          } else {
            document.forms["myForm"]["value2"].classList.add("is-invalid");
            error = "Error: Introduce algun valor! En el campo 2.";
          }
            
        } else {
            document.forms["myForm"]["value1"].classList.add("is-invalid");
            error = "Error: Introduce algun valor! En el campo 1.";
        }

        if(error != ""){
            andResult = "";
        }

    }

    function validateForm() {
        if(error != ""){
            document.getElementById("errores").innerHTML = error;
            document.getElementById("resultado").innerHTML = "";
            error = "";
            return false;
        } else {
            document.forms["myForm"]["value1"].classList.remove("is-invalid");
            document.forms["myForm"]["value2"].classList.remove("is-invalid");
            document.getElementById("errores").innerHTML = "";

            if(paridad != -1) {
                document.getElementById("resultado").innerHTML = "El bit de paridad es " + paridad;
                paridad = -1;
                return false;
            }

            if(complemento != "") {
                document.getElementById("resultado").innerHTML = "El complemento a 1 es: " + complemento;
                return false;
            }

            if(andResult != ""){
                document.getElementById("resultado").innerHTML = "La operacion AND es: " + andResult;
                return false;
            }
        }
        
    }