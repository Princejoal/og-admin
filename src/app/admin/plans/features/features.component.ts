import {Component, OnInit, Input, EventEmitter} from '@angular/core';
import { Router } from '@angular/router';
import { PlanService } from './../../../shared/services/plan.service';
declare var jQuery: any;
declare var window:any;
@Component({
  selector: 'og-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css'],
})

export class FeaturesComponent implements OnInit{
  @Input() data:any;
  selectedPlanCategory: string;
  event = new EventEmitter();
  plan: any;
  loading: boolean = false;
  features: any[];
  coupons: any[];
  users_s: number = 0;
  calculator_s: number = 0;
  templates_s: number = 0;
  visits_s: number = 0;
  leads_s: number = 0;
  isUserInfinity: boolean = false;
  isCalcInfinity: boolean = false;
  isTemplateInfinity: boolean = false;
  isVisitsInfinity: boolean = false;
  isLeadsInfinity: boolean = false;
  updateCompanies: boolean = false;

  constructor(public planService:PlanService, public router: Router){

  }

  ngOnInit(){

  }
  ngOnChanges(){
    console.log("jfkjdgg",this.data);
    this.initialize(this.data);
  }
  initialize(data){
    if(data){
      this.plan = this.data.plan;
      this.features = this.data.features;
      this.coupons = this.data.cycles;
      this.users_s = this.plan.users;
      this.calculator_s = this.plan.calculators;
      this.templates_s  = this.plan.templates;
      this.visits_s = this.plan.visits;
      this.leads_s = this.plan.leads;
      this.isUserInfinity = this.users_s>=0?false:true;
      this.isCalcInfinity = this.calculator_s>=0?false:true;
      this.isTemplateInfinity = this.templates_s>=0?false:true;
      this.isVisitsInfinity = this.visits_s>=0?false:true;
      this.isLeadsInfinity = this.leads_s>=0?false:true;
      this.features.forEach((feature)=>{
        if(feature.feature['_id'] == 'templates'){
            this.planService.planTemplates.next({updated:false,templates:[]});

          // if(['starter','business','freelancer','essentials','enterprise','business_jv','essentials_jv'].includes(this.plan._id)){
          //   this.planService.planTemplates.next({updated:false,templates:feature['sub_features']});
          // }else{
          //   this.planService.planTemplates.next({updated:false,templates:[]});

          // }
        }
      })

    }
  }

  getPlanFeatures(){
  	this.planService.getPlanFeatures(this.plan._id)
			.subscribe(
				(response:any)=>{
						this.features	 = response;
				},
				(response:any)=>{
						console.log('error_'+this.plan +"_plan",response);
				}
			);
  }

  deletePlan() {
      this.loading = true;
      console.log(this.plan._id);
      this.planService.deletePlan(this.plan._id)
          .subscribe(
              response => {
                  window.location.reload();
              },
              error => console.log(error)
          );
  }

  updatePlan() {
    this.loading = true;
    jQuery('#msg' + this.plan.name).html('');
    let plan_features:any[] = [];
    let features_update:any[] = [];
    this.features.forEach((feature)=>{
      let obj = {
        "id" : feature._id,
        "active" : feature.active,
        "is_limited" : feature.is_limited
      };
      plan_features.push(obj);

      feature.sub_features.forEach((feature)=>{
          let sub = {
            "id" : feature._id,
            "active" : feature.active
          };
          plan_features.push(sub);
      });

      let obj2 = {
        "id" : feature.feature._id,
        "description" : feature.feature.description,
        "name" : feature.feature.name
      };
      features_update.push(obj2);
      if(feature.feature['_id'] == 'templates'){
        this.planService.planTemplates.next({updated:true,templates:feature['sub_features']});
      }
    });
    let updateData = {
      cycles : this.coupons,
      features_update : features_update,
      features : plan_features,
      users: this.isUserInfinity ? -1 : this.users_s,
      calculators: this.isCalcInfinity ? -1 : this.calculator_s,
      templates: this.isTemplateInfinity ? -1 : this.templates_s,
      visits: this.isVisitsInfinity ? -1 : this.visits_s,
      leads: this.isLeadsInfinity ? -1 : this.leads_s,
      updateCompanies: this.updateCompanies
    };
    this.planService.updatePlanFeatures(this.plan._id,updateData)
     .subscribe(
       (result: any)=>{
         this.loading = false;
        //  this.features = result.features['default'][1].features;
        //  console.log("djjdjddf",this.features);
        //  this.coupons = result.features['default'][1].cycles;
        //  this.plan = result.features['default'][1].plan;
        //  this.users_s = this.plan.users;
        //  this.calculator_s = this.plan.calculators;
        //  this.templates_s = this.plan.templates;
        //  this.visits_s = this.plan.visits;
        //  this.leads_s = this.plan.leads;
         jQuery('#msg' + this.plan.id).html('successfully Updated');
         window.toastNotification('Features Updated');
       },
       (result: any)=>{
         console.log("err update");
         this.loading = false;
         jQuery('#btnSubmit' + this.plan.name).html('Submit').attr('disabled',false);
         jQuery('#msg' + this.plan.name).html('error occured :' + result);
       });
  }

  subfeatureCheck(index: number){
      let feature = this.features[index];
       this.features[index].sub_features.forEach((subfeature)=>{
           subfeature.active = feature.active;
       });
  }

  parentFeatureCheck(index: number, event){
      let value = event.target.checked;
      if(value){
        this.features[index].active = value;
      }
  }

}
