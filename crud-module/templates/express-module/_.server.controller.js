'use strict';

/**
 * Module dependencies.
 */
var errorHandler = require('./errors.server.controller'),
	db = require('../../config/mysql'),
	<%= classifiedSingularName %> = db.<%= classifiedSingularName %>,
	_ = require('lodash');

/**
 * Create a <%= humanizedSingularName %>
 */
exports.create = function(req, res) {
	var <%= camelizedSingularName %> = <%= classifiedSingularName %>.build(req.body);
	<%= camelizedSingularName %>.UserId = req.user.id;

<%= camelizedSingularName %>.save().then(function() {
			res.jsonp(<%= camelizedSingularName %>);
	}).catch(function(err){
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Show the current <%= humanizedSingularName %>
 */
exports.read = function(req, res) {
	res.jsonp(req.<%= camelizedSingularName %>);
};

/**
 * Update a <%= humanizedSingularName %>
 */
exports.update = function(req, res) {
	var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ;

	<%= camelizedSingularName %> = _.extend(<%= camelizedSingularName %> , req.body);

	<%= camelizedSingularName %>.save().then(function(err) {
		res.jsonp(<%= camelizedSingularName %>);
	}).catch(function(err){
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * Delete an <%= humanizedSingularName %>
 */
exports.delete = function(req, res) {
	var <%= camelizedSingularName %> = req.<%= camelizedSingularName %> ;

	<%= camelizedSingularName %>.destroy().then(function() {
		res.jsonp(<%= camelizedSingularName %>);
	}).catch(function(err) {
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * List of <%= humanizedPluralName %>
 */
exports.list = function(req, res) { 
	<%= classifiedSingularName %>.findAll({
		include: [{ model: db.User, attributes: ['displayName'] }],
		order: [['createdAt', 'DESC']]
	}).then(function(<%= camelizedPluralName %>) {
		res.jsonp(<%= camelizedPluralName %>);
	}).catch(function(err){
		return res.status(400).send({
			message: errorHandler.getErrorMessage(err)
		});
	});
};

/**
 * <%= humanizedSingularName %> middleware
 */
exports.<%= camelizedSingularName %>ByID = function(req, res, next, id) { 
	<%= classifiedSingularName %>.find({
			where: { id: id },
			include: [{ model: db.User, attributes: ['displayName'] }]
		}).then(function(<%= camelizedSingularName %>) {
			if (! <%= camelizedSingularName %>) 
				return next(new Error('Failed to load <%= humanizedSingularName %> ' + id));
			req.<%= camelizedSingularName %> = <%= camelizedSingularName %> ;
			next();
		}).catch(function(err){
			return next(err);
		});
};

/**
 * <%= humanizedSingularName %> authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.<%= camelizedSingularName %>.UserId !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
