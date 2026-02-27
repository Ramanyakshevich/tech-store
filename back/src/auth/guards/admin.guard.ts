import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean{
        const request = context.switchToHttp().getRequest()
        const user = request.user as User

        if(user.role !== 'ADMIN'){
            throw new ForbiddenException('Access denied: Admins only')
        }

        return true
    }
}