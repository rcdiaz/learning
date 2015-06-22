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
		required: 'Please fill Profesore name',
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