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
      downloadUrl: 'http://dl.nwjs.io/',
      buildDir:'./platform',
      cacheDir:'./platform',
      version:'0.19.5',
      // macIcns:'IDE_logo.icns'
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
gulp.task('test:mac',function(){
  var config = {
    // Build paths
    nwjs_path: 'platform/0.19.5-sdk/osx64/nwjs.app', // Last build tested with NW.js 0.12.2
    source_path: 'aaaaa', // App root (the dir with the package.json file)
    build_path: '.', // Destination dir of the .app build
    // App informations
    name: '乐工Web开发者工具',
    bundle_id: 'com.joywok.JoywokWebIDE',
    version: '1.0.0',
    bundle_version: '100',
    copyright: '© Sample copyright',
    icon_path: 'nw.icns',
    // Signing configuration
    identity: '3rd Party Mac Developer Application: Dogesoft Inc. (625R8EDA65)', // Application signing
    identity_installer: '3rd Party Mac Developer Installer: Dogesoft Inc. (625R8EDA65)', // Application installer signing (may be the same as identity)
    entitlements: [
      'com.apple.security.network.client',
      'com.apple.security.assets.movies.read-only'
    ],
    // App categories
    app_category: 'public.app-category.utilities',
    app_sec_category: 'public.app-category.productivity',
    // Additional keys to add in the Info.plist file (optional, remove if not needed)
    plist: {
        NSSampleProperty1: 'Property value 1',
        NSSampleProperty2: {
            NSSub1: 'Sub-property value 1',
            NSSub2: 'Sub-property value 1'
        }
    },
    // Optimization
    uglify_js: false // Uglifies all JS files found in the app (default is FALSE)
  }
  var Builder = require('nwjs-macappstore-builder');
  var show_output = true;
  var builder = new Builder();
  builder.build(config, function(error, app_path){
    console.log(error ? error.message : 'Build done: ' + app_path);
  }, show_output);
})
gulp.task('public',function(){
  gulp.src('.')
    .pipe(exec('cp -R payload package.json nwjc node_modules minidump_stackwalk chromedriver build bower_components ../public/.'))
})




