import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationAllItems = [
  
];


const NavigationUserItems = [
  {
    id: 'user',
    title: 'VC Member',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/user/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home'
        //icon: '<i class="f-24 m-r-10 fa fa-tachometer text-c-yellow"></i>'
      },
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'feather icon-users',
        external: true,
        children: [
          {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            classes: 'nav-item',
            url: '/user/profile',
            external: false
          }
        ]
      },
      {
        id: 'authentication',
        title: 'Authentication',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'feather icon-lock',
        external: true,
        children: [
          {
            id: 'password',
            title: 'Change Password',
            type: 'item',
            classes: 'nav-item',
            url: '/user/password',
            external: false
          }
        ]
      },
  
      {
        id: 'exammodule',
        title: 'Exam Module',
        type: 'collapse',
        classes: 'nav-item',
        icon: '<i class="f-24 m-r-10 fa fa-university text-c-yellow"></i>',
        //icon: 'feather icon-file',
        external: true,
        children: [
          {
            id: 'examstart',
            title: 'Exam Start',
            type: 'item',
            classes: 'nav-item',
            url: '/user/examstart',
            external: false
          },
          {
            id: 'examresult',
            title: 'Exam Result',
            type: 'item',
            classes: 'nav-item',
            url: '/user/examresult',
            external: false
          }
        ]
      },


    ]
  }
];

const NavigationSuperadminItems = [
  {
    id: 'superadmin',
    title: 'Superadmin',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/superadmin/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home'
        //icon: '<i class="f-24 m-r-10 fa fa-tachometer text-c-yellow"></i>'
      }

      // {
      //   id: 'about',
      //   title: 'Information',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: 'feather icon-info',
      //   external: true,
      //   children: [
      //     {
      //       id: 'aboutvc',
      //       title: 'About VC',
      //       type: 'item',
      //       classes: 'nav-item',
      //       url: '/superadmin/aboutvc',
      //       external: false
      //     },
      //     // {
      //     //   id: 'claim',
      //     //   title: 'Claim',
      //     //   type: 'item',
      //     //   classes: 'nav-item',
      //     //   url: '/superadmin/claim',
      //     //   external: false
      //     // }
      //   ]
      // },
      
      // {
      //   id: 'users',
      //   title: 'Users',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: 'feather icon-users',
      //   external: true,
      //   children: [
      //     {
      //       id: 'profile',
      //       title: 'Profile',
      //       type: 'item',
      //       classes: 'nav-item',
      //       url: '/superadmin/profile',
      //       external: false
      //     }
      //   ]
      // },
      // {
      //   id: 'authentication',
      //   title: 'Authentication',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: 'feather icon-lock',
      //   external: true,
      //   children: [
      //     {
      //       id: 'password',
      //       title: 'Change Password',
      //       type: 'item',
      //       classes: 'nav-item',
      //       url: '/superadmin/password',
      //       external: false
      //     }
      //   ]
      // },
      
      // {
      //   id: 'membership',
      //   title: 'Membership',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: 'feather icon-user-check',
      //   external: true,

      //   children: [
      //     {
      //       id: 'member',
      //       title: 'Create Member',
      //       type: 'item',
      //       url: '/superadmin/member',
      //       external: false
      //     },
      //     {
      //       id: 'directsponsor',
      //       title: 'Direct Sponsor',
      //       type: 'item',
      //       url: '/superadmin/directsponsor',
      //       external: false
      //     },
      //     {
      //       id: 'indirectsponsor',
      //       title: 'Reference',
      //       type: 'item',
      //       url: '/superadmin/indirectsponsor',
      //       external: false
      //     },
      //   ]
      // },
        
      // {
      //   id: 'trees',
      //   title: 'Trees',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   //icon: 'feather icon-layers',
      //   icon: '<i class="f-24 m-r-10 fa fa-tree text-c-yellow"></i>',
      //   external: true,

      //   children: [
      //     {
      //       id: 'tree',
      //       title: 'Tree',
      //       type: 'item',
      //       url: '/superadmin/tree',
      //       external: false
      //     },
      //     {
      //       id: 'selftree',
      //       title: 'Self Tree',
      //       type: 'item',
      //       url: '/superadmin/selftree',
      //       external: false
      //     }
      //   ]
      // },

      // {
      //   id: 'funds',
      //   title: 'Funds',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: '<i class="f-24 m-r-10 fab fa-btc text-c-yellow"></i>',
      //   //icon: '<i class="f-24 m-r-10 fa fa-credit-card text-c-yellow"></i>',
      //   //icon: '<i class="fab fa-btc"></i>',
      //   external: true,

      //   children: [
      //     {
      //       id: 'usertouser',
      //       title: 'User To User',
      //       type: 'item',
      //       url: '/superadmin/usertouser',
      //       external: false
      //     },
      //     {
      //       id: 'usertoadmin',
      //       title: 'User To Admin',
      //       type: 'item',
      //       url: '/superadmin/usertoadmin',
      //       external: false
      //     }
      //   ]
      // },

      // {
      //   id: 'reports',
      //   title: 'Reports',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: '<i class="f-24 m-r-10 fa fa-flag-checkered text-c-yellow"></i>',
      //   external: true,

      //   children: [
      //     {
      //       id: 'userblnupdatereport',
      //       title: 'Balance Update',
      //       type: 'item',
      //       url: '/superadmin/userblnupdatereport',
      //       external: false
      //     },
          
      //     {
      //       id: 'usercountreport',
      //       title: 'DownLink User List',
      //       type: 'item',
      //       url: '/superadmin/usercountreport',
      //       external: false
      //     },
      //     {
      //       id: 'userprofitreport',
      //       title: 'Profit Or Income',
      //       type: 'item',
      //       url: '/superadmin/userprofitreport',
      //       external: false
      //     },
      //     {
      //       id: 'usertransactionreport',
      //       title: 'Fund Transfer',
      //       type: 'item',
      //       url: '/superadmin/usertransactionreport',
      //       external: false
      //     },
          
      //     {
      //       id: 'userbanarymtreport',
      //       title: 'Team Performance',
      //       type: 'item',
      //       url: '/superadmin/userbanarymtreport',
      //       external: false
      //     }
      //   ]
      // }
    ]
  }
];


