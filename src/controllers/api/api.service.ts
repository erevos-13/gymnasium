import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import { stringify } from 'querystring';
@Injectable()
export class ApiService {
    private logger = new Logger();


    logs(logs) {
        try {
            
            this.logger.log(logs);
            const logStringFy_ = stringify(logs);
            fs.appendFile("./logs/logs", `\n ${logStringFy_}`, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 
            return logs;
        } catch (error) {
            return null
        }
    }
}
