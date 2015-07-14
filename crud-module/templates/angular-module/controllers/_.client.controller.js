/// <reference path="../../../../typings/jquery/jquery.d.ts"/>

// <%= dados.camel %> controller
angular.module('<%= dados.minusculo %>').controller('<%= dados.camel %>Controller', ['$rootScope','$scope', '$stateParams', '$location', '<%= dados.camel %>', <% _.each(dados.campos, function(campo) { if(campo.fk) { %> '<%=campo.fk.entidade%>',<% } }); %> '$timeout',
	function ($rootScope, $scope, $stateParams, $location, <%= dados.camel %>, <% _.each(dados.campos, function(campo) { if(campo.fk) { %> <%=campo.fk.entidade%>,<% } }); %> $timeout) {
		$scope.novo = {};
		$scope.msg = {};
		
		if(!~$rootScope.$state.current.name.indexOf(".list")){
			<% var timer = 0; _.each(dados.campos, function(campo) { if(campo.fk) { timer += 200; %>
			$timeout(function () {
				$scope.<%=campo.fk.entidade%>s = <%=campo.fk.entidade%>.query(function () {
					$timeout(function () {
						$scope.<%=campo.fk.entidade%>s.push({<%=campo.fk.label%>: 'nenhum', <%=campo.fk.key || campo.nome%>: ''});
						$timeout(function () { $('.chosen-select').trigger('chosen:updated'); });
					});
				});
			}, <%= timer%>);
			<% } }) %>
		}
		// Create new <%= dados.camel %>
		$scope.create = function (form) {
			if (form.$invalid) return;
			
			// Create new <%= dados.camel %> object
			var <%= dados.minusculo %> = new <%= dados.camel %>($scope.novo);

			// Redirect after save
			<%= dados.minusculo %>.$save({ JSON: JSON.stringify(<%= dados.minusculo %>) }, function (response) {
				$location.path('index/<%=dados.menu.url%>/<%= dados.minusculo %>/' + response.<%= dados.pk %> + '/edit');
				alert('Registro salvo!');
				$location.path('index/<%=dados.menu.url%>/<%= dados.minusculo %>');
			}, function (errorResponse) {
				$scope.error = errorResponse.data.error;
				console.log(errorResponse.data.error);
			});
		};

		// Remove existing <%= dados.camel %>
		$scope.remove = function (<%= dados.minusculo %>) {
			if (confirm('Confirma Exclusão?'))
				$scope.<%= dados.minusculo %>.$remove({ <%= dados.pk %>: <%= dados.minusculo %>.<%= dados.pk %> }, function () {
					$location.path('index/<%=dados.menu.url%>/<%= dados.minusculo %>');
				});
		};

		// Update existing <%= dados.camel %>
		$scope.update = function () {
			var <%= dados.minusculo %> = $scope.<%= dados.minusculo %>;
			<%= dados.minusculo %>.$save({ JSON: JSON.stringify(<%= dados.minusculo %>) }, function () {
				alert('Registro salvo!');
				$location.path('index/<%=dados.menu.url%>/<%= dados.minusculo %>');
			}, function (errorResponse) {
				$scope.error = errorResponse.data.error;
			});
		};

		// Find a list of <%= dados.camel %>
		$scope.find = function () {
			$scope.<%= dados.minusculo %> = <%= dados.camel %>.query();
		};

		// Find existing <%= dados.camel %>
		$scope.findOne = function () {
			$scope.<%= dados.minusculo %> = <%= dados.camel %>.get({
				<%= dados.pk %>: $stateParams.<%= dados.minusculo %>Id
			});
		};
	}
]);