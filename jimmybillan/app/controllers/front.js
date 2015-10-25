

exports.login = function(req, res){
	res.json({err:err});
}


exports.accueil = function(req, res) {
	A = {
		nom : "Billan",
		prenom : "Jimmy"
	}

	res.render('accueil', A);
}