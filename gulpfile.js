'use strict';
let gulp = require('gulp');//引入gulp
let del = require('del');//引入删除文件
let imagemin = require('gulp-imagemin');
let pngquant = require('imagemin-pngquant');
let NwBuilder = require('nw-builder');
let htmlmin = require('gulp-htmlmin');
let $ = require('gulp-load-plugins')();
const exec = require('gulp-exec');
const fsExtra = require('fs-extra');
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
gulp.task('specail:js',function(){
  return gulp.src(['src/scripts/components/min/**/*'])
    .pipe(gulp.dest('build/scripts/components/min/'));
})
gulp.task('styles', ['styles:sass']);
gulp.task('html', function() {
  return gulp.src('src/template/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('build/template/'));
});
gulp.task('mini',function(){
	return gulp.src('src/images/**/*')
		.pipe(imagemin({
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		}))
		.pipe(gulp.dest('build/images'));
})
gulp.task('default',["html","styles"],function(){
  gulp.watch(['src/template/*.html'],['html']);
  gulp.watch(['src/styles/*.scss'],['styles:sass']);
});
gulp.task('platform:mac',function(){
  var nw = new NwBuilder({
      files: './aaaaa/**/*', // use the glob format
      platforms: ['osx64'],
      downloadUrl: 'https://dl.nwjs.io/',
      buildDir:'./platform',
      cacheDir:'./platform',
      version:'0.19.5',
      macIcns:'IDE_logo.icns'
  });
  //Log stuff you want
  nw.on('log',  console.log);
  // Build returns a promise
  nw.build().then(function () {
    console.log('all done!');
  }).catch(function (error) {
      console.error(error);
  });
})
gulp.task('platform:win',function(){
  var nw = new NwBuilder({
      files: './aaaaa/**/*', // use the glob format
      platforms: ['win64'],
      downloadUrl: 'https://dl.nwjs.io/',
      buildDir:'./platform',
      cacheDir:'./platform',
      version:'0.19.5',
      winIco:'icon_1024.ico'
  });
  //Log stuff you want
  nw.on('log',  console.log);
  // Build returns a promise
  nw.build().then(function () {
    console.log('all done!');
  }).catch(function (error) {
      console.error(error);
  });
})
gulp.task('public',function(){
  gulp.src('.')
    .pipe(exec('cp -R payload package.json nwjc node_modules minidump_stackwalk chromedriver build bower_components ../public/.'))
})




