import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../controllers/user/user.service';
import { UserInput } from '../../models/User.input';
import { UserDTO } from '../../models/UserDTO';
import { UserEntity } from '../../entitys/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {

  private logger = new Logger()

    constructor(
        private userSrv: UserService,
        private jwtService: JwtService,
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>,
    ) {}

    async validateUser(email: string, pass: string): Promise<UserDTO> {
        const user = await this.userSrv.findOne(email);
        const comparePass = await bcrypt.compare(pass, user.password);
        if (comparePass) {
          return user;
        }
        return null;
      }


      async login(user: UserInput): Promise<{accessToken: string}> {
        this.logger.log(user);
        try {
          const userLogin = await this.validateUser(user.email, user.password);
          const payload = { email: userLogin.email, sub: userLogin.userId };
        return {
          accessToken: this.jwtService.sign(payload),
        };
        } catch (error) {
          
          
        }
        
      }



      async create(user_: UserInput): Promise<UserDTO> {
        const findSameUser = await this.usersRepository.findOne({
          where: { username: user_.email },
        });
        if (findSameUser) {
          const error = new Error();
          error.message = 'User with the same username';
          error.stack = `${HttpStatus.FOUND}`;
          throw error;
        }
        try {
          const passwordHash = await bcrypt.hash(user_.password, 8);
          const user = new UserEntity();
          user.email = user_.email;
          user.lastname = user_.lastname;
          user.password = passwordHash;
          user.username = user_.username;
          
          const userSave = await this.usersRepository.save(user);
    
          return {
            username: userSave.username,
            email: userSave.email,
            lastname: userSave.lastname,
            role: userSave.role
          };
        } catch (error) {
          console.log(error);
          return error;
        }
      }

     
}
