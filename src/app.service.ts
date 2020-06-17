import { Injectable, Logger } from '@nestjs/common';
import { Transport, MicroserviceOptions, ClientProxy, ClientProxyFactory } from '@nestjs/microservices';
@Injectable()
export class AppService {
  private logger = new Logger()
  // private client: ClientProxy
  constructor() {
    // this.client = ClientProxyFactory.create({
    //   transport: Transport.TCP,
    //   options:{
    //     host: '127.0.0.1',
    //     port: 8877
    //   }
    // })
  }
  getHello(): any {
    return 'lol'//this.client.send('hello', []);
  }
}
