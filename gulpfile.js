'use strict';
let gulp = require('gulp');//引入gulp
let del = require('del');//引入删除文件
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let htmlmin = require('gulp-htmlmin');
let $ = require('gulp-load-plugins')();
gulp.task('styles:sass', ()=>{
  var sass = require('gulp-ruby-sass');
  var concat = require('gulp-concat');
   sass(['src/styles/*.scss'],{
        style: 'expanded',
        precision: 10
        })
    .on('error', console.error.bind(console))
    .pipe(gulp.dest('build/styles'))
    .pipe($.size({title:'build/styles'}));
});
gulp.task('styles', ['styles:sass']);
gulp.task('html', function() {
  return gulp.src('src/template/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/template/'));
});
gulp.task('mini',function(){
	return gulp.src('src/images/**/')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('src/images'));
})
gulp.task('default',function(){
  gulp.watch(['src/template/*.html'],['html']);
  gulp.watch(['src/styles/*.scss'],['styles:sass']);
});
gulp.task('public',function(){
  
})