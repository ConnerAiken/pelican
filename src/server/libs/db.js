import utils from "./utils";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import _ from "lodash";

let db = {};

utils.loadENV(); 

const sequelize = new Sequelize(process.env.mysqlDB, process.env.mysqlUser, process.env.mysqlPassword, {
  dialect: 'mysql',
  host: process.env.mysqlHost,
  port: 3306, 
  timestamps: true, 
  paranoid: true,
  pool: { 
    max: 20,
    idle: 30000
  },
})

fs.readdirSync(path.join(process.cwd(), 'src', 'server', 'models')).filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
.forEach(file => {
  var model = sequelize.import(path.join(process.cwd(), 'src', 'server', 'models', file))
  db[model.name] = model
});

Object.keys(db).forEach(function(modelName) {
  if (db[modelName].options.hasOwnProperty('associate')) {
    db[modelName].options.associate(db)
  }
});

module.exports = _.extend({
sequelize: sequelize,
Sequelize: Sequelize
}, db)