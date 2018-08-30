let connection;
import mysql from "mysql";

export default {
    log(msg, type = 0) {
        if(type === 1) {
            console.warn(`[${process.env.appName}] ${msg}`);
        }else if(type === 2) {
            console.error(`[${process.env.appName}] ${msg}`);
        }else {
            console.log(`[${process.env.appName}] ${msg}`);
        }
    },
    loadENV() { 
        const config = dotenv.config({
            path: path.resolve(process.cwd(), '.env')
        });  
        if (config.error) {
            this.log("Could not find .env file, using default env file..");
            const defaultConfig = dotenv.config({
                path: path.resolve(process.cwd(), '.env.default')
            });
        }else {
            this.log("Successfully loaded .env variables..");
        }
    },
    connectToMySQL() {  
        connection = mysql.createConnection({
            host     : process.env.mysqlHost,
            user     : process.env.mysqlUser,
            password : process.env.mysqlPassword,
            database : process.env.mysqlDB
        });

        return connection;
    }
}