import { Injectable, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    private logger = new Logger()
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    canActivate(context: ExecutionContext) {
        // Add your custom authentication logic here
        // for example, call super.logIn(request) to establish a session.
        this.logger.log(context);
        return super.canActivate(context);
    }

    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handleRequest(err, user, info) {
        // You can throw an exception based on either "info" or "err" arguments
        this.logger.log({user,info,err})
        if (err || !user) {
            throw err || new UnauthorizedException();
        }
        return user;
    }
}
