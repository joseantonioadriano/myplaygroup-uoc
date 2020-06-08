import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-activity',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class ActivityService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'activity';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getActivitiesService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    deleteActivityService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertActivityService(name: string, idSchool: number){      
      this.params = 'name=' + name + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateActivityService(id: number, name: string, idSchool: number) {
      this.params = 'id=' + id + '&name=' + name + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getActivitiesByDishService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('getActivitiesByDishServiceService', this.commonFunction.getBaseURL() + '/' + 'dishActivitiesRead.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/activitiesRead.php?'+ this.params);
    }

    addActivitiesToDish(id: number, activities: string){
      this.params = 'id=' + id + '&activities=' + activities;
      this.commonFunction.write('addActivitiesToDish', this.commonFunction.getBaseURL() + '/' + 'dishActivitiesNew.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/activitiesNew.php?'+ this.params);
    }

  }
 


