'use strict';

/***** index page rotating plate *****/

var counter = 3;

$('.welcome-header-button__link').on('click', function() {
  if (counter % 2) {
    $('.welcome-main-container').removeClass('rotate180back').addClass('rotate180');
    $('.welcome-header-button').fadeOut(300);
    $('.welcome-block').fadeOut(350);
    setTimeout(function() {
    counter += 1;
    }, 600)
  }
});

$(document).on('click', (function (event) {
  var target = $(event.target);
  if ( (target.closest('.authorize-block').length == 0 || target.is('#return')) && !(counter % 2) ) {
    counter += 1;
    $('.welcome-main-container').removeClass('rotate180').addClass('rotate180back');
    $('.welcome-header-button').fadeIn(300);
    $('.welcome-block').fadeIn(300);
}}));


/***** blog page waypoints *****/
$(window).resize(function() {
  var blogSwitch = $('#blog-switch');

  if( blogSwitch.is(':checked') ) {
    blogSwitch.click();
  }
});

var waypointsDown = $('.blog-article').waypoint({
  handler: function(direction) {
    // if (direction == 'down' && ($( window ).width() >= 1200)) {
    if (direction == 'down') {
      var menuItem = $('.blog-menu__item'),
        hash = this.element.id;

      menuItem.removeClass('blog-menu__item_active');

      $.each(menuItem, function () {
        if ($(this).children('a').attr('href').slice(1) == hash) {
          $(this).addClass('blog-menu__item_active');
        }
      })
    }
  },
  offset: '50%'
});

var waypointsUp = $('.blog-article').waypoint({
  handler: function(direction) {
    // if (direction == 'up' && ($( window ).width() >= 1200)) {
    if (direction == 'up') {
      var menuItem = $('.blog-menu__item'),
        hash = this.element.id;

      menuItem.removeClass('blog-menu__item_active');

      $.each(menuItem, function () {
        if ($(this).children('a').attr('href').slice(1) == hash) {
          $(this).addClass('blog-menu__item_active');
        }
      })
    }
  },
  offset: '-1px'
});

var waymenu = $('.blog-menu').waypoint({
  handler: function(direction) {
    // if ( direction == 'down' && ($( window ).width() >= 1200) ) {
    if (direction == 'down') {
      $('.blog-menu').css({
        'position':'fixed'
      });
      $('.label-wrapper').css({
        'position':'fixed'
      });
    }
  }
});

var waymenuback = $('#wp-1').waypoint({
  handler: function(direction) {
    // if( direction == 'up' && ($( window ).width() >= 1200) ) {
    if (direction == 'up') {
      $('.blog-menu').css({
        'position':'absolute'
      });
      $('.label-wrapper').css({
        'position':'absolute'
      });
    }
  }
});

/***** about page svg-circles waypoints *****/

var circle = $('.skill-circle');

var circlesDown = circle.waypoint({
  handler: function(direction) {
    if (direction == 'down') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).addClass('skill-circle_' + percent);

    }
  },
  offset: '85%'
});

var circlesDownReset = circle.waypoint({
  handler: function(direction) {
    if (direction == 'down') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).removeClass('skill-circle_' + percent);

    }
  },
  offset: '-50px'
});

var circlesUp = circle.waypoint({
  handler: function(direction) {
    if (direction == 'up') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).addClass('skill-circle_' + percent);

    }
  },
  offset: '0'
});

var circlesUpReset = circle.waypoint({
  handler: function(direction) {
    if (direction == 'up') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).removeClass('skill-circle_' + percent);

    }
  },
  offset: '100%'
});

// var circles = function circlesAnimateTrigger() {
//   var circle = $('.skill-circle');
//
//   return {
//     circlesDown: circle.waypoint({
//       handler: function(direction) {
//         if (direction == 'down') {
//           var percent = this.element.getAttribute('data-percent');
//
//           $(this.element).addClass('skill-circle_' + percent);
//
//         }
//       },
//       offset: '85%'
//     }),
//
//     circlesDownReset: circle.waypoint({
//       handler: function(direction) {
//         if (direction == 'down') {
//           var percent = this.element.getAttribute('data-percent');
//
//           $(this.element).removeClass('skill-circle_' + percent);
//
//         }
//       },
//       offset: '-50px'
//     }),
//
//     circlesUp: circle.waypoint({
//       handler: function(direction) {
//         if (direction == 'up') {
//           var percent = this.element.getAttribute('data-percent');
//
//           $(this.element).addClass('skill-circle_' + percent);
//
//         }
//       },
//       offset: '0'
//     }),
//
//     circlesUpReset: circle.waypoint({
//       handler: function(direction) {
//         if (direction == 'up') {
//           var percent = this.element.getAttribute('data-percent');
//
//           $(this.element).removeClass('skill-circle_' + percent);
//
//         }
//       },
//       offset: '100%'
//     })
//   };
// };
//
// circles.circlesDown();
// circles.circlesDownReset();
// circles.circlesUp();
// circles.circlesUpReset();

