let connection;
import mysql from "mysql";
import dotenv from "dotenv";
import path from "path";

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
        } 
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
    verifyToken(req, res, next) {  
        console.log(req);
        var token = req.body.token || req.headers['token']; 
        if (token) {
            jwt.verify(token, process.env.appSecret, function(err) {
                if (err) { 
                    res.status(500).json({
                        failed: "Token is invalid"
                    });
                } else {
                    next();
                }
            });
        } else { 
            res.status(403).json({
                failed: "Please send a token"
            });
        }
    }
}