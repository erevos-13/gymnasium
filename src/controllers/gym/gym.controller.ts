import { Controller, Post, UseGuards, HttpStatus, Req, Res, Body, Get } from '@nestjs/common';
import { GymService } from './gym.service';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { response } from 'express';
import { GymInput } from '../../models/Gym.input';

@Controller('gym')
export class GymController {
    constructor(
        private gymSrv: GymService
    ) {}


    @Post()
    @UseGuards(JwtAuthGuard)
    async create(@Req() req, @Res() res, @Body() body: GymInput) {
        try {
            const gym_ = await this.gymSrv.create(body, req.user);
            res.status(HttpStatus.OK).send(gym_);
        } catch (error) {
           res.status(error.stack).send(error);
        }
    }


    @Get()
    @UseGuards(JwtAuthGuard)
    async get(@Req() req, @Res() res) {
        try {
            const gym_ = await this.gymSrv.findGyms(req.user);
            res.status(HttpStatus.OK).send(gym_);
        } catch (error) {
           res.status(error.stack).send(error);
        }
    }


} // END CLASS
