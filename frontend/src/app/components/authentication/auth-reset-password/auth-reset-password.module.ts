import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthResetPasswordRoutingModule } from './auth-reset-password-routing.module';
import { AuthResetPasswordComponent } from './auth-reset-password.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  imports: [
    CommonModule,
    AuthResetPasswordRoutingModule,
    NgxSpinnerModule,
    FormsModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  declarations: [AuthResetPasswordComponent]
})


export class AuthResetPasswordModule { }
