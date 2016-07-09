
var gulp 	= require("gulp");
var stylus 	= require("gulp-stylus");
var concat	= require("gulp-concat");
var uglify	= require("gulp-uglify");
var nib 	= require("nib");

gulp.task('compile-stylus', function(){
	gulp.src('./app/stylus/app.styl')
	.pipe(stylus({use : nib(), compress : true}))
	.pipe(gulp.dest('./public/css'));
});

gulp.task('compile-app', function(){
	gulp.src([
		'./app/models/*.js',
		'./app/collections/*.js', 
		'./app/views/*.js',
		'./app/app.js'
	])
   	.pipe(concat('app.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function(){
	gulp.watch('./app/stylus/*.styl', ['compile-stylus']);
	gulp.watch('./app/**/*.js', ['compile-app']);
});

gulp.task('default', ['compile-stylus', 'compile-app', 'watch']);