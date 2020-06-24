import { Controller, Post, HttpStatus, Body, Res, Req } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('api')
export class ApiController {
    constructor(
        private logsSrv: ApiService
    ) {
        
    }


    @Post('logs')
    async logs(@Req() req, @Res() res,@Body() body: any) {
        try {
            const user_ = await this.logsSrv.logs(body)
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
            res.status(error.stack).send(error);
        }
    }
}
