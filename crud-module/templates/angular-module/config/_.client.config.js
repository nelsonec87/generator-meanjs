// Configuring the new module
angular.module('<%= dados.minusculo %>').run(['$rootScope',
	function($rootScope) {
		<% if (dados.submenu) { %>
		$rootScope.menus = $rootScope.menus || {};
		$rootScope.menus['<%=dados.menu.url%>'] = $rootScope.menus['<%=dados.menu.url%>'] || { nome: '<%= dados.menu.nome %>', sub: []};
		$rootScope.menus['<%=dados.menu.url%>'].sub.push({label: '<%= dados.submenu %>', sref: 'index.<%=dados.menu.url%>.list<%= dados.camel %>'});
		<% } %>
	}
]);

