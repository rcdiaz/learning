'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var profesores = require('../../app/controllers/profesores.server.controller');

	// Profesores Routes
	app.route('/profesores')
		.get(profesores.list)
		.post(profesores.create);

	/*app.route('/profesores/:profesoreId')
		.get(profesores.read)
		.put(users.requiresLogin, profesores.hasAuthorization, profesores.update)
		.delete(users.requiresLogin, profesores.hasAuthorization, profesores.delete);*/

	app.route('/profesores/:profesoreId')
		.get(profesores.read)
		.put(profesores.update)
		.delete(profesores.delete);

	// Finish by binding the Profesore middleware
	app.param('profesoreId', profesores.profesoreByID);
};
