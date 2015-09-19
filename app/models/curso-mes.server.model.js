'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;


/**
 * CursoMes Schema
 */
var CursoMesSchema = new Schema({
	fecha: {
		type: Date,
		default: '',
		trim: true
	},
	mes: {
		type: String,
		default: '',
		required: 'Please fill mes',
		trim: true
	},
	anio: {
		type: String,
		default: '',
		required: 'Please fill año',
		trim: true
	},
	alumnoMes: [{
		type: Schema.ObjectId,
		ref: 'AlumnoMes'
	}]
});

mongoose.model('CursoMes', CursoMesSchema);
