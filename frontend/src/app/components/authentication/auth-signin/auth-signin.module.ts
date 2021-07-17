import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthSigninRoutingModule } from './auth-signin-routing.module';
import { AuthSigninComponent } from './auth-signin.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';


// import { ProfileService } from 'src/app/services/profile.service';
// import { HomeService } from 'src/app/services/home.service';
// import { AuthService } from 'src/app/services/auth.service';
// import { AuthGuard } from 'src/app/services/auth.guard';
// import { AuthstatusService } from 'src/app/services/authstatus.service';
// import { AuthtokenService } from 'src/app/services/authtoken.service';
// import { BaseurlService } from 'src/app/services/baseurl.service';
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { AuthInterceptorService } from 'src/app/services/auth-interceptor.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthSigninRoutingModule,
    NgxSpinnerModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  // providers: [AuthtokenService, AuthService, AuthGuard,
  //   AuthstatusService, ProfileService, HomeService, BaseurlService,
  //   { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],

  declarations: [AuthSigninComponent]
})
export class AuthSigninModule { }
