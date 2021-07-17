import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainten-error',
  templateUrl: './mainten-error.component.html',
  styleUrls: ['./mainten-error.component.scss']
})
export class MaintenErrorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  redirect(): void {
    console.log('resirect');
    this.router.navigate(['/auth/signin']);
    //this.router.navigate(['/admin/dashboard']);
    //this.router.navigateByUrl('/admin/dashboard');
  }

}
