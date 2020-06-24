import { Controller, Post, UseGuards, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { NewsFeedService } from './newsfeed.service';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { NewsFeedInput } from '../../models/NewsFeed.input';

@Controller()
export class NewsFeedController {
   constructor(
       private newsFeedSrv: NewsFeedService
   ) {}


  
   @Post()
   @UseGuards(JwtAuthGuard)
   async create(@Body() body : NewsFeedInput, @Req() req, @Res() res) {
       try {
           const newsFeed_ = await this.newsFeedSrv.createNewsFeed(body, req.user)
           res.status(HttpStatus.OK).send(newsFeed_);
       } catch (error) {
           res.status(error.stack).send(error);
       }

   }

}
