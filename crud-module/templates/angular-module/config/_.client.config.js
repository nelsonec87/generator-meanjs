'use strict';

// Configuring the new module
angular.module('<%= slugifiedPluralName %>').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('<%= menuId %>', '<%= humanizedPluralName %>', '<%= slugifiedPluralName %>', 'dropdown', '/<%= slugifiedPluralName %>(/create)?');
		Menus.addSubMenuItem('<%= menuId %>', '<%= slugifiedPluralName %>', 'Listar <%= humanizedPluralName %>', '<%= slugifiedPluralName %>');
		Menus.addSubMenuItem('<%= menuId %>', '<%= slugifiedPluralName %>', 'Novo <%= humanizedSingularName %>', '<%= slugifiedPluralName %>/create');
	}
]);
