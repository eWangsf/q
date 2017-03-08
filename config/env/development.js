'use strict';

module.exports = {
    app: {
        title: 'app - development',
        description: 'description of app',
        keywords: 'app keyword '
    },
    db: {
        uri: 'mongodb://localhost/app',
        // Enable mongoose debug mode
        debug: true
    },
    port: process.env.PORT || 3000,
    host: process.env.HOST || 'localhost',
    templateEngine: 'swig',
    // sessionSecret should be changed for security measures and concerns
    sessionSecret: process.env.SESSION_SECRET || 'MEAN'
}


