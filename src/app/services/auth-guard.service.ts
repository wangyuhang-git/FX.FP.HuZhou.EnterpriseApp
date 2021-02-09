import { Injectable } from '@angular/core';

//导入路由守卫
import { CanActivate } from '@angular/router';

//导入鉴权服务
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthenticationService) {

  }

  canActivate(): boolean {
    return this.authService.IsAuthenticated();
  }

}