const NavigationAdminItems = [
  {
    id: 'admin',
    title: 'Admin',
    type: 'group',
    icon: 'feather icon-align-left',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/admin/dashboard',
        classes: 'nav-item',
        icon: 'feather icon-home'
        //icon: '<i class="f-24 m-r-10 fa fa-tachometer text-c-yellow"></i>'
      },
      
      {
        id: 'users',
        title: 'Users',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'feather icon-users',
        external: true,
        children: [
          {
            id: 'profile',
            title: 'Profile',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/profile',
            external: false
          },
          {
            id: 'user',
            title: 'Student',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/user',
            external: false
          },
          {
            id: 'teacher',
            title: 'Teacher',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/teacher',
            external: false
          }
        ]
      },
      {
        id: 'authentication',
        title: 'Authentication',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'feather icon-lock',
        external: true,
        children: [
          {
            id: 'password',
            title: 'Change Password',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/password',
            external: false
          }
        ]
      },
      {
        id: 'settings',
        title: 'Configuration',
        type: 'collapse',
        classes: 'nav-item',
        icon: 'feather icon-settings',
        external: true,
        children: [
          
          {
            id: 'question',
            title: 'Question',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/question',
            external: false
          },
          {
            id: 'option',
            title: 'Option',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/option',
            external: false
          },
          {
            id: 'answer',
            title: 'Answer',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/answer',
            external: false
          },
          
        ]
      },
      {
        id: 'questionbankmodule',
        title: 'Question Bank',
        type: 'collapse',
        classes: 'nav-item',
        icon: '<i class="f-24 m-r-10 fa fa-book text-c-yellow"></i>',
        external: true,
        children: [
          {
            id: 'bank',
            title: 'Question Bank',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/bank',
            external: false
          },
          {
            id: 'qbankmapping',
            title: 'QB Mapping',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/qbankmapping',
            external: false
          },
          {
            id: 'mappedqbank',
            title: 'All Mapped QB',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/mappedqbank',
            external: false
          },
          {
            id: 'mappedexambank',
            title: 'Individual Mapped QB',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/Individualqb',
            external: false
          }
        ]
      },
      {
        id: 'exammodule',
        title: 'Exam Module',
        type: 'collapse',
        classes: 'nav-item',
        icon: '<i class="f-24 m-r-10 fa fa-university text-c-yellow"></i>',
        //icon: 'feather icon-file',
        external: true,
        children: [
          {
            id: 'exam',
            title: 'Exam List',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/exam',
            external: false
          },
          {
            id: 'examstart',
            title: 'Exam Start',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/examstart',
            external: false
          },
          {
            id: 'examresult',
            title: 'Exam Result',
            type: 'item',
            classes: 'nav-item',
            url: '/admin/examresult',
            external: false
          }
        ]
      },
      
      // {
      //   id: 'funds',
      //   title: 'Funds',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: '<i class="f-24 m-r-10 fab fa-btc text-c-yellow"></i>',
      //   //icon: '<i class="f-24 m-r-10 fa fa-credit-card text-c-yellow"></i>',
      //   //icon: '<i class="fab fa-btc"></i>',
      //   external: true,

      //   children: [
          
      //     {
      //       id: 'deposit',
      //       title: 'Fund Deposit To Admin',
      //       type: 'item',
      //       url: '/admin/deposit',
      //       external: false
      //     },
      //     {
      //       id: 'usertouser',
      //       title: 'Fund Transfer To User',
      //       type: 'item',
      //       url: '/admin/usertouser',
      //       external: false
      //     }
      //   ]
      // },

      // {
      //   id: 'reports',
      //   title: 'Reports',
      //   type: 'collapse',
      //   classes: 'nav-item',
      //   icon: '<i class="f-24 m-r-10 fa fa-flag-checkered text-c-yellow"></i>',
      //   external: true,

      //   children: [
      //     {
      //       id: 'reportemployee',
      //       title: 'Employee Report',
      //       type: 'item',
      //       url: '/admin/reportemployee',
      //       external: false
      //     },
      //     {
      //       id: 'reportfundhistory',
      //       title: 'Admin Fund Transaction',
      //       type: 'item',
      //       url: '/admin/reportfundhistory',
      //       external: false
      //     },
      //     {
      //       id: 'reportuserfundhistory',
      //       title: 'User Fund Transaction',
      //       type: 'item',
      //       url: '/admin/reportuserfundhistory',
      //       external: false
      //     }
          
      //   ]
      // }
    ]
  }
];

@Injectable()
export class NavigationItem {
  // public getAll() {
  //   return NavigationAllItems;
  // }
  public getSuperadmin() {
    return NavigationSuperadminItems;
  }
  public getAdmin() {
    return NavigationAdminItems;
  }
  public getUser() {
    return NavigationUserItems;
  }
}
