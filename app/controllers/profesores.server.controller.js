'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Profesore = mongoose.model('Profesore'),
	_ = require('lodash');

/**
 * Create a Profesore
 */
exports.create = function(req, res) {
	var profesore = new Profesore(req.body);
	profesore.user = req.user;

	profesore.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profesore);
		}
	});
};

/**
 * Show the current Profesore
 */
exports.read = function(req, res) {
	res.jsonp(req.profesore);
};

/**
 * Update a Profesore
 */
exports.update = function(req, res) {
	var profesore = req.profesore ;

	profesore = _.extend(profesore , req.body);

	profesore.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profesore);
		}
	});
};

/**
 * Delete an Profesore
 */
exports.delete = function(req, res) {
	var profesore = req.profesore ;

	profesore.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(profesore);
		}
	});
};

/**
 * List of Profesores
 */
exports.list = function(req, res) {

	var sort;
	var sortObject = {};
	var count = req.query.count || 5;
	var page = req.query.page || 1;


	var filter = {
		filters : {
			mandatory : {
				contains: req.query.filter
			}
		}
	};

	var pagination = {
		start: (page - 1) * count,
		count: count
	};

	if (req.query.sorting) {
		var sortKey = Object.keys(req.query.sorting)[0];
		var sortValue = req.query.sorting[sortKey];
		sortObject[sortValue] = sortKey;
	}
	else {
		sortObject.desc = '_id';
	}

	sort = {
		sort: sortObject
	};


	Profesore
		.find()
		.filter(filter)
		.order(sort)
		.page(pagination, function(err, profesores){
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				res.jsonp(profesores);
			}
		});

};

/**
 * Profesore middleware
 */
exports.profesoreByID = function(req, res, next, id) {
	Profesore.findById(id).populate('user', 'displayName').exec(function(err, profesore) {
		if (err) return next(err);
		if (! profesore) return next(new Error('Failed to load Profesore ' + id));
		req.profesore = profesore ;
		next();
	});
};

/**
 * Profesore authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.profesore.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
