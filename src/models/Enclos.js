module.exports = (sequelize, DataTypes) => {
    var Enclos =  sequelize.define('Enclos', {
        name: DataTypes.STRING,

    });

    // Enclos.associate = function(models) {
    //     models.Enclos.hasMany(models.Monkey);
    // };


    return Enclos;


};