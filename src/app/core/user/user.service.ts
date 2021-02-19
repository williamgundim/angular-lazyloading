import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<User>(null);
  private userName: string = '';

  constructor(
    private tokenService: TokenService
  ) {

    //No constructor para notificar caso a pagina sera recarregada e o token já esteja setado.
    if (this.tokenService.hasToken){
      this.decodeAndNotify();
     }

  }
    
  setToken(token:string){
    this.tokenService.setToken(token);
    this.decodeAndNotify();
  }

  getUser(){
    //Criado para os outros componentes conseguirem se inscrever e receber dados do usuário pelo subscribe.  
    return this.userSubject.asObservable();
  }

  private decodeAndNotify(){

    let token = this.tokenService.getToken();
    let user = jwt_decode(token) as User;

    this.userName = user.name;

    //Emite pelo subject um observavble do tipo user. Os outros componentes que estiverem escritos vão receber a notificação com o novo valor.
    this.userSubject.next(user);

  }

  logout(){
    this.tokenService.removeToken();
    this.userSubject.next(null); //Emite null para todos que estão inscritos no getUser().
  }

  isLogged(){
    return this.tokenService.hasToken();
  }

  getUserName(){
    return this.userName;
  }

}
