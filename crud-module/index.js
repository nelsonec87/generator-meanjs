'use strict';
var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator'),
	fs = require('fs');

var fields = ['slugifiedPluralName', 'slugifiedSingularName', 'camelizedPluralName', 'camelizedSingularName',
	'classifiedPluralName', 'classifiedSingularName', 'humanizedPluralName', 'humanizedSingularName',
	'menuId', 'addMenuItems', 'fields', 'hasMany', 'tables'];

var ModuleGenerator = yeoman.generators.NamedBase.extend({
	init: function () {
		this.tipos = { 'string': 'DataTypes.STRING', 'date': 'DataTypes.DATE' }

		this.todos = [];
		var arquivos = fs.readdirSync('generators');

		for (var i in arquivos) {
			// console.log('-', arquivos[i], !!~arquivos[i].indexOf('.js'))
			if (~arquivos[i].indexOf('.js'))
				eval('this.todos.push(' + fs.readFileSync('generators/' + arquivos[i], 'utf8') + ')');
		}
	},

	renderModule: function () {
		// Create module folder
		for (var i in this.todos) {
			for (var j in fields)
				this[fields[j]] = this.todos[i][fields[j]];

			this.mkdir('public/modules/' + this.slugifiedPluralName);
			// Render express module files
			this.template('express-module/_.server.controller.js', 'app/controllers/' + this.slugifiedPluralName + '.server.controller.js');
			this.template('express-module/_.server.model.js', 'app/models/' + this.slugifiedSingularName + '.server.model.js');
			this.template('express-module/_.server.routes.js', 'app/routes/' + this.slugifiedPluralName + '.server.routes.js');

			// Render angular module files
			this.template('angular-module/config/_.client.routes.js', 'public/modules/' + this.slugifiedPluralName + '/config/' + this.slugifiedPluralName + '.client.routes.js');
			this.template('angular-module/controllers/_.client.controller.js', 'public/modules/' + this.slugifiedPluralName + '/controllers/' + this.slugifiedPluralName + '.client.controller.js');
			this.template('angular-module/services/_.client.service.js', 'public/modules/' + this.slugifiedPluralName + '/services/' + this.slugifiedPluralName + '.client.service.js');

			// Render menu configuration
			if (this.addMenuItems) {
				this.template('angular-module/config/_.client.config.js', 'public/modules/' + this.slugifiedPluralName + '/config/' + this.slugifiedPluralName + '.client.config.js');
			}

			// Render angular module views
			this.template('angular-module/views/_.create.client.view.html', 'public/modules/' + this.slugifiedPluralName + '/views/create-' + this.slugifiedSingularName + '.client.view.html');
			this.template('angular-module/views/_.edit.client.view.html', 'public/modules/' + this.slugifiedPluralName + '/views/edit-' + this.slugifiedSingularName + '.client.view.html');
			this.template('angular-module/views/_.list.client.view.html', 'public/modules/' + this.slugifiedPluralName + '/views/list-' + this.slugifiedPluralName + '.client.view.html');
			this.template('angular-module/views/_.view.client.view.html', 'public/modules/' + this.slugifiedPluralName + '/views/view-' + this.slugifiedSingularName + '.client.view.html');

			// Render angular module definition
			this.template('angular-module/_.client.module.js', 'public/modules/' + this.slugifiedPluralName + '/' + this.slugifiedPluralName + '.client.module.js');
		}
	}
});

module.exports = ModuleGenerator;