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
    },
    exitHandler(options, exitCode) { 
        if (options.cleanup) {
            this.log("Gracefully closing mysql connection as process is exiting."); 
            options.connection.end();
            process.exit();
        }

        if (exitCode || exitCode === 0) console.log(exitCode);
        
        if (options.exit) process.exit();
    },
    setExitHandlers() {   
        //do something when app is closing
        process.on('exit', this.exitHandler.bind(this,{cleanup:true, connection}));

        //catches ctrl+c event
        process.on('SIGINT', this.exitHandler.bind(null, {exit:true}));

        // catches "kill pid" (for example: nodemon restart)
        process.on('SIGUSR1', this.exitHandler.bind(null, {exit:true}));
        process.on('SIGUSR2', this.exitHandler.bind(null, {exit:true}));

        //catches uncaught exceptions
        process.on('uncaughtException', this.exitHandler.bind(null, {exit:true}));
    }
}