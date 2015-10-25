class Login{
		validateEmail(email) {
		    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
		    return re.test(email);
		}

		validatePassword(password){
			var r = false;
			if(password.length > 12)r = true;
			
			return r;
		}

		constructor(mail, password){
			this.mail = mail;
			this.password = password;
			this.validMail = this.validateEmail(this.mail);
			this.validPassword = this.validatePassword(this.password);
		}
}


exports.login = function(body, cb) {
	var l = new Login(body.mail, body.password);
	
	if(l.validMail && l.validPassword){
		cb(false, l);
	}else{
		cb(true, l);
	}
};