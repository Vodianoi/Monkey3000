module.exports = (sequelize, DataTypes) => {
    var Enclos =  sequelize.define('Enclos', {
        name: DataTypes.STRING
    });

    Enclos.associate = function(models) {
        models.Enclos.hasMany(models.Monkey);
    };

    module.exports.getEnclosById = function(id, callback){
        Enclos.findById(id, callback);
    };

    return Enclos;


};