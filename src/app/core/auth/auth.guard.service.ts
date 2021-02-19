import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  
  //Chamado sempre que acessa a rota que esta usando esse service no app.routing.module
  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ){

    let userName:string = '';

    //Caso esteja logado, direciona para outra rota...retorna falso para não cair nessa rota.  
    if (this.userService.isLogged()){
        userName = this.userService.getUserName();
        this.router.navigate(['user',userName])
        return false;
      }
    
    return true;
  }
}