/*********************/
/***** preloader *****/
/*********************/

$(document).ready(function() {
  $(function() {
    var imgs = [];

    $.each($('*'), function() {
      var $this = $(this),
          background = $this.css('background-image'),
          img = $this.is('img'),
          bgImage = /url\(.*\)/gim;

      if (background == bgImage) {
        var bgPath = background.replace('url("', '').replace('")', '');

        imgs.push(bgPath);
      }

      if (img) {
        var path = $this.attr('src');

        if(path) {
          imgs.push(path);
        }
      }

    });

    var percents = 1;
    console.log(percents);
    for (var i = 0; i < imgs.length; i++) {
      var image = $('<img>', {
        attr: {
          src: imgs[i]
        }
      });

      image.on('load', function() {
        setPercent(imgs.length, percents);
        percents++;
      });

    }

    function setPercent(total, current) {
      var percent = Math.ceil(current / total * 100);

      // function display() {
      //   return new Promise(function(resolve, reject) {
      //     $('.loading-screen').animate({'opacity', '0'});
      //     resolve();
      //   });
      // }

      if (percent >= 100) {
        $('.parallax').css({'display': 'block'});
        $('.welcome-page-wrapper').css({'display': 'block'});
        $('.page-wrapper').css({'display': 'block'});
        $('.loading-screen').animate({
          opacity: 0
        }, 1000, function() {
          $('.loading-screen').css({'display': 'none'});
          setBlur();
        });
        // setTimeout(function() {
        //   $('.loading-screen').css('display', 'none');
        // }, 1500);
      }

      $('.preload-percent').text(percent + '%');
    }

  });
});

/*______________site-menu_______________*/

var menuSwitcher = 'off';
$('#menu-button').on('click', function() {

  if (menuSwitcher == 'off') {
    $('.about-line_top').addClass('about-line_top_active');
    $('.about-line_mid').addClass('about-line_mid_active');
    $('.about-line_bot').addClass('about-line_bot_active');

    $('.site-menu').css({
      'display': 'block'
    });

    $('.site-menu__item').css({
      'opacity': '1'
    });

    setTimeout(function() {
      $('.site-menu').addClass('site-view');
    }, 5);

    setTimeout(function() {
      $('.site-menu__item').css({
        'transform': 'scale(1)'
      });

      menuSwitcher = 'on'
    }, 405);

  } else if (menuSwitcher == 'on') {
    $('.about-line_top').removeClass('about-line_top_active');
    $('.about-line_mid').removeClass('about-line_mid_active');
    $('.about-line_bot').removeClass('about-line_bot_active');

    $('.site-menu__item').css({
      'opacity': '0'
    });

    setTimeout(function() {
      $('.site-menu').removeClass('site-view');
    }, 1);

    setTimeout(function() {
      $('.site-menu').css({
        'display': 'none'
      });

      $('.site-menu__item').css({
        'transform': 'scale(0)'
      });

      menuSwitcher = 'off'
    }, 401);
  }

});

$('.site-menu__link').on('click', function() {
  if ( $(this).attr('href') == '#' ) {

    $('.about-menu__check').click();//.attr('disabled', 'disabled');

    $('.site-menu__item').css({
      'opacity': '0'
    });

    setTimeout(function() {
      $('.site-menu').removeClass('site-view');
    }, 1);

    setTimeout(function() {
      $('.site-menu').css({
        'display': 'none'
      });

      $('.site-menu__item').css({
        'transform': 'scale(0)'
      });

      menuSwitcher = 'off';

    }, 401);
  }
});

/*___________smooth scroll (links href = elements id)____________*/

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {

    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 500);
        return false;
      }
    }
  });
});

/*__________parallax_________________*/

