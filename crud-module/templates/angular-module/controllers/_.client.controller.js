'use strict';

// <%= humanizedPluralName %> controller
angular.module('<%= slugifiedPluralName %>').controller('<%= classifiedPluralName %>Controller', ['$scope', '$stateParams', '$location', 'Authentication', 
	'<%= classifiedPluralName %>', <% _.each(tables, function(t){%>'<%=t.entity%>', <%});%>
	function($scope, $stateParams, $location, Authentication, <%= classifiedPluralName %><% _.each(tables, function(t){%>, <%=t.entity%><%});%>) {
		$scope.authentication = Authentication;

		// Create new <%= humanizedSingularName %>
		$scope.create = function(form) {
			if(form.$invalid) return;
			
			// Create new <%= humanizedSingularName %> object
			var <%= camelizedSingularName %> = new <%= classifiedPluralName %> ({
				nome: this.nome
			});

			// Redirect after save
			<%= camelizedSingularName %>.$save(function(response) {
				<% if(saveAction) { %>
				$location.path(<%=saveAction%>);
				<% } else { %>
				$location.path('<%= slugifiedPluralName %>/' + response.id);
				<% } %>
				// Clear form fields
				$scope.nome = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
		
		// Remove existing <%= humanizedSingularName %>
		$scope.remove = function(<%= camelizedSingularName %>) {
			if ( <%= camelizedSingularName %> ) { 
				<%= camelizedSingularName %>.$remove();

				for (var i in $scope.<%= camelizedPluralName %>) {
					if ($scope.<%= camelizedPluralName %> [i] === <%= camelizedSingularName %>) {
						$scope.<%= camelizedPluralName %>.splice(i, 1);
					}
				}
			} else {
				$scope.<%= camelizedSingularName %>.$remove(function() {
					<% if(saveAction) { %>
					$location.path(<%=saveAction%>);
					<% } else { %>
					$location.path('<%= slugifiedPluralName %>/' + response.id);
					<% } %>
				});
			}
		};

		// Update existing <%= humanizedSingularName %>
		$scope.update = function() {
			var <%= camelizedSingularName %> = $scope.<%= camelizedSingularName %>;

			<%= camelizedSingularName %>.$update(function() {
				<% if(saveAction) { %>
				$location.path(<%=saveAction%>);
				<% } else { %>
				$location.path('<%= slugifiedPluralName %>/' + <%= camelizedSingularName %>.id);
				<% } %>
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of <%= humanizedPluralName %>
		$scope.find = function() {
			$scope.<%= camelizedPluralName %> = <%= classifiedPluralName %>.query();
		};

		// Find existing <%= humanizedSingularName %>
		$scope.findOne = function() {
			$scope.<%= camelizedSingularName %> = <%= classifiedPluralName %>.get({ 
				<%= camelizedSingularName %>Id: $stateParams.<%= camelizedSingularName %>Id
			});
			
			<% _.each(tables, function(t){%>
			$scope.<%=t.list%> = <%=t.entity%>.by<%=classifiedSingularName%>({ <%= camelizedSingularName %> : $stateParams.<%= camelizedSingularName %>Id });
			<% });%>
		};
	}
]);