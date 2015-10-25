var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
	morgan      = require('morgan');

    var path = require('path');


module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));


    app.use(bodyParser.json());
	app.use(morgan('dev'));

    app.use('/static', express.static(path.join(__dirname,'../app/views/public/')));

    console.log(path.join(__dirname,'../app/views/public/'));
	require('../app/routes/front.js')(app);
    return app;
};