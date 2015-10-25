var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
	morgan      = require('morgan');
var path        = require('path');
var session     = require('express-session');




module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.use(bodyParser.json());
	app.use(morgan('dev'));

    app.use('/static', express.static(path.join(__dirname,'../app/views/public/')));
    console.log(path.join(__dirname,'../app/views/public/'));

    app.use(session({
      secret: config.sessionSecret,
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))

   

	require('../app/routes/front_s.js')(app);

    require('../app/routes/backend.js')(app);

    return app;
};