const gulp = require("gulp");
const minifycss = require("gulp-clean-css");
const uglify = require("gulp-uglify");
const htmlmin = require("gulp-htmlmin");
const cssnano = require("gulp-cssnano");
const htmlclean = require("gulp-htmlclean");
const del = require("del");
const babel = require("gulp-babel");
const autoprefixer = require("gulp-autoprefixer");
const connect = require("gulp-connect");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
sass.compiler = require("node-sass");

const config = require("./config.json");

gulp.task("clean", function () {
	return del(["./dist/css/", "./dist/js/"]);
});

gulp.task("css", function () {
	return gulp
		.src("./src/css/*.scss")
		.pipe(sass().on("error", sass.logError))
		.pipe(minifycss({ compatibility: "ie8" }))
		.pipe(autoprefixer({ overrideBrowserslist: ["last 2 version"] }))
		.pipe(cssnano({ reduceIdents: false }))
		.pipe(gulp.dest("./dist/css"));
});

gulp.task("html", function () {
	return gulp
		.src("./dist/*.html")
		.pipe(htmlclean())
		.pipe(htmlmin())
		.pipe(gulp.dest("./dist"));
});

gulp.task("js", function () {
	return gulp
		.src("./src/js/*.js")
		.pipe(babel({ presets: ["@babel/preset-env"] }))
		.pipe(uglify())
		.pipe(gulp.dest("./dist/js"));
});

gulp.task("pug", function () {
	return gulp
		.src("./src/*.pug")
		.pipe(pug({ data: config }))
		.pipe(gulp.dest("./dist"));
});
gulp.task("redirect", function (done) {
	config.redirect.forEach((item) => {
		// item 为redirect的列表
		let data = {
			redirect: item,
			count: config.count,
			template: item.template || "redirect",
		};
		gulp
			.src(`./src/redirect/${data.template}.pug`)
			.pipe(pug({ data: data }))
			.pipe(rename("index.html"))
			.pipe(gulp.dest(`./dist/${item.path}`));
	});
	done();
});
gulp.task("assets", function () {
	return gulp.src(["./src/ets/**/*"]).pipe(gulp.dest("./dist/assets"));
});
gulp.task("staticHtml", function () {
	return gulp.src(["./src/*.html"]).pipe(gulp.dest("./dist"));
});
gulp.task("test", gulp.series("redirect"));
gulp.task("LICENSE", function () {
	return gulp.src(["./src/LICENSE"]).pipe(gulp.dest("./dist"));
});

gulp.task("txt", function () {
	return gulp.src(["./src/*.txt"]).pipe(gulp.dest("./dist"));
});

gulp.task("md", function () {
	return gulp.src(["./src/*.md"]).pipe(gulp.dest("./dist"));
});

gulp.task("json", function () {
	return gulp.src(["./src/*.json"]).pipe(gulp.dest("./dist"));
});

gulp.task(
	"build",
	gulp.series(
		"clean",
		"assets",
		"staticHtml",
		"pug",
		"redirect",
		"css",
		"js",
		"html",
		"LICENSE",
		"txt",
		"md",
		"json"
	)
);
gulp.task("default", gulp.series("build"));

gulp.task("watch", function () {
	gulp.watch("./src/components/*.pug", gulp.parallel("pug"));
	gulp.watch("./src/pages/*.pug", gulp.parallel("pug"));
	gulp.watch("./src/*.pug", gulp.parallel("pug"));
	gulp.watch("./src/css/**/*.scss", gulp.parallel(["css"]));
	gulp.watch("./src/js/*.js", gulp.parallel(["js"]));
	connect.server({
		root: "dist",
		livereload: true,
		port: 4000,
	});
});
