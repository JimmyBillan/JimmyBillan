var card 	= require('./card/card.js');

var credit = {
		nom : "Billan",
		prenom : "Jimmy",
		domain : "http://jimmybillan.fr",
		domainSecure : "https://jimmybillan.fr"
};

// HTTPS - POST
exports.loginPost = function(req,res) {
	var accueil= {credit : credit};
	var login 	= require('./login/login.js');

	login.login(req.body, function(err, o) {
		if(!err){
			req.session.user = o.mail;
			res.redirect('/auth/panel');
		}else{
			res.render('login', accueil);
		}
		
	});
	
}


// HTTPS - GET
exports.login = function(req, res){
	var accueil= {credit : credit};
	if(req.session.user){
		res.redirect('/auth/panel');
	}else{
		res.render('login', accueil);
	}
}



// HTTP - GET
exports.accueil = function(req, res) {
	var accueil= {credit : credit};

	card.getCards(function(rows) {
		accueil.rowsCard = rows;
		res.render('accueil', accueil);
	})
}