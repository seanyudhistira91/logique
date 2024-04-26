import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { config } from 'dotenv';
config();
@Injectable()
export class ApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['key'];

    if (apiKey =='' || apiKey == undefined ) {
        throw new ForbiddenException({error: 'API Key is missing.'});
    }

    if (apiKey !== process.env.API_KEY) {
        throw new UnauthorizedException({error: 'Invalid API Key.'});
    }
    return true;
  }
}