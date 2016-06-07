'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * AlumnoMes Schema
 */
var AlumnoMesSchema = new Schema({
	pagado: {
		type: Boolean,
		default: '',
		required: 'Please fill pagado',
		trim: true
	},
	idAlumno: {
		type: Schema.ObjectId,
		ref: 'Alumno'
	}
});

mongoose.model('AlumnoMes', AlumnoMesSchema);
