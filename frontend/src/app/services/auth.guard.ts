import { Injectable } from '@angular/core';
import { AuthtokenService } from './authtoken.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // canActivate(
  //   next: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }

  constructor(
    private authtoken: AuthtokenService,
    private router: Router
  ){}

  // canActivate(): boolean{
  //   if (this.authtoken.isValid()) {
  //     //console.log('true');
  //     return true;
  //   } else {
  //     //console.log('false');
  //     this.router.navigateByUrl('/login');
  //     return false;
  //   }
  // }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
      var match1 = this.authtoken.roleMatch(['User']);
      let roles1 = next.data["roles"] as Array<string>;

      //console.log(this.authtoken.isValid());
      //console.log(match1);
      //console.log(roles1);

      if (this.authtoken.isValid())
      {
        let roles = next.data["roles"] as Array<string>;
        //console.log(roles);
        if (roles) {
          var match = this.authtoken.roleMatch(roles);
          if (match) return true;
          else {
            this.router.navigate(['/auth/signin']);
            return false;
          }
        }
        else
          return true;
      }
      this.router.navigate(['/auth/signin']);
      return false;
  }



  


}
