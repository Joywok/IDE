'use strict';
var gulp = require('gulp');//引入gulp
var del = require('del');//引入删除文件
var $ = require('gulp-load-plugins')();

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

gulp.task('default',function(){
	 gulp.watch(['src/styles/*.scss'],['styles:sass']);
});