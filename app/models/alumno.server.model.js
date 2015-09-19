'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Alumno Schema
 */
var AlumnoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Alumno name',
		trim: true
	},
	apellido1: {
		type: String,
		default: '',
		required: 'Please fill Alumno apellido1',
		trim: true
	},
	apellido2: {
		type: String,
		default: '',
		required: 'Please fill Alumno apellido2',
		trim: true
	},
	telefono: {
		type: String,
		default: '',
		required: 'Please fill Alumno telefono',
		trim: true
	},
	dni: {
		type: String,
		default: '',
		required: 'Please fill Alumno dni',
		trim: true
	},
	email: {
		type: String,
		default: '',
		required: 'Please fill Alumno e-mail',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Alumno', AlumnoSchema);
