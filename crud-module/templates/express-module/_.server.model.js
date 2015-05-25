'use strict';


module.exports = function (sequelize, DataTypes) {
	return sequelize.define('<%= classifiedSingularName %>', {
		name: {
			type: DataTypes.STRING,
			validate: { notEmpty: { msg: 'Name cannot be blank' } }
		}
	}, {
			classMethods: {
				associate: function (models) {
					models.<%= classifiedSingularName %>.belongsTo(models.User, {
						onDelete: 'CASCADE',
					});
				}
			}
		});
};