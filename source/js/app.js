'use strict';
var scrollSwitch = 0;

$(window).on('resize', function() {
  if( scrollSwitch === 0) {
    $('.bg-mask').css('background','none');
    scrollSwitch = 1;
  }
});
/***** index page rotating plate *****/

var counter = 3;

$('.welcome-header-button__link').on('click', function() {
  if( $(this).attr('href') == '/admin.html') { return true; }

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

$('.blog-menu__item').first().addClass('blog-menu__item_active');

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

    $('.about-menu__button').click();

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

  $('.works-image__item').first().addClass('works-image__item_active'); //added /w server version

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

    //======================
    // letter by letter
    //======================
    function splitLetters() {
      var title = descBlock.eq(slideActiveIndex).find('.site-name__title');
      var string = title.text().trim(),
        stringArray = string.split(''),
        word = '';
        //animationState = $.Deferred();


      stringArray.forEach(function (letter) {

        if (letter != ' ') {
          var letterHtml = '<span class="letter-span">' + letter + '</span>';
        } else {
          letterHtml = '<span class="letter-span_space">' + letter + '</span>';
        }

        word += letterHtml;
      });

      title.html(word);

      var letter = title.find('.letter-span'),
        counter = 0,
        timer,
        duration = 2000 / stringArray.length;

      function showLetters() {
        var currentLetter = letter.eq(counter);

        currentLetter.addClass('letter-span_active');

        counter++;

        // if (stringArray.length == counter) {
        //   animationState.resolve();
        // }

        if (typeof timer != 'undefined') {
          clearTimeout(timer);
        }

        timer = setTimeout(showLetters, duration);
      }

      showLetters();
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

// var messageSwitch = 0;

$('.welcome-form').on('submit', function(e) {
  e.preventDefault();
  var loginCheck = $('#login').val() == '',
      passCheck = $('#password').val() == '',
      checkCheck = !$('#personalize').is(':checked'),
      radioCheck = !$('.form-content__r-input').is(':checked');

  if ( loginCheck ) {
    $('.form-login').addClass('not-valid');
  }
  if ( passCheck ) {
    $('.form-pass').addClass('not-valid');
  }
  if ( checkCheck ) {
    $('.form-content__c-label').addClass('not-valid-check');
  }
  if ( radioCheck ) {
    $('.form-content__r-label').addClass('not-valid-check');
  }
  if ( loginCheck ||  passCheck || checkCheck || radioCheck ) {
    // e.preventDefault();
    return false;
  }
  /* ajax */
  var data = {
    login: login.value,
    password: password.value
  };

  var xhr = new XMLHttpRequest();
  xhr.open('POST','/auth');
  xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
  xhr.send(JSON.stringify(data));

  setTimeout(function() {
    $.ajax({
      url: "",
      context: document.body,
      success: function (s, x) {
        $(this).html(s);
      }
    }).done(function() {
      $('.message-block').css({
        'display': 'block'
      });
      if ($('.welcome-header-button__link').text() == 'Авторизоваться') {
        $('.message-block__text').text('Авторизация прошла неудачно')
      } else if ($('.welcome-header-button__link').text() == 'Администрирование') {
        $('.message-block__text').text('Авторизация прошла успешно')
      }
    });
  }, 100);
});

$('.message-block__button').on('click', function() {
  $('.message-block').animate({
    opacity: '0'
  }, 200, "linear", function() {
    $('.message-block').css({
      'display': 'none'
    })
  })
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
  if ( $('#name').val() == '' || $('#email').val() == '' || $('#message').val() == '' ) {
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Не все поля заполнены');
    return false;
  }

  /* ajax */
  var data = {
    name: name.value,
    mail: email.value,
    text: message.value
  };

  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/mail');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
    xhr.send(JSON.stringify(data));
    resolve();
  });

  promise.then(function() {
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Отправлено');
  });
});

/*__________________more ajax____________________*/
$('.admin-message__button').on('click', function() {
  $('.admin-message-wrapper').fadeOut(300);
});

$('.add-article').on('submit', function(e) {
  e.preventDefault();

  if ( $('#article').val() == '' || $('#date').val() == '' || $('#content').val() == '' ) {
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Не все поля заполнены');
    return false;
  }

  var data = {
    title: article.value,
    date: date.value,
    text: content.value
  };

  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/blog');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
    xhr.send(JSON.stringify(data));
    resolve();
  });

  promise.then(function() {
    $('#article').val('');
    $('#date').val('');
    $('#content').val('');
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Отправлено');
  });
});

$('.skills-upgrade').on('submit', function(e) {
  e.preventDefault();

  if ($('#number_html').val() == '' || $('#number_css').val() == '' || $('#number_js').val() == '' || $('#number_php').val() == '' ||
      $('#number_mysql').val() == '' || $('#number_node').val() == '' || $('#number_mongo').val() == '' ||
      $('#number_git').val() == '' || $('#number_gulp').val() == '' || $('#number_bower').val() == '') {
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Не все поля заполнены');
    return false;
  }

  var data = {
    html: number_html.value,
    css: number_css.value,
    js: number_js.value,
    php: number_php.value,
    mysql: number_mysql.value,
    node: number_node.value,
    mongo: number_mongo.value,
    git: number_git.value,
    gulp: number_gulp.value,
    bower: number_bower.value
  };

  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/about');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
    xhr.send(JSON.stringify(data));
    resolve();
  });

  promise.then(function() {
    $('#number_html').val('');
    $('#number_css').val('');
    $('#number_js').val('');
    $('#number_php').val('');
    $('#number_mysql').val('');
    $('#number_node').val('');
    $('#number_mongo').val('');
    $('#number_git').val('');
    $('#number_gulp').val('');
    $('#number_bower').val('');
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Отправлено');
  });
});

/*___________ server-side for works ____________*/

$('.add-project').on('submit', function(e) {
  e.preventDefault();

  if ( $('#project').val() == '' || $('#tech').val() == '' || $('#projectimg').val() == '' || $('#url').val() == '' ) {
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Не все поля заполнены');
    return false;
  }

  var data = {
    title: project.value,
    tech: tech.value,
    url: url.value,
    image: projectimg.value
  };

  var promise = new Promise(function(resolve, reject) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST','/work');
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf8');
    xhr.send(JSON.stringify(data));
    resolve();
  });

  promise.then(function() {
    $('#project').val('');
    $('#tech').val('');
    $('#url').val('');
    $('#projectimg').val('');
    $('.admin-message-wrapper').fadeIn(300);
    $('.admin-message__text').text('Отправлено');
  });
});

function uploadFiles(url, files) {
  var formData = new FormData();

  for (var i = 0, file; file = files[i]; ++i) {
    formData.append(file.name, file);
  }

  var xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  //xhr.onload = function(e) { ... };

  xhr.send(formData);  // multipart/form-data
}

document.querySelector('#projectimg').addEventListener('change', function(e) {
  uploadFiles('/image', this.files);
}, false);

/*_____________________________*/