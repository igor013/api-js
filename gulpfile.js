var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('scripts', async ()=>{
    return gulp.src('./src/**/*.js')
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('compiled'))

});

gulp.task('copy-hbs', async ()=>{
    gulp.src('./src/app/views/**/*.hbs')
    .pipe(gulp.dest('./dist/app/views'))
});