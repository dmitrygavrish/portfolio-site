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
          console.log(menuItem);
        }
      })
    }
  },
  offset: '35%'
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
          console.log(menuItem);
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
          img = $this.is('img');

      if (background != 'none') {
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
        $('.loading-screen').animate({
          opacity: 0
        }, 1000, function() {
          $('.loading-screen').css({'display': 'none'})
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
$('.about-menu__check').on('change', function() {

  // $(this).attr('disabled', 'disabled');

  if (menuSwitcher == 'off') {

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

  // $(this).removeAttr('disabled');

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

      // $('.about-menu__check').removeAttr('disabled');
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