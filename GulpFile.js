/** make sure you have installed node, npm , gulp, bower **/
var gulp = require('gulp');
var args = require('yargs').argv;
var $ = require('gulp-load-plugins')({lazy: true});
var del = require('del');
var config = require('./gulp.config')();
var port = process.env.PORT || config.defaultPort;
var browserSync = require('browser-sync');

gulp.task('help', $.taskListing);

gulp.task('default', ['help']);

gulp.task('vet', function() {
    log('Analyzing source with JSHint and JSCS');
    return gulp
        .src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        .pipe($.jscs())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'));
});

gulp.task('styles', ['clean-styles'], function() {
    log('Compiling Less -->  CSS');
    return gulp
        .src(config.less)
        .pipe($.plumber())
        .pipe($.less())
//        .on('error', errorLogger)
        .pipe(gulp.dest(config.temp));
});

gulp.task('clean', function(){
    var delConfig = [].concat(config.build, config.temp);
    log('** Cleaning ' + $.util.colors.blue(delConfig));
    del(delConfig);
});

gulp.task('clean-styles', function(){
    var files = config.temp + '**/*.css';
    clean(files);
});

gulp.task('clean-fonts', function(){
    clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-images', function(){
    clean(config.build + 'images/**/');
});

gulp.task('less-watcher', function (){
    gulp.watch([config.less], ['styles']);
});

gulp.task('wiredep', function(){
    var wiredep = require('wiredep').stream;
    var options = config.getWiredepDefaultOptions();
    log(options);
    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe($.inject(gulp.src(config.js)))
        .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles'], function(){
    return gulp
        .src(config.index)
        .pipe($.inject(gulp.src(config.css)))
        .pipe(gulp.dest(config.client));
});

gulp.task('serve-dev', ['inject'], function(){
    var isDev = true;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV' : isDev ? 'dev' : 'build'
        }
    };
    return $.nodemon(nodeOptions)
            .on('restart', function(ev){
                log('** nodemon restarted **');
                log('files changed on restar' + ev );
                setTimeout( function () {
                    browserSync.notify('reloading ... ');
                    browserSync.reload({stream: false});
                }, config.browserReloadDelay);
            })
            .on('start', function(){
                log('** nodemon started **');
                startBrowserSync();
            })
            .on('crash', function(){
                log('** nodemon crashed **');
            })
            .on('exit', function(){
                log('** nodemon exited **');
            });
});

gulp.task('fonts', ['clean-fonts'], function() {
    log('Copying fonts');
    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'fonts'))
});

gulp.task('images', ['clean-images'], function (){
   log('Copying and compressing images');
    return gulp
        .src(config.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'images'))
});


function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    del(path);
}

function errorLogger(error){
    log('** Start of the error **');
    log(error);
    log('** End of error **');
    this.emit('end');

}

function changeEvent(event){
   var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

function startBrowserSync() {
    if (browserSync.active){
       return; 
    }
    log('Starting browser sync on port' + port);
    gulp.watch([config.less], ['styles'])
        .on('chnage', function (event) { changeEvent(event);
    });
    var options = {
                    proxy: 'localhost:' + port,
                    port: 3000,
                    files: [config.client + '**/*.*',
                            '!' + config.less,
                           config.temp + '**/*.css'],
                    ghostMode: {
                        clicks: true,
                        scroll: true,
                        location: false,
                        forms: true
                    
                    },
                    injectChanges: true,
                    logFileChanges: true,
                    logLevel: 'debug',
                    logPrefix: 'gulp-patterns',
                    notify: true,
                    reloadDealy: 1000
                };
    browserSync(options);
}


function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}