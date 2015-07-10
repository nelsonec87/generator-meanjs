var util = require('util'),
	inflections = require('underscore.inflections'),
	yeoman = require('yeoman-generator'),
	fs = require('fs');


var ModuleGenerator = yeoman.generators.NamedBase.extend({
	init: function () {
		eval('this.dados=' + fs.readFileSync(this.name + '.js', 'utf8'));
		// this.dados = obj;
	},

	renderModule: function () {
		// Create module folder
		this.mkdir('js/modules/' + this.dados.minusculo);

		// Render angular module files
		this.template('angular-module/config/_.client.routes.js', 'js/modules/' + this.dados.minusculo + '/config/' + this.dados.minusculo + '.client.routes.js');
		this.template('angular-module/controllers/_.client.controller.js', 'js/modules/' + this.dados.minusculo + '/controllers/' + this.dados.minusculo + '.client.controller.js');
		this.template('angular-module/services/_.client.service.js', 'js/modules/' + this.dados.minusculo + '/services/' + this.dados.minusculo + '.client.service.js');

		// Render menu configuration
		this.template('angular-module/config/_.client.config.js', 'js/modules/' + this.dados.minusculo + '/config/' + this.dados.minusculo + '.client.config.js');

		// Render angular module views
		this.template('angular-module/views/_.create.client.view.html', 'js/modules/' + this.dados.minusculo + '/views/create-' + this.dados.minusculo + '.client.view.html');
		this.template('angular-module/views/_.edit.client.view.html', 'js/modules/' + this.dados.minusculo + '/views/edit-' + this.dados.minusculo + '.client.view.html');
		this.template('angular-module/views/_.list.client.view.html', 'js/modules/' + this.dados.minusculo + '/views/list-' + this.dados.minusculo + '.client.view.html');

		// Render angular module definition
		this.template('angular-module/_.client.module.js', 'js/modules/' + this.dados.minusculo + '/' + this.dados.minusculo + '.client.module.js');
		
		this.template('index.html', 'js/modules/' + this.dados.minusculo + '/' + this.dados.minusculo + '.index.html');
	}
});

module.exports = ModuleGenerator;