$(document).ready(function() {

  var layer = $('.parallax').find('.parallax-layer');

  layer.map(function(key, value) {
    var bottomPosition = (window.innerHeight / 2) * (key / 100);
    $(value).css({
      'bottom': '-' + bottomPosition + 'px',
      'transform': 'translate3d(0, 0, 0)'
    });
  });

  $(window).on('mousemove', function(e) {
    var mouseX = e.pageX,
        mouseY = e.pageY,
        w = (window.innerWidth / 2) - mouseX,
        h = (window.innerHeight / 2) - mouseY;

    layer.map(function(key, value) {
      var bottomPosition = (window.innerHeight / 2) * (key / 100),
          widthPosition = w * (key / 100),
          heightPosition = h * (key / 100);

      $(value).css({
        'bottom': '-' + bottomPosition + 'px',
        'transform': 'translate3d(' + widthPosition + 'px,' + heightPosition + 'px, 0)'
      });
    });
  });
});

/*________________blur________________*/

$(document).ready(function() {
  setBlur();
});


$(window).resize(function() {
  setBlur();
});

function setBlur() {

  var blurSection = $('.blur-bg'),
    imgWidth = blurSection.width(),
    blur = $('.connect-blur'),
    posTop = blurSection.offset().top - blur.offset().top,
    posLeft = blurSection.offset().left - blur.offset().left;

  blur.css({
    'background-size' : imgWidth + 'px' + ' ' + 'auto',
    'background-position' : posLeft + 'px' + ' ' + posTop + 'px'
  });

}

/*___________________slider________________________*/

$(function () {
  var controlPrev = $('.controls-prev'),
      controlNext = $('.controls-next'),
      fontBig = '50px',
      fontNormal = '35px';

  function setActiveSlides() {
    if ( $(window).width() >= 1200 ) {
      fontBig = '50px';
      fontNormal = '35px';
    } else if ( $(window).width() < 1199 && $(window).width() >= 768 ) {
      fontBig = '40px';
      fontNormal = '30px';
    } else if ( $(window).width() < 767 ) {
      fontBig = '30px';
      fontNormal = '21px';
    }

    var slideActive = $('.works-image__item_active'),
        slideActiveIndex = slideActive.index(),
        prevSlide = $('.controls-prev__item'),
        nextSlide = $('.controls-next__item'),
        descBlock = $('.desc-wrapper');

    function splitLetters() {
      var title = descBlock.eq(slideActiveIndex).find('.site-name__title');
      var letters = title.text().split('');
      title.text('');
      var i = 0;

      function loopLetters() {
        setTimeout(function() {
          var span = $("<span></span>");
          span.text(letters[i]).appendTo(title).animate({
            fontSize: fontBig
          }, 150, "linear", function() {
            span.animate({
              fontSize: fontNormal
            }, 150);
          });

          i++;
          if (i < letters.length) {
            loopLetters();
          }
        }, 75);
      }

      loopLetters();
    }

    descBlock.css({
      'opacity':'0'
    });
    prevSlide.removeClass('move-down');
    nextSlide.removeClass('move-up');


    if (slideActive.next().length == 0) {
      nextSlide.first().addClass('controls-next__item_active');
    } else if (slideActive.next().length != 0) {
      nextSlide.eq(slideActiveIndex + 1).addClass('controls-next__item_active');
    }

    if (slideActive.prev().length == 0) {
      prevSlide.last().addClass('controls-prev__item_active');
    } else if (slideActive.prev().length != 0) {
      prevSlide.eq(slideActiveIndex - 1).addClass('controls-prev__item_active');
    }

    descBlock.eq(slideActiveIndex).animate({
      opacity: '1'
    }, 300);

    splitLetters();
  }

  setActiveSlides();

  controlPrev.on('click', function() {
    var slide = $('.works-image__item'),
        slideActive = $('.works-image__item_active'),
        prevSlideActive = $('.controls-prev__item_active'),
        nextSlideActive = $('.controls-next__item_active');

    if ( slideActive.is(':animated') ) {
      return false;
    }

    slideActive.animate({
      top: '100%'
    }, 300, "linear", function() {
      slideActive.removeClass('works-image__item_active').prev().addClass('works-image__item_active');
      if (slideActive.prev().length == 0) {
        slide.last().addClass('works-image__item_active');
      }
      setTimeout(function() { slide.css('top','0') },200);

      setActiveSlides();
    });
    prevSlideActive.addClass('move-down').removeClass('controls-prev__item_active');
    nextSlideActive.addClass('move-up').removeClass('controls-next__item_active');
  });

  controlNext.on('click', function() {
    var slide = $('.works-image__item'),
        slideActive = $('.works-image__item_active'),
        prevSlideActive = $('.controls-prev__item_active'),
        nextSlideActive = $('.controls-next__item_active');

    if ( slideActive.is(':animated') ) {
      return false;
    }

    slideActive.animate({
      bottom: '100%'
    }, 300, "linear", function() {
      slideActive.removeClass('works-image__item_active').next().addClass('works-image__item_active');
      if (slideActive.next().length == 0) {
        slide.first().addClass('works-image__item_active');
      }
      setTimeout(function() { slide.css('bottom','0') },200);

      setActiveSlides();
    });
    prevSlideActive.addClass('move-down').removeClass('controls-prev__item_active');
    nextSlideActive.addClass('move-up').removeClass('controls-next__item_active');
  });
});

