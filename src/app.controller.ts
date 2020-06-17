import { Controller, Get, Logger, Post, UseGuards, Req, Body } from '@nestjs/common';
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
  async create( @Body() body:UserInput): Promise<UserDTO>{
    this.logger.log(body);
    return this.authService.create(body);
  }

}
