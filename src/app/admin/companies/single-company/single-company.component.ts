import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import {AfterViewInit, Component, NgZone, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from './../../../shared/services/company.service';
import {AdminCompany} from '../../../shared/models/company';

declare var jQuery: any;

@Component({
  selector: 'og-single-company',
  templateUrl: './single-company.component.html',
  styleUrls: ['./single-company.component.css'],
})

export class SingleCompanyComponent implements AfterViewInit {

  company_users: any[];
  id: number;
  currentTab: any;
  @Output() company: any;
  custom_features:any;

  constructor(public companyService: CompanyService,
              public route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getCompanyInfo(this.id);
    });

  }

  ngAfterViewInit() {
    
    this.getCompanyInfo(this.id);
    this.getCompanyUser(this.id);
  }

  showTab(tab: any) {
    this.currentTab = tab;
    if (tab === 'company') {
      jQuery('.company').removeClass('hide');
      jQuery('.membership').addClass('hide');
      jQuery('.team').addClass('hide');
      jQuery('.features').addClass('hide');
      jQuery('.integrations').addClass('hide');
      jQuery('.logs').addClass('hide');
    }
    else if (tab === 'membership') {
      jQuery('.company').addClass('hide');
      jQuery('.membership').removeClass('hide');
      jQuery('.team').addClass('hide');
      jQuery('.features').addClass('hide');
      jQuery('.integrations').addClass('hide');
      jQuery('.logs').addClass('hide');
    }
    else if (tab === 'team') {
      jQuery('.team').removeClass('hide');
      jQuery('.company').addClass('hide');
      jQuery('.membership').addClass('hide');
      jQuery('.features').addClass('hide');
      jQuery('.integrations').addClass('hide');
      jQuery('.logs').addClass('hide');
    }
    else if (tab === 'features') {
      jQuery('.team').addClass('hide');
      jQuery('.features').removeClass('hide');
      jQuery('.company').addClass('hide');
      jQuery('.membership').addClass('hide');
      jQuery('.integrations').addClass('hide');
      jQuery('.logs').addClass('hide');
    }
    else if (tab === 'integration') {
      jQuery('.team').addClass('hide');
      jQuery('.integrations').removeClass('hide');
      jQuery('.company').addClass('hide');
      jQuery('.membership').addClass('hide');
      jQuery('.features').addClass('hide');
      jQuery('.logs').addClass('hide');
    }
    else if (tab === 'logs') {
      jQuery('.team').addClass('hide');
      jQuery('.integrations').addClass('hide');
      jQuery('.company').addClass('hide');
      jQuery('.membership').addClass('hide');
      jQuery('.features').addClass('hide');
      jQuery('.logs').removeClass('hide');
    }
  }

  getCompanyUser(id: number) {
    this.companyService.getCompanyUsers(id)
      .subscribe(
        (response: any) => {

          this.company_users = response;
        });
  }

  getCompanyInfo(id: number) {
<<<<<<< HEAD
    Observable.forkJoin([
      this.companyService.getCompanyInfo(this.id),
      this.companyService.getCustomFeatures(this.id)])
      .subscribe((data:any)=>{
        this.company = new AdminCompany(data[0].company);
        this.company['reset_period_list'] = data[0].reset_period_list;
        this.custom_features = data[1];
      },error=>{
        console.log("error");
    });
    // this.companyService.getCompanyInfo(id)
    //   .subscribe(
    //     (response: any) => {
    //       this.company = new AdminCompany(response.company);
    //       this.company['reset_period_list'] = response.reset_period_list;

    //     },
    //     (response: any) => {
    //     }
    //   );
=======
    this.companyService.getCompanyInfo(id)
      .subscribe(
        (response: any) => {
          this.company = new AdminCompany(response.company);
          this.company['reset_period_list'] = response.reset_period_list;
        },
        (response: any) => {
        }
      );
>>>>>>> 6bcfe3244337c8f8d29056c055f3e698980dda15
  }
  updatecompany(data){
    this.company = data;
  }

}
