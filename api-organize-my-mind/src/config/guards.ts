import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../auth/decorators/public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
        console.log('Authorization Header:', request.headers.authorization);

        const isPublic = this.reflector.get<boolean>(IS_PUBLIC_KEY, context.getHandler());

        if (isPublic) {
            return true;
        }

        return super.canActivate(context);
    }
    
}
