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
    certificacion: {
        type: String,
        default: '',
        required: 'Please fill certificacion',
        trim: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    mes: [{
        type: Schema.ObjectId,
        ref: 'Mes'
    }]
   /* cursoMes: [{
        type: Schema.ObjectId,
        ref: 'CursoMes'
    }]*/
});

mongoose.model('Curso', CursoSchema);
