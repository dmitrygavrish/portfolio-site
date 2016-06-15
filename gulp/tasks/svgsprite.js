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
    .pipe($.rsp.remove({ properties: [$.rsp.PROPS_FILL] }))
    .pipe($.gp.svgSprite(config))
    .pipe($.gulp.dest('./build'));

  });
};