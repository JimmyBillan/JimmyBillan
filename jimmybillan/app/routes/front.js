var front = require('../../app/controllers/front');

module.exports = function(app) {
		app.route('/').get(front.accueil);
};