import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './controllers/user/user.service';
import { UserModule } from './controllers/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitys/user.entity';
import { AuthModule } from './auth/auth/auth.module';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "sql307.main-hosting.eu",
      port: 3306,
      username: "u344112773_gymnasium_dev",
      password: "Erev0s13!",
      database: "u344112773_gymnasium_dev",
      entities: [UserEntity],
      synchronize: true,
    }),
    
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
