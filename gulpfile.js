// ===== Подключение плагинов ===========================

    let { src, dest } = require('gulp'),
                 gulp = require('gulp'),
          browsersync = require('browser-sync').create(),
          fileinclude = require('gulp-file-include'),
              cleaner = require('del'),
                 scss = require('gulp-sass')(require('sass')),
         autoprefixer = require('gulp-autoprefixer'),
          group_media = require('gulp-group-css-media-queries'),
            clean_css = require('gulp-clean-css'),
              renamer = require('gulp-rename'),
             clean_js = require('gulp-uglify-es').default,
             imagemin = require('gulp-imagemin'),
                 webp = require('gulp-webp'),
             webphtml = require('gulp-webp-html'),
              webpcss = require('gulp-webpcss'),
            svgSprite = require('gulp-svg-sprite')
             ttf2woff = require('gulp-ttf2woff'),
            ttf2woff2 = require('gulp-ttf2woff2'),
               fonter = require('gulp-fonter');

// ======================================================
// ------------------------------------------------------
// ===== Пути и папки ===================================

    // Папка финального проекта
    let project_folder = require("path").basename(__dirname);
    
    // Папка исходника
    let source_folder = "#src";
    // Файловая система
    let fs = require('fs');

    // Различные пути к файлам и папкам
    let path = {
        // Места куда будут выводиться файлы
        build: {
            html: project_folder + "/",
            css: project_folder + "/css/",
            js: project_folder + "/js/",
            js_libs: project_folder + "/js/libs/",
            img: project_folder + "/img/",
            fonts: project_folder + "/fonts/",
        },
        
        // Исходное место
        src: {
            html: [source_folder + "/*.html", "!" + source_folder + "/_*.html"],
            css_libs: source_folder + "/css/*.css",
            css: source_folder + "/scss/style.scss",
            js: source_folder + "/js/script.js",
            js_libs: source_folder + "/js/libs/**/*.js",
            img: source_folder + "/img/**/*.+(png|jpg|gif|ico|svg|webp)",
            fonts: source_folder + "/fonts/*.ttf",
        },
        
        // Пути к файлам, которые надо слушать
        watch: {
            html: source_folder + "/**/*.html",
            css: source_folder + "/scss/**/*.scss",
            css_libs: source_folder + "/css/*.css",
            js: source_folder + "/js/**/*.js",
            js_libs: source_folder + "/js/libs/**/*.js",
            img: source_folder + "/img/**/*.{jpg,jpeg,png,svg,gif,ico,webp}", /* Без пробелов */
        },

        // Указываем путь к папке проекта которая будет очищаться каждый раз, когда будет запускаться Gulp
        clean: "./" + project_folder + "/"
    }
// ======================================================
// ------------------------------------------------------
// ===== Задачи: ========================================
    
// Настройки browser-sync

    function browserSync(done) {
        browsersync.init({
            server: {
                baseDir: "./" + project_folder + "/"
            },
            port: 3000,
            notyfy: false
        })
    }

// ===== Работа с HTML ==================================
    
    function html() {
        return src(path.src.html)
        .pipe(fileinclude()) /* импорт html в html подробнее на сайте плагина*/
        .pipe(webphtml())   /* Заменяет конструкцию img на picture с подключением webp изображений */
        .pipe(dest(path.build.html))  /* Выгружаем html файл*/
        .pipe(browsersync.stream()) /* Обновление страницы */
    }

// ===== Работа с css ===================================

    function css() {
        return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
                /* compressed - скомпрессирован
                * expanted - без сжатия
                * compact - стили каждого блока в ряд
                * nested - хз
                */
            })
        )
        // Собираем медия запросы
        .pipe(
            group_media()
        )
        // Автопрефиксер
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        .pipe(webpcss({webpClass: '._webp',noWebpClass: '._no-webp'}))
        // Выгрузка файла
        .pipe(dest(path.build.css))
        // Чистим и сжимаем css файл
        .pipe(clean_css())
        // Переназываем файл
        .pipe(
            renamer({
                extname: ".min.css"
            })
        )
        // Выгрузка файла
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream()) /* Обновление страницы */
    }

    function cssDev() {
        return src(path.src.css)
        .pipe(
            scss({
                outputStyle: 'expanded'
                /* compressed - скомпрессирован
                * expanted - без сжатия
                * compact - стили каждого блока в ряд
                * nested - хз
                */
            })
        )
        // Собираем медия запросы
        .pipe(
            group_media()
        )
        // Автопрефиксер
        .pipe(
            autoprefixer({
                overrideBrowserslist: ['last 5 version'],
                cascade: true
            })
        )
        .pipe(webpcss({webpClass: '._webp',noWebpClass: '._no-webp'}))
        // Выгрузка файла
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream()) /* Обновление страницы */
    }

    function libs_css_upload() {
        return src(path.src.css_libs)
        .pipe(dest(path.build.css))
    }
