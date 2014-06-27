var gulp = require('gulp'),
	connect = require('gulp-connect');
 
gulp.task('serve', function() {
	connect.server();
});
 
gulp.task('default', ['serve']);