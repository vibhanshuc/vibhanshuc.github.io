module.exports = function () {
    'use strict';
    var client  = './src/client/', clientApp = client + 'app/', temp = '.tmp/', server = './src/server', config;
    
    config = {
        alljs: [
            './src/**/*.js',
            './*.js'
        ],
        client: client,
        build: './build/',
        less : client + 'styles/styles.less',
        index: client + 'index.html',
        js: [
            clientApp + '**/*.module.js',
            clientApp + '**/*.js',
            '!' + clientApp + '**/*.spec.js'

        ],
        css: temp + 'styles.css',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        images: client + 'images/**/*.*',
        server: server,
        temp : temp,
        
        bower : {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },
        
        defaultPort: 7203,
        nodeServer: './src/server/app.js',
        browserReloadDealy: 1000,
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson : config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    return config;
};