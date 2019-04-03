'use strict'

import gulp from 'gulp'
var clean = require('gulp-clean')
import marketingRouter from './src/router/marketing/index'

gulp.task('default', done => {
  marketingRouter.forEach((item) => {
    let path = './src/pages/' + item.location + '.vue'
    // console.log(path)
    if (item.hasOwnProperty('isAbandoned')) {
      if (item.isAbandoned) {
        gulp.src(path, { base: './', allowEmpty: true })
          .pipe(clean({ force: true }))
          .pipe(gulp.dest('./old'))
      }
    }
  })
  done()
})

