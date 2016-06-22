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
    if ( direction == 'down' ) {
      $('.blog-menu').css({
        'position':'fixed'
      })
    }
  }
});

var waymenuback = $('#wp-1').waypoint({
  handler: function(direction) {
    if( direction == 'up' ) {
      $('.blog-menu').css({
        'position':'absolute'
      })
    }
  }
});