'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Alumno Schema
 */
var AnioLectivoSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Alumno name',
		trim: true
	},
	meses: [{
		type: Schema.ObjectId,
		ref: 'Mes'
	}],
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('AnioLectivoSchema', AnioLectivoSchema);
