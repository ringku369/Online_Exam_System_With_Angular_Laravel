import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  constructor(
    private authtoken: AuthtokenService,
    private router: Router,
    private authstatus: AuthstatusService,
    private authservice: AuthService
  ) { }

  name : string;

  ngOnInit() { 
    this.name = this.authtoken.get().name + ' - ' + this.authtoken.get().username ;
  }

  
  spinner = false;
  signout(event: any): void {
    event.preventDefault();
    this.spinner = true;
    this.authservice.postLogout();

    this.authservice.postLogout().subscribe(
      (response: any) => {
        //console.log(response);
        this.authtoken.remove();
        this.authstatus.changeAuthStatus(false);
        this.router.navigateByUrl('/auth/signin');
        //this.router.navigate(['/login']);
      },
      (error: any) => {
       // console.log(error);
      }
    );
    
  }


  gotodashboard(event: any): void {
    //event.preventDefault();

    if(this.authtoken.roleMatch(['Superadmin'])){
      this.router.navigate(['/superadmin/dashboard']);
    }else if(this.authtoken.roleMatch(['Admin'])){
      this.router.navigate(['/admin/dashboard']);
    }else if(this.authtoken.roleMatch(['User'])){
      this.router.navigate(['/user/dashboard']);
    }

  }

}
