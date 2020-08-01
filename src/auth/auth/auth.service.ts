import { Injectable, Logger, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../../controllers/user/user.service';
import { UserInput } from '../../models/User.input';
import { UserDTO } from '../../models/UserDTO';
import { UserEntity } from '../../entitys/user.entity';
import { Repository, Connection } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GymEntity } from '../../entitys/gym.entity';
import { MailerService } from '@nestjs-modules/mailer';
import { InjectSendGrid, SendGridService } from '@ntegral/nestjs-sendgrid';

@Injectable()
export class AuthService {

  private logger = new Logger()

  constructor(
    private userSrv: UserService,
    private jwtService: JwtService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private connection: Connection,
    private readonly mailerService: MailerService,
    @InjectSendGrid() private readonly sendGrid: SendGridService
  ) { }

  async validateUser(email: string, pass: string): Promise<UserDTO> {
    const user = await this.userSrv.findByEmail(email);
    if (!user) {
      return null
    }
    const comparePass = await bcrypt.compare(pass, user.password);
    if (comparePass && (+user.active === 1)) {
      return user;
    }
    return null;
  }


  async login(user: UserInput): Promise<{ accessToken: string, userId: string }> {
    this.logger.log(user);
    try {
      const userLogin = await this.validateUser(user.email, user.password);
      const payload = { email: userLogin.email, sub: userLogin.userId };
      return {
        accessToken: this.jwtService.sign(payload),
        userId: userLogin.userId
      };
    } catch (error) {
      const error_ = new Error();
      error_.message = 'User Can not login';
      error_.stack = `${HttpStatus.FORBIDDEN}`;
      throw error_;

    }

  }


  async validateToken(token: string) {
    try {
      const validateToken = await this.jwtService.verify(token);
      if (validateToken.message === "invalid signature") {
        const error_ = new Error();
        error_.message = 'Token is not valid';
        error_.stack = `${HttpStatus.UNAUTHORIZED}`;
        throw error_;
      }
      return {accessToken: token};
    } catch (error) {
      return error;
    }
  }



  async create(user_: UserInput): Promise<UserDTO> {
    const findSameUser = await this.usersRepository.findOne({
      where: { email: user_.email },
    });
    if (findSameUser) {
      const error = new Error();
      error.message = 'User with the same email';
      error.stack = `${HttpStatus.FOUND}`;
      throw error;
    }
    // INFO find i gymId exist.
    const gymIdFound = await this.connection.createQueryBuilder(GymEntity, 'gymEntity')
      .where("gymEntity.id =:id", { id: user_.gymId }).getOne();
    if (!gymIdFound) {
      const error = new Error();
      error.message = 'Gym Id is not valid';
      error.stack = `${HttpStatus.NOT_FOUND}`;
      throw error;
    }

    this.sendGrid.send({
      from: "gym-book@sendgrid.net",
      to: user_.email,
      subject: "Rejister",
      text: "register in app",
      html: '<h1>ok you send email</h1>'
    }).then((res) => {
      console.log('send email', res);
    }).catch((err) => {
      console.log('error email', err);
    });
    try {
      const passwordHash = await bcrypt.hash(user_.password, 8);
      const user = new UserEntity();
      user.email = user_.email;
      user.lastname = user_.lastname;
      user.password = passwordHash;
      user.username = user_.username;
      user.gymId = user_.gymId;
      user.booking = [];

     

      const userSave = await this.usersRepository.save(user);

      return {
        username: userSave.username,
        email: userSave.email,
        lastname: userSave.lastname,
        role: userSave.role
      };
    } catch (error) {
      return error;
    }
  }


}
