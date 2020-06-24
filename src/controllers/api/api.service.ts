import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class ApiService {
    private logger = new Logger();


    logs(logs) {
        try {
            
            this.logger.log(logs);
            return logs;
        } catch (error) {
            return null
        }
    }
}
