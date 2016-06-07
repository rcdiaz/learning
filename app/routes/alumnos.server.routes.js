'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var alumnos = require('../../app/controllers/alumnos.server.controller');

	// Alumnos Routes
	app.route('/alumnos')
		.get(alumnos.list)
		.post(alumnos.create);

	//Alumnos select2 cursos
	app.route('/alumnos/:all')
		.get(alumnos.getAll);

	app.route('/alumnos/:alumnoId')
		.get(alumnos.read)
		.put(alumnos.update)
		.delete(alumnos.delete);

	// Finish by binding the Alumno middleware
	app.param('alumnoId', alumnos.alumnoByID);
};
