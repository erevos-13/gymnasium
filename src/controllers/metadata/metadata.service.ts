import { Injectable, HttpStatus } from '@nestjs/common';
import { MetadataEntity } from '../../entitys/metadata.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { UserAuth } from '../../models/User.auth';
import { UserEntity } from '../../entitys/user.entity';
import { MetadataInput } from '../../models/Metadata.input';

@Injectable()
export class MetadataService {

    constructor(
        @InjectRepository(MetadataEntity) private metadataEntity: Repository<MetadataEntity>,
        private connection: Connection,
    ) {

    }

    async createMetadata(body: MetadataInput, user_: UserAuth) {
        try {
            const user = await this.connection.getRepository(UserEntity).findOne({ userId: user_.userId })
            if (!user) {
                const error_ = new Error();
                error_.message = 'User not found';
                error_.stack = `${HttpStatus.NOT_FOUND}`;
                throw error_;
            }
            const metadataRepository = await this.connection.getRepository(MetadataEntity)
                .createQueryBuilder("metadata_entity")
                .leftJoinAndSelect("metadata_entity.user", "user_entity")
                .where("metadata_entity.userUserId = :userId", { userId: `${user_.userId}` })
                .getMany();

            if (metadataRepository.length !== 0) {
                const error_ = new Error();
                error_.message = 'Metadata could not create';
                error_.stack = `${HttpStatus.FOUND}`;
                throw error_;
            }
            const metadata_ = new MetadataEntity();
            metadata_.key = body.key;
            metadata_.value = body.value;
            metadata_.name = body.name;
            metadata_.user = user;
            const save_ = await this.metadataEntity.save(metadata_);
            return save_;
        } catch (error) {
            throw error;
        }
    }
}
