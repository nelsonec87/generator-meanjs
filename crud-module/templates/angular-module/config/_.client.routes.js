'use strict';

//Setting up route
angular.module('<%= slugifiedPluralName %>').config(['$stateProvider',
	function($stateProvider) {
		// <%= humanizedPluralName %> state routing
		$stateProvider.
		state('app.list<%= classifiedPluralName %>', {
			url: '/<%= slugifiedPluralName %>',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/list-<%= slugifiedPluralName %>.client.view.html'
		}).
		state('app.create<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/create',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/create-<%= slugifiedSingularName %>.client.view.html'
		}).
		state('app.view<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/view-<%= slugifiedSingularName %>.client.view.html',
			controller: '<%= classifiedPluralName %>Controller'
		}).
		state('app.edit<%= classifiedSingularName %>', {
			url: '/<%= slugifiedPluralName %>/:<%= camelizedSingularName %>Id/edit',
			templateUrl: 'modules/<%= slugifiedPluralName %>/views/edit-<%= slugifiedSingularName %>.client.view.html'
		});
	}
]);