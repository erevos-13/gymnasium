import { Controller, Post, UseGuards, Body, Req, Res, HttpStatus } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { JwtAuthGuard } from '../../auth/auth/jwt-auth.guard';
import { MetadataInput } from '../../models/Metadata.input';

@Controller('metadata')
export class MetadataController {
    constructor(
        private metadataSrv:MetadataService
    ) {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async createMetadataUser( @Body() body: MetadataInput, @Req() req, @Res() res) {
        try {
            const metadata_ = await this.metadataSrv.createMetadata(body, req.user)
            res.status(HttpStatus.CREATED).send(metadata_);
        } catch (error) {
            res.status(error.stack).send(error.message);
        }
    }
}
