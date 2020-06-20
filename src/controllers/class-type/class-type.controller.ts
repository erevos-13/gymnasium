import { Controller, Post, UseGuards, Body, Res, Req, HttpStatus, Get, Query } from '@nestjs/common';
import { ClassTypeService } from './class-type.service';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { ClassTypeInput } from '../../models/ClassType.input';

@Controller('class-type')
export class ClassTypeController {
    constructor(
        private classTypeSrv: ClassTypeService
    ) {

    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Body() body : ClassTypeInput, @Req() req, @Res() res) {
        try {
            const user_ = await this.classTypeSrv.createClassType(body)
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
            res.status(error.stack).send(error);
        }

    }

    @Get()
    @UseGuards(JwtAuthGuard)
    async get( @Req() req, @Res() res, @Query() query): Promise<any>  {
        try {
            const classType_ = await this.classTypeSrv.findAll()
            res.status(HttpStatus.OK).send(classType_);
        } catch (error) {
            res.status(error.stack).send(error);
        }

    }
}
