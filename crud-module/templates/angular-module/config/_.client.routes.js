'use strict';

//Setting up route
angular.module('<%= dados.minusculo %>').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider.
		state('index.<%=dados.menu.url%>.list<%= dados.camel %>', {
			url: '/<%= dados.minusculo %>',
			templateUrl: 'js/modules/<%= dados.minusculo %>/views/list-<%= dados.minusculo %>.client.view.html'
		}).
		state('index.<%=dados.menu.url%>.create<%= dados.camel %>', {
			url: '/<%= dados.minusculo %>/create',
			templateUrl: 'js/modules/<%= dados.minusculo %>/views/create-<%= dados.minusculo %>.client.view.html'
		}).
		state('index.<%=dados.menu.url%>.view<%= dados.camel %>', {
			url: '/<%= dados.minusculo %>/:<%= dados.minusculo %>Id',
			templateUrl: 'js/modules/<%= dados.minusculo %>/views/view-<%= dados.minusculo %>.client.view.html',
			controller: '<%= dados.camel %>Controller'
		}).
		state('index.<%=dados.menu.url%>.edit<%= dados.camel %>', {
			url: '/<%= dados.minusculo %>/:<%= dados.minusculo %>Id/edit',
			templateUrl: 'js/modules/<%= dados.minusculo %>/views/edit-<%= dados.minusculo %>.client.view.html'
		});
	}
]);