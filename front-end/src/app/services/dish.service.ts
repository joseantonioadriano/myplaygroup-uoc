import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';
import CIntolerance from '../classes/intolerance.class';

@Component({
    selector: 'app-dish',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class DishService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'dish';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getDishesService(idSchool: number) {
        this.params = 'idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    deleteDishService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertDishService(name: string, intolerancesDish: String, idSchool: number){      
      this.params = 'name=' + name + '&intolerancesDish=' + intolerancesDish + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateDishService(id: number, name: String, idSchool: number) {
      this.params = 'id=' + id + '&name=' + name + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getDishByIdService(id: number) {      
      this.params = 'id=' + id;
      this.commonFunction.write('get' + this.nameEntity + 'ByIdService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
    }

  }
 


