import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../controllers/user/user.service';

@Injectable()
export class AuthService {

    constructor(
        private userSrv: UserService,
        private jwtService: JwtService
    ) {}

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userSrv.findOne(username);
        const comparePass = await bcrypt.compare(pass, user.password);
        if (comparePass) {
          return user;
        }
        return null;
      }

     
}
