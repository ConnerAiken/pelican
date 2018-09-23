import db from '../libs/db';
import fs from "fs";
import path from "path";
 

let storesSql = fs.readFileSync(path.join(__dirname, 'stores.sql')).toString();

db.sequelize.sync({force: true})
  .then(() => {
      return db.sequelize.query(storesSql, { type: db.sequelize.QueryTypes.INSERT})
  }) 
  .then(res => {
      console.log(res);
    // We don't need spread here, since only the results will be returned for select queries
    process.exit(0);
  })