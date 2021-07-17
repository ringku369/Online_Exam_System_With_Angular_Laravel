import { Injectable } from '@angular/core';

import { AuthtokenService } from './authtoken.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthstatusService {

  constructor(private Token: AuthtokenService) { }

  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value: boolean): void {
    this.loggedIn.next(value);
  }
}
