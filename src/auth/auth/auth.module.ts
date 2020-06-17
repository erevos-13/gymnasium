
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../../controllers/user/user.service';
import { UserModule } from '../../controllers/user/user.module';

export const jwtConstants = {
  secret: 'gymnasiumsupreserverbackendfuxkthat',
};

@Module({
  imports: [
    UserModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3000s' },
    }),
  ],
  providers: [AuthService, LocalStrategy,JwtStrategy,UserService],
  exports: [AuthService],
})
export class AuthModule {}
