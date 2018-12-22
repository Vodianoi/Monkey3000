module.exports = (sequelize, DataTypes) => {
    var Monkey =  sequelize.define('Monkey', {
        name: DataTypes.STRING,
        taille: DataTypes.INTEGER
    });

    Monkey.associate = function (models) {
        models.Monkey.belongsTo(models.Enclos, {
            onDelete: "CASCADE",
            foreignKey: {
                name: 'EncloId',
                allowNull: false
            }
        });
    };


    return Monkey;


};