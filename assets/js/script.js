$(function () {

  // document.addEventListener("DOMContentLoaded", function () {
  //   const navLinks = document.querySelectorAll(".navbar-collapse .nav-link");
  //   const navbarCollapse = document.querySelector(".navbar-collapse");

  //   navLinks.forEach(function (link) {
  //     link.addEventListener("click", function () {
  //       if (navbarCollapse.classList.contains("show")) {
  //         // Bootstrap collapse method
  //         const collapseInstance = bootstrap.Collapse.getInstance(navbarCollapse);
  //         collapseInstance.hide();
  //       }
  //     });
  //   });
  // });


  // Inject layout meta/head links
  $.get("partials/layout-header.html", function (data) {
    $("head").append(data);
  });

  // Load header
$("#header").load("partials/header.html", function () {
  // Show after loading
  $("#header").css("display", "block").animate({ opacity: 1 }, 400);

  // Now inject config data
  $.getJSON("assets/data/site-config.json", function (config) {
    $(".site-name").text(config.clientName);
    $(".site-logo").attr("src", config.logo);
  });
});

// Load footer
$("#footer").load("partials/footer.html", function () {
  $("#footer").css("display", "block").animate({ opacity: 1 }, 400);

  $.getJSON("assets/data/site-config.json", function (config) {
    $("#footer-text").text(config.footerText);
    $("#contact-address").text(config.contact.address);
    $("#contact-phone").text(config.contact.phone);
    $("#contact-email").text(config.contact.email);
  });
});


  const navbar = document.querySelector('.navbar');

  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  const myCarousel = document.querySelector('#heroCarousel');
  const carousel = new bootstrap.Carousel(myCarousel, {
    interval: 4000,
    ride: 'carousel'
  });

  //Upcoming project
   const cards = document.querySelectorAll('.curved-card');
  const dots = document.querySelectorAll('.dot');
  const track = document.querySelector('#carousel-track');

  let total = cards.length;
  let current = 1; // Start from second card

  function scrollToCenter(card) {
    const offsetLeft = card.offsetLeft - track.offsetWidth / 2 + card.offsetWidth / 2;
    track.scrollTo({ left: offsetLeft, behavior: 'smooth' });
  }

  function updateCarousel(index) {
    cards.forEach((card, i) => {
      card.classList.remove('active', 'left-rotate', 'right-rotate');
      dots[i]?.classList.remove('active');

      if (i === index) {
        card.classList.add('active');
        dots[i]?.classList.add('active');
        scrollToCenter(card);
      } else if (i === index - 1) {
        card.classList.add('left-rotate');
      } else if (i === index + 1) {
        card.classList.add('right-rotate');
      }
    });
  }

  // Initialize on page load
  updateCarousel(current);

  // Auto slide every 4s
  let interval = setInterval(() => {
    current = (current + 1) % total;
    updateCarousel(current);
  }, 4000);

  // Manual dot click
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      current = parseInt(dot.getAttribute('data-index'));
      updateCarousel(current);
      clearInterval(interval); // Optional: stop auto-slide on manual click
    });
  });

  // Touch swipe support
  let startX = 0;
  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  track.addEventListener('touchend', e => {
    let endX = e.changedTouches[0].clientX;
    if (endX < startX - 50) {
      current = (current + 1) % total;
    } else if (endX > startX + 50) {
      current = (current - 1 + total) % total;
    }
    updateCarousel(current);
  });

  //Counter section
  const counters = document.querySelectorAll('.counter');

  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        let current = +counter.innerText.replace('+', '');
        const increment = Math.ceil(target / 100);

        if (current < target) {
          counter.innerText = current + increment+ '+';;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target+ '+';;
        }
      };
      updateCount();
    });
  };

  // Trigger only when in view
  const counterSection = document.querySelector('#counter-section');
  let animated = false;

  window.addEventListener('scroll', () => {
    const sectionTop = counterSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight && !animated) {
      animateCounters();
      animated = true;
    }
  });

  //testimonial
   const carousel1 = document.querySelector('#testimonialCarousel');
  const bsCarousel = new bootstrap.Carousel(carousel1, {
    interval: 5000,  // 5 seconds
    ride: 'carousel',
    pause: false
  });

  //project page
  // Get query param from URL

  //Contact
// document.getElementById("contact-form").addEventListener("submit", function () {
//   setTimeout(() => {
//     alert("Thank you for contacting us!");
//   }, 500); // Wait until submission starts
// });
});
