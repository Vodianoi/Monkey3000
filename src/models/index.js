'use strict';

const fs        = require('fs');
const path      = require('path');
const Sequelize = require('sequelize');
const basename  = path.basename(__filename);
const config    = require('../config/db.js');
const db        = {};

var sequelize = new Sequelize(config.database, config.username, config.password, config.options);

// sequelize
//     .sync({ force: true })
//     .then(function(err) {
//         console.log('It worked!');
//     }, function (err) {
//         console.log('An error occurred while creating the table:', err);
//     });

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});



db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;