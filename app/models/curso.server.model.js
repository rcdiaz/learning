'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Curso Schema
 */
var CursoSchema = new Schema({
    name: {
        type: String,
        default: '',
        required: 'Please fill Curso name',
        trim: true
    },
    descripcion: {
        type: String,
        default: '',
        required: 'Please fill Curso descripcion',
        trim: true
    },
    Intensivo: {
        type: Boolean,
        default: '',
        trim: true
    },
    fechaIni: {
        type: Date,
        default: '',
        required: 'Please fill Curso fechaIni',
        trim: true
    },
    fechaFin: {
        type: Date,
        default: '',
        required: 'Please fill Curso fechaFin',
        trim: true
    },
    duracion: {
        type: String,
        default: '',
        required: 'Please fill Curso duracion',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    profesor: {
        type: Schema.ObjectId,
        ref: 'Profesor'
    },
    cursoMes: [{
        type: Schema.ObjectId,
        ref: 'Profesor'
    }]
});

mongoose.model('Curso', CursoSchema);
