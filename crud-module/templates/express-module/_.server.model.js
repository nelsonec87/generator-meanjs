'use strict';

module.exports = function (sequelize, DataTypes) {
	return sequelize.define('<%= classifiedSingularName %>', {
		<% _.each(fields, function(field, name) { %>
		<%=name%>: {
			type: <%=tipos[field.type]%>,
			allowNull: <%=field.allowNull%>,
			validate: <%= JSON.stringify(field.validate)%>,
		},
		<% });%>
	}, {
			classMethods: {
				associate: function (models) {
					models.<%= classifiedSingularName %>.belongsTo(models.User, {
						onDelete: 'CASCADE',
					});
					<% _.each(hasMany, function(m){ %>
					models.<%= classifiedSingularName %>.hasMany(models.<%=m%>);
					<% });%>
				}
			}
		});
};