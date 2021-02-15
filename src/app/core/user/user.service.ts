import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../token/token.service';
import { User } from './user';

import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userDefault:User = {
    name:'Sem usuário',
    email:'teste@teste.com.br',
    id:1
  }

  private userSubject = new BehaviorSubject<User>(this.userDefault);

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

    //Emite pelo subject um observavble do tipo user. Os outros componentes que estiverem escritos vão receber a notificação com o novo valor.
    this.userSubject.next(user);

  }

}
