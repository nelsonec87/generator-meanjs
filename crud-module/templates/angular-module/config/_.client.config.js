'use strict';

// Configuring the new module
angular.module('<%= dados.minusculo %>').run(['$rootScope',
	function($rootScope) {
		$rootScope.menus = $rootScope.menus || [];
		$rootScope.menus.push({label: '<%= dados.menu %>', sref: 'index.list<%= dados.camel %>'});
	}
]);
