process.env.NODE_ENV = process.env.NODE_ENV || 'prod';

var config 		= require('./config/config');
var express     = require('./config/express');
var path 		= require('path');
var app         = express();


app.set('views', __dirname+'/app/views');
app.set('view engine', 'jade');


app.listen(config.portHttp, config.ipAllowed);
module.exports = app;
console.log(process.env.NODE_ENV  + ' server running at http://localhost:' + config.portHttp);



var https 		= require('https');
var expresss    = require('./config/expressHTTPS');
var apps        = expresss();
var fs 			= require('fs');


apps.set('views', __dirname+'/app/views');
apps.set('view engine', 'jade');

var options = {
        key  : fs.readFileSync(path.join(__dirname,'../cert/key.pem')),
        ca   : fs.readFileSync(path.join(__dirname,'../cert/csr.pem')),
        cert : fs.readFileSync(path.join(__dirname,'../cert/cert.pem'))
}

https.createServer(options, apps).listen(config.portHttps, config.ipAllowed);
//apps.listen(config.portHttps, config.ipAllowed);
module.exports = app;
console.log(process.env.NODE_ENV  + ' server secure running at http://localhost:' + config.portHttps);


