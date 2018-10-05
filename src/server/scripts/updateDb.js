import db from '../libs/db';
import fs from "fs";
import path from "path";
 

let storesSql = fs.readFileSync(path.join(__dirname, 'stores.sql')).toString();
let usersSql = fs.readFileSync(path.join(__dirname, 'users.sql')).toString();
let userInfosSql = fs.readFileSync(path.join(__dirname, 'userInfos.sql')).toString();


// Example of 1:1 Association
// db.Sequelize.Order.belongsTo(User, {foreignKey: 'requestorId'});


db.sequelize.sync({force: true})
.then(response => db.sequelize.query(storesSql, { type: db.sequelize.QueryTypes.INSERT})) 
.then(response => db.sequelize.query(usersSql, { type: db.sequelize.QueryTypes.INSERT})) 
.then(response => db.sequelize.query(userInfosSql, { type: db.sequelize.QueryTypes.INSERT})) 
.then(response => process.exit(0))
