import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-teacher',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class TeacherService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'teacher';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    /*
    getTeachersService() {
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');
    }
    */

    deleteTeacherService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertTeacherService(dni: string, name: string, surname: string, idSchool: number){      
      this.params = 'dni=' + dni + '&name=' + name + '&surname='+ surname + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateTeacherService(id: number, dni: string, name: string, surname: string, idSchool: number) {
      this.params = 'id=' + id + '&dni=' + dni + '&name=' + name + '&surname='+ surname + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getTeacherByIdService(id: number) {      
      this.params = 'id=' + id;
      this.commonFunction.write('get' + this.nameEntity + 'ByIdService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
    }

    getTeacherBySchoolService(idSchool: number) {      
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('get' + this.nameEntity + 'BySchoolService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
    }
    
    getTeachersService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    getTeachersNoUserService(idSchool: number) {      
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('get' + this.nameEntity + 'NoUserService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/noUser.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/noUser.php?'+ this.params);
    }

  }
 


