import { Controller, Post, UseGuards, Body, Req, Res, HttpStatus, UseInterceptors, Get, Param, UploadedFile, Patch, Delete, Query } from '@nestjs/common';
import { NewsFeedService } from './newsfeed.service';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { NewsFeedInput } from '../../models/NewsFeed.input';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller("news-feed")
export class NewsFeedController {
    constructor(
        private newsFeedSrv: NewsFeedService
    ) { }



    @Post("file")
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './folders/images', //../html/pub/filesOrchic/postFiles
                filename: (req, file, cb) => {
                    console.log('[file]', req, file);
                    return cb(null, `${file.originalname}`);
                },
            }),
        })
    )
    async create(@UploadedFile() file, @Body() body: NewsFeedInput, @Req() req, @Res() res) {
        try {
            const imageUrl = `${process.env.FILE_URL_LINK}/news-feed/folders/images/${file.originalname}`
            const newsFeed_ = await this.newsFeedSrv.createNewsFeed(body, req.user, imageUrl)
            res.status(HttpStatus.CREATED).send(newsFeed_);
        } catch (error) {
            res.status(error.stack).send(error.message);
        }

    }

    @Get('folders/images/:newsFeedId')
    async getFiles(@Param('newsFeedId') newsFeedId, @Res() res): Promise<any> {
        res.sendFile(newsFeedId, { root: `folders/images` }); //../html/pub/filesOrchic/postFiles
    }


    @Patch()
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './folders/images', //../html/pub/filesOrchic/postFiles
                filename: (req, file, cb) => {
                    console.log('[file]', req, file);
                    return cb(null, `${file.originalname}`);
                },
            }),
        })
    )
    async updateNewsFeedBy(@UploadedFile() file, @Body() body: NewsFeedInput, @Req() req, @Res() res) {
        try {
            let imageUrl = "";
            if (file) {
                imageUrl = `http://localhost:3000/news-feed/folders/images/${file?.originalname}`

            }
            imageUrl = null;
            const newsFeedUpdate_ = await this.newsFeedSrv.updateNewsFeed(body, req.user, imageUrl)
            res.status(HttpStatus.CREATED).send(newsFeedUpdate_);
        } catch (error) {
            res.status(error.stack).send(error.message);
        }
    }


    @Delete("delete")
    @UseGuards(JwtAuthGuard)
    async deleteNewsFeedById(@Query() query, @Req() req, @Res() res) {
        try {
            const newsFeedDeleted_ = await this.newsFeedSrv.deleteNewsFeedById(query.newsFeedId, req.user)
            res.status(HttpStatus.GONE).send(newsFeedDeleted_);
        } catch (error) {
            res.status(error.stack).send(error.message);
        }
    }


    @Get('myNewsFeed')
    @UseGuards(JwtAuthGuard)
    async getMyNewsFeed(@Req() req, @Res() res, @Query() query) {
        try {
            const newsFeed = await this.newsFeedSrv.getNewsFeed(req.user, query)
            res.status(HttpStatus.OK).send(newsFeed);
        } catch (error) {
            res.status(error.stack).send(error.message);
        }

    }


}
