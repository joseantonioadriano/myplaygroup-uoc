import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-parent',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class ParentService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'parent';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getParentsService(idSchool: number) {
      this.params = 'idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    deleteParentService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertParentService(dni: string, name: string, surname: string, type: number, idSchool: number){      
      this.params = 'dni=' + dni + '&name=' + name + '&surname='+ surname + '&type=' + type + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateParentService(id: number, dni: string, name: string, surname: string, type: number, idSchool: number) {
      this.params = 'id=' + id + '&dni=' + dni + '&name=' + name + '&surname='+ surname + '&type=' + type + '&idSchool=' + idSchool;
      this.commonFunction.write('update' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getParentByIdService(id: number) {      
      this.params = 'id=' + id;
      this.commonFunction.write('get' + this.nameEntity + 'ByIdService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
    }

    getParentsNoUserService(idSchool: number) {      
      this.params = 'idSchool=' + idSchool;
      this.commonFunction.write('get' + this.nameEntity + 'NoUserService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/noUser.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/noUser.php?'+ this.params);
    }

  }
 


