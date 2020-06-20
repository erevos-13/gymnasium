import { Controller, Get, Logger, Post, UseGuards, Req, Body, Res, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth/auth.service';
import { UserInput } from './models/User.input';
import { UserDTO } from './models/UserDTO';
import { LocalStrategy } from './auth/auth/local.strategy';

@Controller()
export class AppController {
  private logger = new Logger()
  constructor(private readonly appService: AppService, private authService: AuthService) { }

  @Get()
  async getHello(): Promise<any> {
    return this.appService.getHello();
  }

  @Post('auth/login')
  @UseGuards(LocalStrategy)
  async login(@Body() body: any): Promise<{ accessToken: string }> {
    this.logger.log(body);
    return this.authService.login(body);
  }

  @Post('auth/create')
  async create(@Req() req, @Res() res, @Body() body:UserInput){
    this.logger.log(body);
    try {
      const user_ = await this.authService.create(body);
      res.status(HttpStatus.OK).send(user_);
    } catch (error) {
      res.status(error.stack).send(error);
    }
  }

}
