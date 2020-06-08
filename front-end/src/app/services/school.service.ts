import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';
import Kindergarten from '../types/kindergarten.type';

@Component({
    selector: 'app-school',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class SchoolService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'school';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getSchoolsService() {
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');
    }

    deleteSchoolService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertSchoolService(name: string, idKindergarten: number, address: string){      
      this.params = 'name=' + name + '&idKindergarten=' + idKindergarten + '&address=' + address;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateSchoolService(id: number, name: string, idKindergarten: number, address: string) {
      this.params = 'id=' + id + '&name=' + name + '&idKindergarten=' + idKindergarten + '&address=' + address;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getSchoolKindergartenService(id: number) {      
      this.params = 'kindergarten=true';
      this.commonFunction.write('get' + this.nameEntity + 'KindergartenByIdService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
    }

    getSchoolKindergartenByIdService(id: number) {      
      this.params = 'id=' + id + '&kindergarten=true';
      this.commonFunction.write('get' + this.nameEntity + 'KindergartenByIdService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
    }

    /*
    getSchoolsByDishService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('getSchoolsByDishServiceService', this.commonFunction.getBaseURL() + '/' + 'dishSchoolsRead.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/schoolsRead.php?'+ this.params);
    }

    addSchoolsToDish(id: number, schools: string){
      this.params = 'id=' + id + '&schools=' + schools;
      this.commonFunction.write('addSchoolsToDish', this.commonFunction.getBaseURL() + '/' + 'dishSchoolsNew.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/schoolsNew.php?'+ this.params);
    }
    */

  }
 