/*_______________admin page tabs_____________*/

$(function() {
  var tabLink = $('.admin-menu__link'),
      tabPage = $('.contents-page');

  tabLink.on('click', function() {
    var $this = $(this),
        hash = $this.attr('href');

    if ($this.parent().hasClass('admin-menu__tab_active')) {
      return false;
    }

    tabLink.parent().removeClass('admin-menu__tab_active');
    $this.parent().addClass('admin-menu__tab_active');
    $('.contents-page_active').animate({
      opacity: 0
    }, 400, "linear", function() {
      tabPage.removeClass('contents-page_active').css('opacity','1');
      $(hash).addClass('contents-page_active');
    });
  });
});

/*________________scroll parallax__________________*/

$(window).scroll(function() {
  var wScroll = $(window).scrollTop();

  (function() {
    var bg = $('.header-parallax');

    function setStrafe(multiplier, direction) {
      var strafeAmount = wScroll / multiplier,
          strafe = -strafeAmount + '%',
          transformString = 'translate3d(0,' + strafe + ',0)';

      if (direction == 'down') {
        strafe = strafeAmount + '%';
        transformString = 'translate3d(0,' + strafe + ',0)';
      }

      return transformString;
    }

    $('.header-parallax[data-key="5"]').css({
      'transform': setStrafe(60)
    });
    $('.header-parallax[data-key="4"]').css({
      'transform': setStrafe(45)
    });
    $('.header-parallax[data-key="3"]').css({
      'transform': setStrafe(45, 'down')
    });
    $('.header-parallax[data-key="2"]').css({
      'transform': setStrafe(30, 'down')
    });
    $('.header-parallax[data-key="1"]').css({
      'transform': setStrafe(20, 'down')
    });
    $('.header-parallax[data-key="0"]').css({
      'transform': setStrafe(10, 'down')
    });
  }());
});

/*__________frontend form validation____________*/
$('#login').on('focus', function() {
  $('.form-login').removeClass('not-valid');
});
$('#password').on('focus', function() {
  $('.form-pass').removeClass('not-valid');
});
$('#personalize').on('change', function() {
  $('.form-content__c-label').removeClass('not-valid-check');
});
$('.form-content__r-input').on('change', function() {
  $('.form-content__r-label').removeClass('not-valid-check');
});
$('#name').on('focus', function() {
  $(this).removeClass('not-valid-connect');
});
$('#email').on('focus', function() {
  $(this).removeClass('not-valid-connect');
});
$('#message').on('focus', function() {
  $(this).removeClass('not-valid-connect');
});

$('.welcome-form').on('submit', function(e) {
  e.preventDefault();

  if ( $('#login').val() == '') {
    $('.form-login').addClass('not-valid');
  }
  if ( $('#password').val() == '') {
    $('.form-pass').addClass('not-valid');
  }
  if ( !$('#personalize').is(':checked') ) {
    $('.form-content__c-label').addClass('not-valid-check');
  }
  if ( !$('.form-content__r-input').is(':checked') ) {
    $('.form-content__r-label').addClass('not-valid-check');
  }
});

$('.connect-form').on('submit', function(e) {
  e.preventDefault();

  if ( $('#name').val() == '') {
    $('#name').addClass('not-valid-connect');
  }
  if ( $('#email').val() == '') {
    $('#email').addClass('not-valid-connect');
  }
  if ( $('#message').val() == '') {
    $('#message').addClass('not-valid-connect');
  }
});