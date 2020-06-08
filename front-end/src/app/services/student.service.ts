import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-student',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class StudentService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'student';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getStudentsService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    getStudentByIdService(id: number, idSchool: number) {
      this.params = 'id=' + id + '&idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    deleteStudentService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertStudentService(dni: string, name: string, surname: string, idResponsable1: number, idResponsable2: number, idSchool: number, intolerancesStudent: String, genre: number, dateBirth: string){      
      this.params = 'dni=' + dni + '&name=' + name + '&surname='+ surname + '&idResponsable1=' + idResponsable1 + '&idResponsable2=' + idResponsable2 + '&idSchool=' + idSchool + '&intolerancesStudent=' + intolerancesStudent + '&genre=' + genre + '&dateBirth=' + dateBirth;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateStudentService(id: number, dni: string, name: string, surname: string, idResponsable1: number, idResponsable2: number, idSchool: number, genre: number, dateBirth: string) {
      this.params = 'id=' + id + '&dni=' + dni + '&name=' + name + '&surname='+ surname + '&idResponsable1=' + idResponsable1 + '&idResponsable2=' + idResponsable2 + '&idSchool=' + idSchool + '&genre=' + genre + '&dateBirth=' + dateBirth;
      this.commonFunction.write('update' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    updateTodaysRegisterService(id: number, depositions: number, meals: number, nap: number, remarks: string) {
      this.params = 'id=' + id + '&depositions=' + depositions + '&meals=' + meals + '&nap=' + nap + '&remarks=' + remarks;
      this.commonFunction.write('updateTodaysRegisterService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/updateTodaysRegister.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/updateTodaysRegister.php?'+ this.params);
    }

    selectTodaysRegisterService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('selectTodaysRegisterService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readTodaysRegister.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/readTodaysRegister.php?'+ this.params);
    }

    getStudentsNoEnrolledService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('get' + this.nameEntity + 'NoEnrolledService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readNoEnrolled.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readNoEnrolled.php?' + this.params);
    }

    getStudentsEnrolledService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('get' + this.nameEntity + 'EnrolledService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readEnrolled.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readEnrolled.php?' + this.params);
    }

  }
 


