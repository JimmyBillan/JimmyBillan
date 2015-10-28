var card 	= require('./card/card.js');

var credit = {
		nom : "Billan",
		prenom : "Jimmy",
		domain : "http://jimmybillan.fr",
		domainSecure : "https://jimmybillan.fr"
};

// HTTPs - GET
exports.panel = function(req,res) {
	var panel= {credit : credit};
	card.getCards(function(rows) {
		panel.rowsCard = rows;
		res.render('panel', panel);
	})
	
	
}

// HTTPs - GET
exports.logout = function(req, res) {
	req.session.destroy();
	res.redirect(credit.domain);
}



//HTTPs - POST - CARD
exports.addCard = function(req, res) {
	card.addCard(req.body);
	res.sendStatus(200);
}

//HTTPs - GET - CARD

exports.getCard = function(req,res) {
	card.getCard(req.params.id, function(card) {
		res.json(card);
	})
}

//HTTPs - DELETE - CARD
exports.deleteCard = function(req,res) {
	card.deleteCard(req.params.id, function(err) {
		if(!err){
			res.sendStatus(200);
		}else{
			res.sendStatus(500);
		}
	});
}

exports.updateCard = function(req, res) {
	card.updateCard(req.params.id, req.body, function(err) {
		if(!err){
			res.sendStatus(200);
		}else{
			res.sendStatus(500);
		}
	})
}