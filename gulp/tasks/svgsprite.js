'use strict';

module.exports = function() {
  $.gulp.task('svg', function(){
    var config = {
      mode: {
        symbol: {
          dest: './',
          sprite: 'assets/img/svg-sprite',
          render: {
            scss: {
              dest: '../source/tpl/svg-sprite'
            }
          }
        }
      }
    };

  return $.gulp.src('./source/images/*.svg')
    .pipe($.gp.svgSprite(config))
    .pipe($.gulp.dest('./build'));

  });
};