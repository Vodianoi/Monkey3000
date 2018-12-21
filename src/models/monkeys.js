module.exports = (sequelize, DataTypes) => {
    var Monkey =  sequelize.define('Monkey', {
        name: DataTypes.STRING,
        taille: DataTypes.INTEGER,
        enclos: DataTypes.INTEGER
    });

    Monkey.associate = function (models) {
        models.Monkey.belongsTo(models.Enclos, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    module.exports.getMonkeyById = function(id, callback){
        Monkey.findById(id, callback);
    };

    return Monkey;


};