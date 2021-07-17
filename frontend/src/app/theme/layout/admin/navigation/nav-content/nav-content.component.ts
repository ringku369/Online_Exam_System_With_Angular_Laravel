import { AfterViewInit, Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { NavigationItem } from '../navigation';
import { NextConfig } from '../../../../../app-config';
import { Location } from '@angular/common';
import { AuthtokenService } from 'src/app/services/authtoken.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavigationService } from '../../../../../services/navigation/navigation.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements OnInit, AfterViewInit {
  public nextConfig: any;
  public navigation: any;
  public prevDisabled: string;
  public nextDisabled: string;
  public contentWidth: number;
  public wrapperWidth: any;
  public scrollWidth: any;
  public windowWidth: number;
  public isNavProfile: boolean;

  
  //public IsAdminActiveNave : boolean = true;
  //public IsUserActiveNave : boolean = false;
  //AdminRole: boolean = this.authtoken.roleMatch(['Admin']);
  //UserRole: boolean = this.authtoken.roleMatch(['User']);

  @Output() onNavMobCollapse = new EventEmitter();

  @ViewChild('navbarContent', {static: false}) navbarContent: ElementRef;
  @ViewChild('navbarWrapper', {static: false}) navbarWrapper: ElementRef;

  constructor(
    public nav: NavigationItem, 
    private zone: NgZone, 
    private location: Location,
    private authtoken: AuthtokenService,
    private router: Router,
    private authstatus: AuthstatusService,
    private authservice: AuthService,
    private navigationService: NavigationService,
    
    ) {

    


    this.nextConfig = NextConfig.config;
    this.windowWidth = window.innerWidth;
    // roure path
    if(this.authtoken.roleMatch(['Superadmin']) == true){
      this.navigation = this.nav.getSuperadmin();
    }else if(this.authtoken.roleMatch(['Admin']) == true){
      this.navigation = this.nav.getAdmin();
    }else if(this.authtoken.roleMatch(['User']) == true){
      this.navigation = this.nav.getUser();
    }
    // roure path

    this.prevDisabled = 'disabled';
    this.nextDisabled = '';
    this.scrollWidth = 0;
    this.contentWidth = 0;

    this.isNavProfile = false;

  }


  isValid: boolean;
  name : string;

  ngOnInit() {

    this.settimeinterval();


    //this.authstatus.authStatus.subscribe(value => this.isValid = value);
    this.name = this.authtoken.get().name + '-' + this.authtoken.get().username;
    

    if (this.windowWidth < 992) {
      this.nextConfig['layout'] = 'vertical';
      setTimeout(() => {
        document.querySelector('.pcoded-navbar').classList.add('menupos-static');
        (document.querySelector('#nav-ps-next') as HTMLElement).style.maxHeight = '100%';
      }, 500);
    }

    

  }

  biticon : boolean = true;
  balance : string;
  coin : string;
  rank : string;

  spinner1:boolean = false;

  showRank(event: any): void {
    event.preventDefault();
    
    this.spinner1 = true;
    //========
    this.authservice.getRank().subscribe(
      (response: any) => {
        //console.log(response);
        this.rank = response;
        this.spinner1 = false;
      },
      (error: any) => {
        //console.log(error);
      }
    );
    //========


  }

  settimeinterval(){
    
    setTimeout(() => {
      this.biticon = false;
      this.rank = this.authtoken.get().rank;
      
      //this.balance = '$'+ this.authtoken.get().balance;
      //this.coin = '¥'+ this.authtoken.get().coin;
    }, 1000);
  }


  showBalanse(event: any): void {
    this.biticon = false;
    event.preventDefault();

    this.getBalance();
  }

  
  spinner:boolean = false;

  getBalance(){
    this.spinner = true;
    // roure path
    if(this.authtoken.roleMatch(['Superadmin']) == true){
      
      // for Superadmin
      this.navigationService.getBalanceForSuperadmin().subscribe(
        (response: any) => {
          this.balance =  response.balance;
          //this.coin = '¥'+response.coin;
          this.spinner = false;
        },
        (error: any) => {
          console.log(error);
        }
      );


    }else if(this.authtoken.roleMatch(['Admin']) == true){
      // for Admin
      this.navigationService.getBalanceForAdmin().subscribe(
        (response: any) => {
          this.balance =  response.balance;
          //this.coin = '¥'+response.coin;
          this.spinner = false;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }else if(this.authtoken.roleMatch(['User']) == true){
      // for User
      this.navigationService.getBalanceForUser().subscribe(
        (response: any) => {
          this.balance =  response.balance;
          //this.coin = '¥'+response.coin;
          this.spinner = false;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
    // roure path

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
        //console.log(error);
      }
    );
  }


  ngAfterViewInit() {
    if (this.nextConfig['layout'] === 'horizontal') {
      this.contentWidth = this.navbarContent.nativeElement.clientWidth;
      this.wrapperWidth = this.navbarWrapper.nativeElement.clientWidth;
    }
  }

  scrollPlus() {
    this.scrollWidth = this.scrollWidth + (this.wrapperWidth - 80);
    if (this.scrollWidth > (this.contentWidth - this.wrapperWidth)) {
      this.scrollWidth = this.contentWidth - this.wrapperWidth + 80;
      this.nextDisabled = 'disabled';
    }
    this.prevDisabled = '';
    if(this.nextConfig.rtlLayout) {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginRight = '-' + this.scrollWidth + 'px';
    } else {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
    }
  }

  scrollMinus() {
    this.scrollWidth = this.scrollWidth - this.wrapperWidth;
    if (this.scrollWidth < 0) {
      this.scrollWidth = 0;
      this.prevDisabled = 'disabled';
    }
    this.nextDisabled = '';
    if(this.nextConfig.rtlLayout) {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginRight = '-' + this.scrollWidth + 'px';
    } else {
      (document.querySelector('#side-nav-horizontal') as HTMLElement).style.marginLeft = '-' + this.scrollWidth + 'px';
    }

  }

  fireLeave() {
    const sections = document.querySelectorAll('.pcoded-hasmenu');
    for (let i = 0; i < sections.length; i++) {
      sections[i].classList.remove('active');
      sections[i].classList.remove('pcoded-trigger');
    }

    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        last_parent.classList.add('active');
      }
    }
  }

  navMob() {
    if (this.windowWidth < 992 && document.querySelector('app-navigation.pcoded-navbar').classList.contains('mob-open')) {
      this.onNavMobCollapse.emit();
    }
  }

  fireOutClick() {
    let current_url = this.location.path();
    if (this.location['_baseHref']) {
      current_url = this.location['_baseHref'] + this.location.path();
    }
    const link = "a.nav-link[ href='" + current_url + "' ]";
    const ele = document.querySelector(link);
    if (ele !== null && ele !== undefined) {
      const parent = ele.parentElement;
      const up_parent = parent.parentElement.parentElement;
      const last_parent = up_parent.parentElement;
      if (parent.classList.contains('pcoded-hasmenu')) {
        if (this.nextConfig['layout'] === 'vertical') {
          parent.classList.add('pcoded-trigger');
        }
        parent.classList.add('active');
      } else if(up_parent.classList.contains('pcoded-hasmenu')) {
        if (this.nextConfig['layout'] === 'vertical') {
          up_parent.classList.add('pcoded-trigger');
        }
        up_parent.classList.add('active');
      } else if (last_parent.classList.contains('pcoded-hasmenu')) {
        if (this.nextConfig['layout'] === 'vertical') {
          last_parent.classList.add('pcoded-trigger');
        }
        last_parent.classList.add('active');
      }
    }
  }

}
