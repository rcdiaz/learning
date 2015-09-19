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
    alumno: {
        type: Schema.ObjectId,
        ref: 'Alumno'
    }
});

mongoose.model('Profesore', ProfesoreSchema);
