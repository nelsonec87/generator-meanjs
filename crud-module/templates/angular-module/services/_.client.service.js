angular.module('<%= dados.minusculo %>').factory('<%= dados.camel %>', ['EndPointFactory',
	function (EndPointFactory) {
		return EndPointFactory.get('<%= dados.entidade %>', '<%= dados.pk %>')
	}
]);