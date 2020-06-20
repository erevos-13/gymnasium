import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './controllers/user/user.service';
import { UserModule } from './controllers/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entitys/user.entity';
import { AuthModule } from './auth/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ClassEntity } from './entitys/class.entity';
import { ClassTypeEntity } from './entitys/classType.entity';
import { BookingEntity } from './entitys/booking.entity';
import { BookingController } from './controllers/booking/booking.controller';
import { BookingModule } from './controllers/booking/booking.module';
import { ClassesController } from './controllers/classes/classes.controller';
import { ClassesModule } from './controllers/classes/classes.module';
import { ClassTypeService } from './controllers/class-type/class-type.service';
import { ClassTypeModule } from './controllers/class-type/class-type.module';
import { BookingService } from './controllers/booking/booking.service';
import { ClassesService } from './controllers/classes/classes.service';


@Module({
  imports: [
UserModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: "sql307.main-hosting.eu",//process.env.HOST,
      port: 3306,//parseInt(process.env.PORT, 10) || 3306,
      username: "u344112773_gymnasium_dev",//process.env.NAME,
      password: "Erev0s13!",//process.env.PASSWORD,
      database: "u344112773_gymnasium_dev",//process.env.NAME,
      entities: [UserEntity, ClassEntity, ClassTypeEntity, BookingEntity],
      synchronize: true,
    }),
    BookingModule,
    ClassesModule,
    ClassTypeModule,

  ],
  controllers: [AppController, BookingController, ClassesController],
  providers: [AppService, ClassTypeService, BookingService, ClassesService],
})
export class AppModule {
}
