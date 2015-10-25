var backend = require('../../app/controllers/backend');

function requireLogin (req, res, next) {
  if (!req.session.user) {
    res.redirect('/auth/login');
  } else {
    next();
  }
};


module.exports = function(app) {

		app.use('/auth/*',requireLogin, function(req, res, next){
	        next()
	    });
		app.route('/auth/panel').get(backend.panel);
};