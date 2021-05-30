"use strict";
var gulp = require("gulp"),
  tslint = require("gulp-tslint"),
  tsc = require("gulp-typescript");

var tsProject = tsc.createProject("tsconfig.json", {
  typescript: require("typescript"),
});

// LINT
gulp.task("lint", function () {
  var config = { formatter: "verbose" };
  return tsProject.src().pipe(tslint(config)).pipe(tslint.report());
});

// BUILD
gulp.task("build", function () {
  return tsProject
    .src()
    .pipe(tsProject())
    .on("error", function (err) {
      process.exit(1);
    })
    .js.pipe(gulp.dest("dist"));
});

gulp.task("default", gulp.series("lint", "build"));
