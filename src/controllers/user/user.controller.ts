import { Controller, Post, Get, Req, UseGuards, Param, Logger,Request, Query, Res, HttpStatus, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { UserInput } from '../../models/User.input';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { GetProfile } from '../../models/GetProfile';
import { UpdateUserInput } from '../../models/UpdateRole.input';
import { UserUpdateInput } from '../../models/UserUpdate.input';

@Controller('user')
export class UserController {
    private logger = new Logger();
    constructor(private userSrv: UserService) {

    }


    @Get()
    @UseGuards(JwtAuthGuard)
    async profileUser(@Req() req, @Res() res, @Query() query:GetProfile) {
        this.logger.log(query.userId);
        try {
            const user_ = await this.userSrv.findOne(query.userId);
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
           res.status(error.stack).send(error);
        }
    }


    @Post('update-role')
    @UseGuards(JwtAuthGuard)
    async updateRoleOfUser(@Req() req, @Res() res,@Body() body: UpdateUserInput) {
        try {
            const user_ = await this.userSrv.updateUserToPractitioner(body, req.user);
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
           res.status(error.stack).send(error);
        }
    }
  

    @Post('update-user')
    @UseGuards(JwtAuthGuard)
    async updateUser(@Req() req, @Res() res,@Body() body: UserUpdateInput) {
        try {
            const user_ = await this.userSrv.updateUser(body, req.user);
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
           res.status(error.stack).send(error);
        }
    }

    @Get('all-users')
    @UseGuards(JwtAuthGuard)
    async getAllUsers(@Req() req, @Res() res) {
        try {
            const user_ = await this.userSrv.getUsers(req.user);
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
           res.status(error.stack).send(error);
        }
    }

}
