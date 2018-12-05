module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Monkey', {
        name: DataTypes.STRING,
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },

        taille: DataTypes.INTEGER
    });

};