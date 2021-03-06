import { Controller, Post, Request, HttpStatus, Req, Res, Body, Get, Query, UseGuards } from '@nestjs/common';
import { ClassesService } from './classes.service';
import { ClassInput } from '../../models/Class.input';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';

@Controller('classes')
export class ClassesController {
    constructor(
        private classesSrv: ClassesService
    ) { }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req, @Res() res, @Body() body: ClassInput): Promise<any> {
        try {
            const class_ = await this.classesSrv.createClasses(body, req.user)
            res.status(HttpStatus.OK).send(class_);
        } catch (error) {
            res.status(error.stack).send(error);
        }
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Request() req, @Res() res, @Query() query) {
        try {
            const class_ = await this.classesSrv.find(query.dateStart,query.dateEnd, query.type, req.user, query.rangeFrom, query.rangeTo, query.gymId);
            res.status(HttpStatus.OK).send(class_);
        } catch (error) {
            res.status(error.stack).send(error);
        }
    }
}
