import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-course',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class CourseService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'course';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getCoursesService() {
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');
    }

    deleteCourseService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertCourseService(name: string){      
      this.params = 'name=' + name;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateCourseService(id: number, name: string) {
      this.params = 'id=' + id + '&name=' + name;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getCourseActiveToSchool(idSchool: number){
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('getCourseActiveToSchool', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readCourseActive.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readCourseActive.php?'+ this.params);
    }

  }
 


