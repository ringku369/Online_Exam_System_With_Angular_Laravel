import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IOption } from 'ng-select';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { AuthtokenService } from 'src/app/services/authtoken.service';
//import { SuperadminDashboardService } from 'src/app/services/superadmin/superadmin-dashboard.service';
import { SuperadminUserService } from 'src/app/services/superadmin/superadmin-user.service';
import {NgbCalendar, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {ColorPickerService, Rgba} from 'ngx-color-picker';

import * as Highcharts from 'highcharts';
import * as HC_more from 'highcharts/highcharts-more';
import HC_drilldown from 'highcharts/modules/drilldown';
HC_drilldown(Highcharts);


const now = new Date();

@Component({
  selector: 'app-superadmin-dashboard',
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.scss']
})
export class SuperadminDashboardComponent implements OnInit {
  public Highcharts = Highcharts;
  public barBasicChartOptions: any;
  public barBasicChartOptions1: any;
  public lineBasicChartOptions: any;

  
  // common
  success =  [];
  errors = [];
  
  form: any = {
    sno: null,
    mobile: null,
    fdate: null,
    user : '0',
    user_id : null
  };
  
  emptyMessage(): void{
    this.errors = [];
    this.success = [];
  }
  
  successMsg(msg: any): any{
    for (let index = 0; index < msg.length; index++) {
      const element = msg[index];
      this.toastr.success(element);
    }
  }


  errorMsg(msg: any): any{
    for (let index = 0; index < msg.length; index++) {
      const element = msg[index];
      this.toastr.error(element);
    }
  }

  
  fdate: NgbDateStruct;
  tdate: NgbDateStruct;
  public date: {year: number, month: number};


  modelDisabled: NgbDateStruct = {
    year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()
  };

  selectToday() {
    this.fdate = {year: now.getFullYear(), month: now.getMonth() + 1, day: now.getDate()};
  }
  // common
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    
    private authservice: AuthService,
    private authtoken: AuthtokenService,
    private authstatus: AuthstatusService,
    //private superadminDashboardService: SuperadminDashboardService,
    private superadminUserService: SuperadminUserService,

    public parserFormatter: NgbDateParserFormatter, 
    public calendar: NgbCalendar

    

  )
  {
    this.spinner.show();
  }

  ngOnInit() {
    this.spinner.hide();
    this.chartfunction();
    
  }


  chartfunction(){
    this.barBasicChartOptions = {
      chart: {
        type: 'column'
      },
      colors: ['#2196f3', '#7759de', '#f44336', '#00ACC1'],
      title: {
        text: 'Monthly user count'
      },
      subtitle: {
        text: 'Opening accounts comparison'
      },
      xAxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number Of User'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} Acc</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
        name: 'Down Link Users',
        data: [50, 100, 150, 200, 150, 100, 50, 100, 150, 200, 250, 300]
      }, 
      //{
      //   name: 'New York',
      //   data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

      // }, {
      //   name: 'London',
      //   data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

      // }, {
      //   name: 'Berlin',
      //   data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

      // }
    ]
    };

    this.barBasicChartOptions1 = {
      chart: {
        type: 'column'
      },
      colors: ['#2196f3', '#7759de', '#f44336', '#00ACC1'],
      title: {
        text: 'Daily user count'
      },
      subtitle: {
        text: 'Opening accounts comparison'
      },
      xAxis: {
        categories: [
          '01',
          '02',
          '03',
          '04',
          '05',
          '06',
          '07',
          '08',
          '09',
          '10',
          '11',
          '12',
          '13',
          '14',
          '15',
          '16',
          '17',
          '18',
          '19',
          '20',
          '21',
          '22',
          '23',
          '24',
          '25',
          '26',
          '27',
          '28',
          '29',
          '30'
        ],
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Number Of User'
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
        '<td style="padding:0"><b>{point.y:.1f} Acc</b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
        name: 'Down Link Users',
        data: [
          50, 100, 150, 200, 150, 100, 50, 100, 150, 200, 250, 300, 200, 250, 300,
          50, 100, 150, 200, 150, 100, 50, 100, 150, 200, 250, 300, 200, 250, 300
        ]
      }, 
      //{
      //   name: 'New York',
      //   data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3]

      // }, {
      //   name: 'London',
      //   data: [48.9, 38.8, 39.3, 41.4, 47.0, 48.3, 59.0, 59.6, 52.4, 65.2, 59.3, 51.2]

      // }, {
      //   name: 'Berlin',
      //   data: [42.4, 33.2, 34.5, 39.7, 52.6, 75.5, 57.4, 60.4, 47.6, 39.1, 46.8, 51.1]

      // }
    ]
    };



    this.lineBasicChartOptions = {
      chart: {
        type: 'spline',
      },
      colors: ['#00ACC1', '#2196f3', '#7759de'],
      title: {
        text: 'Solar Employment Growth by Sector, 2010-2017'
      },
      subtitle: {
        text: 'Source: thesolarfoundation.com'
      },
      yAxis: {
        title: {
          text: 'Number of Employees'
        }
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 2010
        }
      },
      series: [{
        name: 'Installation',
        data: [5, 25, 15, 35, 25, 35, 45, 75]
      }, {
        name: 'Manufacturing',
        data: [25, 35, 45, 75, 5, 25, 15, 35, ]
      }, {
        name: 'Sales & Distribution',
        data: [45, 75, 25, 5, 15, 55, 5, 25]
      }],
      responsive: {
        rules: [{
          condition: {
            maxWidth: 500
          },
          chartOptions: {
            legend: {
              layout: 'horizontal',
              align: 'center',
              verticalAlign: 'bottom'
            }
          }
        }]
      }
    };

  }


}
