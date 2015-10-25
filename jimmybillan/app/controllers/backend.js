var credit = {
		nom : "Billan",
		prenom : "Jimmy"
};

exports.panel = function(req,res) {
	var panel= {credit : credit};
	console.log(req.session.user);
	res.render('panel', panel);
}