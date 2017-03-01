'use strict';

module.exports = {
    client: {
        lib: {
            js: [
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/bootstrap/dist/js/bootstrap.min.js',

                // angulars & plugins
                'public/lib/angular/angular.min.js',       
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-strap/dist/angular-strap.min.js',
                'public/lib/angular-strap/dist/angular-strap.tpl.min.js',
                'public/lib/angular-ui-router/release/angular-ui-router.min.js',
                // angular and plugins end
                // 'public/lib/handlebars/handlebars.js',
                // 'public/lib/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.min.js',
                // 'public/lib/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.all.min.js',
                "public/lib/summernote/dist/summernote.js",

                // user defined js
                'public/js/*.js'       
            ],
        },
        css: [
            'public/lib/bootstrap/dist/css/bootstrap.css',
            'public/lib/bootstrap/dist/css/bootstrap-theme.css',
            'public/lib/angular-motion/dist/angular-motion.min.css',
            // 'public/lib/bootstrap3-wysihtml5-bower/dist/bootstrap3-wysihtml5.min.css',
            'public/lib/summernote/dist/summernote.css',
            'public/css/common.css',
            'public/css/index.css',
            'public/css/admin.css'
        ],
        js: [
            'modules/client/app/config.js',
            'modules/client/app/init.js',
            'modules/client/*.js',    
            'modules/client/**/*.js'     
        ],
        img: [
            'public/images/*.jpg',
            'public/images/*.png',
            'public/images/*.gif',
            'public/images/*.svg'
        ],
        less: [
            'public/less/*.less'
        ],
        sass: [
            'public/scss/*.scss'
        ],
        views: [
            'modules/client/views/*.html',
            'modules/client/views/**/*.html'
        ],
        templates: ['build/templates.js']
    },
    server: {
        gulpConfig: ['gulpfile.js'],
        allJS: ['server.js', 'config/**/*.js', 'modules/server/**/*.js'],
        models: 'modules/server/models/*.js',
        routes: ['modules/server/routes/*.js'],
        views: ['modules/server/views/*.html']
    }
};
