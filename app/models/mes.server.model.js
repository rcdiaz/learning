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
        required: 'Please fill Mes name',
        trim: true
    },
	alumnoMes: [{
		type: Schema.ObjectId,
		ref: 'AlumnoMes'
	}],
	/*curso: [{
        type: Schema.ObjectId,
        ref: 'Curso'
    }],
	cursos: [{
		type: Schema.ObjectId,
		ref: 'Curso'
	}],*/
	created: {
		type: Date,
		default: Date.now
	}
});

mongoose.model('Mes', MesSchema);
