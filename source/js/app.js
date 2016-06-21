'use strict';
var toggle = 'off';

/***** index page rotating plate *****/

$('.authorize-button__link').on('click', function() {
  $('.welcome-plate').removeClass('rotate3d-back').addClass('rotate3d');
  $('.authorize-plate').removeClass('rotate3d-reverse').addClass('rotate3d-back').css({'display':'block'});
  $('.authorize-button').fadeOut(500);
  setTimeout(function(){
    $('.welcome-plate').css({
      'opacity':'0'
    });
    $('.authorize-button').css({
      'visibility':'hidden'
    });
    $('.authorize-plate').css({
      'opacity':'1'
    });
  }, 250);
  setTimeout(function() {
    toggle = 'on';
    $('.welcome-plate').css({
      'transform':'rotate3d(0, 180, 0, 180deg)'
    });
    $('.authorize-plate').css({
      'transform':'rotate3d(0, 0, 0, 0deg)'
    });
  }, 1000)
});

$(document).on('click', (function (event) {
  var target = $(event.target);
  if ((target.closest('.authorize-plate').length == 0 || target.is('#return')) && toggle == 'on') {
    toggle = 'off';
    $('.welcome-plate').removeClass('rotate3d').addClass('rotate3d-back');
    $('.authorize-plate').removeClass('rotate3d-back').addClass('rotate3d-reverse');
    setTimeout(function(){
      $('.welcome-plate').css({
        'opacity':'1'
      });
      $('.authorize-button').fadeIn(500).css({
        'visibility':'visible'
      });
      $('.authorize-plate').css({
        'opacity':'0',
        'display':'none'
      });
    }, 250);
    setTimeout(function() {
      $('.welcome-plate').css({
        'transform':'rotate3d(0, 0, 0, 0deg)'
      });
      $('.authorize-plate').css({
        'transform':'rotate3d(0, -180, 0, -180deg)'
      });
    }, 1000)
  }
}));

/***** blog page waypoints *****/

var waypoints = $('.blog-article').waypoint({
  handler: function(direction) {
    var menuItem = $('.blog-menu__item'),
        hash = this.element.id;

    menuItem.removeClass('blog-menu__item_active');

    $.each(menuItem, function() {
      if( $(this).children('a').attr('href').slice(1) == hash ) {
        $(this).addClass('blog-menu__item_active');
        console.log(menuItem);
      }
    })
  },
  offset: '20%'
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