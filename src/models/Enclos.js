module.exports = (sequelize, DataTypes) => {
    var Enclos =  sequelize.define('Enclos', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
    });

    Enclos.associate = function(models) {
        models.Enclos.hasMany(models.Monkey);
    };

    module.exports.getEnclosById = function(id, callback){
        Enclos.findById(id, callback);
    };

    return Enclos;


};