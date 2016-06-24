'use strict';

/***** index page rotating plate *****/

var counter = 3;

$('.authorize-button__link').on('click', function() {
  if (counter % 2) {
    $('.welcome-wrapper').removeClass('rotate180back').addClass('rotate180');
    $('.authorize-button').fadeOut(300);
    $('.plate-avatar').fadeOut(300);
    $('.plate-social').fadeOut(300);
    setTimeout(function() {
    counter += 1;
    }, 600)
  }
});

$(document).on('click', (function (event) {
  var target = $(event.target);
  if ( (target.closest('.authorize-plate').length == 0 || target.is('#return')) && !(counter % 2) ) {
    counter += 1;
    $('.welcome-wrapper').removeClass('rotate180').addClass('rotate180back');
    $('.authorize-button').fadeIn(300);
    $('.plate-avatar').fadeIn(300);
    $('.plate-social').fadeIn(300);
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

var circlesDown = $('.skill-circle').waypoint({
  handler: function(direction) {
    if (direction == 'down') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).addClass('skill-circle_' + percent);

    }
  },
  offset: '85%'
});

var circlesDownReset = $('.skill-circle').waypoint({
  handler: function(direction) {
    if (direction == 'down') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).removeClass('skill-circle_' + percent);

    }
  },
  offset: '-50px'
});

var circlesUp = $('.skill-circle').waypoint({
  handler: function(direction) {
    if (direction == 'up') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).addClass('skill-circle_' + percent);

    }
  },
  offset: '0'
});

var circlesUpReset = $('.skill-circle').waypoint({
  handler: function(direction) {
    if (direction == 'up') {
      var percent = this.element.getAttribute('data-percent');

      $(this.element).removeClass('skill-circle_' + percent);

    }
  },
  offset: '100%'
});

/*********************/
/***** preloader *****/
/*********************/

$(window).on('load', function() {
  $('.wrapper').addClass('loaded');
  $('.preload').find('div').css({
    'display' : 'none'
  });
  setTimeout(function() {
    $('.wrapper').removeClass('loading').removeClass('loaded');
  }, 1000);
});
// $(document).ready(function () {
//
//   // $(function () {
//   //   var imgs = [];
//   //
//   //   $.each($('*'), function () {
//   //     var $this = $(this),
//   //       background = $this.css('background-image'),
//   //       img = $this.is('img');
//   //
//   //     if (background != 'none') {
//   //       var path = background.replace('url("', '').replace('")', '');
//   //
//   //       imgs.push(path);
//   //     }
//   //
//   //     if (img) {
//   //       var path = $this.attr('src');
//   //
//   //       if (path) {
//   //         imgs.push(path);
//   //       }
//   //     }
//   //   });
//   //
//   //   var percents = 1;
//   //
//   //   for (var i = 0; i < imgs.length; i++) {
//   //     var image = $('<img>', {
//   //       attr: {
//   //         src: imgs[i]
//   //       }
//   //     });
//   //
//   //     image.load(function () {
//   //       setPercents(imgs.length, percents);
//   //       percents++;
//   //     });
//   //   }
//   //
//   //   function setPercents(total, current) {
//   //     var percent = Math.ceil(current / total * 100);
//   //
//   //     if (percent >= 100) {
//   //       $('.wrap').css('display', 'block');
//   //     }
//   //
//   //     $('.loader-bar').css({
//   //       'width': percent + '%'
//   //     }).text(percent + '%');
//   //   }
//   // });
// });

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