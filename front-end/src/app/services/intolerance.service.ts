import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-intolerance',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class IntoleranceService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'intolerance';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getIntolerancesService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    deleteIntoleranceService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertIntoleranceService(name: string, idSchool: number){      
      this.params = 'name=' + name + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateIntoleranceService(id: number, name: string, idSchool: number) {
      this.params = 'id=' + id + '&name=' + name + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getIntolerancesByDishService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('getIntolerancesByDishServiceService', this.commonFunction.getBaseURL() + '/' + 'dish' + '/intolerancesRead.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/intolerancesRead.php?'+ this.params);
    }

    addIntolerancesToDish(id: number, intolerances: string){
      this.params = 'id=' + id + '&intolerances=' + intolerances;
      this.commonFunction.write('addIntolerancesToDish', this.commonFunction.getBaseURL() + '/' + 'dish' +'/intolerancesNew.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/intolerancesNew.php?'+ this.params);
    }

    getIntolerancesByStudentService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('getIntolerancesByStudentService', this.commonFunction.getBaseURL() + '/' + 'student' + '/intolerancesRead.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'student' + '/intolerancesRead.php?'+ this.params);
    }

    addIntolerancesToStudent(id: number, intolerances: string){
      this.params = 'id=' + id + '&intolerances=' + intolerances;
      this.commonFunction.write('addIntolerancesToStudent', this.commonFunction.getBaseURL() + '/' + 'student' +'/intolerancesNew.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'student' + '/intolerancesNew.php?'+ this.params);
    }

  }
 


