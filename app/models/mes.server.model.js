'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * MesSchema Schema
 */
var MesSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Alumno name',
		trim: true
	},
	cursos: [{
		type: Schema.ObjectId,
		ref: 'Curso'
	}],
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Mes', MesSchema);
