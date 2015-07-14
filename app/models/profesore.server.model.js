'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Profesore Schema
 */
var ProfesoreSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Nombre',
		trim: true
	},
	apellido1: {
		type: String,
		default: '',
		required: 'Please fill Apellido 1',
		trim: true
	},
	apellido2: {
		type: String,
		default: '',
		required: 'Please fill Apellido 2',
		trim: true
	},
	telefono: {
		type: String,
		default: '',
		required: 'Please fill Teléfono',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Profesore', ProfesoreSchema);
