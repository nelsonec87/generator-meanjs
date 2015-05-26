'use strict';


module.exports = function (sequelize, DataTypes) {
	return sequelize.define('<%= classifiedSingularName %>', {
		nome: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { notEmpty: { msg: 'Nome é obrigatório' } }
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