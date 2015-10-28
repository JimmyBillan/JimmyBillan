
var sqlite3 	= require('sqlite3').verbose();
var config = require('../../../config/config.js');



class Login{
		validateEmail(email) {
		    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		    return re.test(email);
		}

		validatePassword(password){
			var r = false;
			if(password.length >= 12)r = true;
			
			return r;
		}

		hashPassword(mail, password){
			var crypto 	= require('crypto');
			var shasum = crypto.createHash(config.hashPassword);
			shasum.update(config.generatePasswordString(mail, password));
			return shasum.digest('hex');
		}

		comparePassword(cb){
			var db 		= new sqlite3.Database('jimmybillan.db');

			db.get('SELECT mail FROM Users WHERE mail = ? AND password = ?',[this.mail, this.password], function(err, row) {			
				cb(err, row);
				db.close();

			})
			
			
		}

		constructor(mail, password){
			this.mail = mail;
			this.password = password;
			this.validMail = this.validateEmail(this.mail);
			this.validPassword = this.validatePassword(this.password);
			this.password = this.hashPassword(this.mail, this.password);
		}
}


exports.login = function(body, cb) {
	var l = new Login(body.mail, body.password);
	
	if(l.validMail && l.validPassword){
		
		l.comparePassword(function(err, user) {
			
			if(err || user === undefined){
				cb(true, err);
			}else{
				cb(false, user);
			}
			
		});	
	}else{
		cb(true, l);
	}
};