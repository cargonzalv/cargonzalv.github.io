  "use strict"; // Start of use strict

  
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
    }
  });


  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 48
  });

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
    var elems = $(".sr-icons");
    if (elems.hasClass('active'))
      return;

    if (isElementInViewport(elems)) {
          // Start the animation
          elems.each(function(index){
            $(this).delay(index*200).queue(function(nxt) {
              $(this).addClass('active');
              nxt();
            })
          });
        }
      });


  function isElementInViewport(elem) {
    var $elem = $(elem);

      // Get the scroll position of the page.
      var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
      var viewportTop = $(scrollElem).scrollTop();
      var viewportBottom = viewportTop + $(window).height();

      // Get the position of the element on the page.
      var elemTop = Math.round( $elem.offset().top );
      var elemBottom = elemTop + $elem.height();

      return ((1338 < viewportBottom) && (1438 > viewportTop));
    }


