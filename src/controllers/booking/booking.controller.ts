import { Controller, Post, Logger, Req, Res, Body, HttpStatus, UseGuards } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingInput } from '../../models/Booking.input';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';

@Controller('booking')
export class BookingController {
    private logger = new Logger()
    constructor(
        private bookingSrv: BookingService
    ) { }

    @Post('book-me')
    @UseGuards(JwtAuthGuard)
    async bookPosition(@Req() req, @Res() res, @Body() body: BookingInput) {
        try {
            const user_ = await this.bookingSrv.createBookOfUser(body)
            res.status(HttpStatus.OK).send(user_);
        } catch (error) {
            res.status(error.stack).send(error);
        }
    }
}
