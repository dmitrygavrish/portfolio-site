'use strict';
var toggle = 'off';

$('.authorize-button__link').on('click', function() {
  $('.welcome-plate').removeClass('rotate3d-back').addClass('rotate3d');
  $('.authorize-plate').removeClass('rotate3d-reverse').addClass('rotate3d-back');
  setTimeout(function(){
    $('.welcome-top').css({
      'opacity':'0'
    });
    $('.plate-menu').css({
      'opacity':'0'
    });
    $('.authorize-button').css({
      'opacity':'0'
    });
    $('.authorize-plate').css({
      'opacity':'1'
    });
    toggle = 'on';
  }, 500);
});

$(document).on('click', (function (event) {
  if ($(event.target).closest('.authorize-plate').length == 0 && toggle == 'on') {
    $('.welcome-plate').removeClass('rotate3d').addClass('rotate3d-back');
    $('.authorize-plate').removeClass('rotate3d-back').addClass('rotate3d-reverse');
    setTimeout(function(){
      $('.welcome-top').css({
        'opacity':'1'
      });
      $('.plate-menu').css({
        'opacity':'1'
      });
      $('.authorize-button').css({
        'opacity':'1'
      });
      $('.authorize-plate').css({
        'opacity':'0'
      });
      toggle = 'off';
    }, 500);
  }
}));