// ===== Работа с JavaScript ===================================
    // JavaScript. Для поддержки старых браузеров установи Babel (https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbnRSd191VkFNZUljcDUzanE3eGRkXzI3WHlkZ3xBQ3Jtc0ttOUtkelptdDhZOGhRMGdwYmY5X0hyTVB4b1NqRnEzWEUtMW9LLVdLbVNMMWNQOU9XWEhaSFphVFFXRnJfSGdOb3U4ZFVlU0dFeW1YUm5kYTNYV1BvbEotSWI4Tk1nTFFoZXJZX0ZsS0RYT2ZtckwxQQ&q=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fgulp-babel) 
    function js() {
        return src(path.src.js)
        .pipe(fileinclude()) /* импорт файлов через @@include */
        // Выгружаем файл
        .pipe(dest(path.build.js)) 
        // Минифицируем и чистим
        .pipe(clean_js())
        // Переназываем
        .pipe(
            renamer({
                extname: ".min.js"
            })
        )
        // Выгружаем файл повторно
        .pipe(dest(path.build.js)) 
        // Обновление страницы
        .pipe(browsersync.stream()) 
    }

    function jsDev() {
        return src(path.src.js)
        .pipe(fileinclude()) /* импорт файлов через @@include */
        // Выгружаем файл
        .pipe(dest(path.build.js)) 
        .pipe(browsersync.stream()) 
    }

    function libs_js_upload() {
        return src(path.src.js_libs)
        .pipe(dest(path.build.js_libs))
        .pipe(browsersync.stream()) 
    }

// ===== Работа с картинками ===================================
    function images() {
        return src(path.src.img)
        .pipe(
            webp({
                quality: 90
            })
        )
        .pipe(dest(path.build.img)) 
        .pipe(src(path.src.img))
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 4 // 0 - 7
        }))
        .pipe(dest(path.build.img)) 
        .pipe(browsersync.stream()) /* Обновление страницы */
    }

    function imagesDev() {
        return src(path.src.img)
        .pipe(webp())
        .pipe(dest(path.build.img)) 
        .pipe(src(path.src.img))
        .pipe(dest(path.build.img)) 
        .pipe(browsersync.stream()) /* Обновление страницы */
    }

// ===== Собирает все svg иконки в один файл ================
    function svgSprites() {
        return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg',
                    example: true
                }
            },
        }
        ))
        .pipe(dest(path.build.img))
    };

// ===== Работа со шрифтами =============================

    function fonts() {
        src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));

        return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));
    }

    gulp.task('otf2ttf', function () {
        return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'));
    })

// ===== Запись шрифтов в файл стилей ===================
async function writeFonts() {
	let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
	if (file_content == '') {
		fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
		return fs.readdir(path.build.fonts, function (err, items) {
			if (items) {
				let c_fontname;
                fs.appendFile(source_folder + '/scss/fonts.scss', '// font-family ... file name ... weight ... style \r\n', cb);
				for (var i = 0; i < items.length; i++) {
					let fontname = items[i].split('.');
					fontname = fontname[0];
					if (c_fontname != fontname) {
						fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("what is font-family?", "' + fontname + '", "400", "normal");\r\n', cb);
					}
					c_fontname = fontname;
				}
			}
		})
	}
    }

    function cb() {}

// ===== Слушает файлы ==================================
    function watchFilesDev(param) {
        gulp.watch([path.watch.html],html)
        gulp.watch([path.watch.css],cssDev)
        gulp.watch([path.watch.css_libs],libs_css_upload)
        gulp.watch([path.watch.js],jsDev)
        gulp.watch([path.watch.js_libs],libs_js_upload)
        gulp.watch([path.watch.img],imagesDev)
    }

// ===== Чистит папку build ==============================

    function clean(param) {
        return cleaner(path.clean);
    }

// ======================================================
// ------------------------------------------------------
// ===== Планировщик ====================================

    let start = gulp.series(
        clean, 
        libs_css_upload, 
        libs_js_upload, 
        fonts, 
        svgSprites,
        writeFonts
    );

    let dev = gulp.series(
        jsDev, 
        cssDev, 
        libs_js_upload, 
        libs_css_upload, 
        imagesDev, 
        html,
        gulp.parallel(
            watchFilesDev, 
            browserSync
        )
    );
    let end = gulp.series(
        clean, 
        html, 
        css, 
        js, 
        libs_css_upload, 
        libs_js_upload, 
        images, 
        svgSprites, 
        fonts
    );
    
// ======================================================


// ===== Экспорт функций ================================
    exports.libs_js_upload = libs_js_upload;
    exports.libs_css_upload = libs_css_upload;
    exports.writeFonts = writeFonts;
    exports.fonts = fonts;
    exports.images = images;
    exports.imagesDev = imagesDev;
    exports.svgSprites = svgSprites;
    exports.js = js;
    exports.jsDev = jsDev;
    exports.css = css;
    exports.cssDev = cssDev;
    exports.html = html;
    exports.start = start;
    exports.end = end;
    exports.dev = dev;
    exports.default = dev;
// ===== /Экспорт функций ================================