import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';
import CMenu from '../classes/menu.class';

@Component({
    selector: 'app-menu',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class MenuService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'menu';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getMenusService(idSchool: number) {
        this.params = 'idSchool=' + idSchool;
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);
    }

    deleteMenuService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertMenuService(name: string, idBreakfast: number, idStarter: number, idMain: number, idDessert: number, idSnack: number, idSchool: number){      
      this.params = 'name=' + name + '&idBreakfast=' + idBreakfast + '&idStarter=' + idStarter + '&idMain=' + idMain + '&idDessert=' + idDessert + '&idSnack=' + idSnack + '&idSchool=' + idSchool;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }
    
    updateMenuService(id: number, name: string, idBreakfast: number, idStarter: number, idMain: number, idDessert: number, idSnack: number, idSchool: number) {
      this.params = 'id=' + id + '&name=' + name + '&idBreakfast=' + idBreakfast + '&idStarter=' + idStarter + '&idMain=' + idMain + '&idDessert=' + idDessert + '&idSnack=' + idSnack + '&idSchool=' + idSchool;
      this.commonFunction.write('update' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    assignmentMenuService(idSchool: number, idMenu: number, idBreakfast: number, idStarter: number, idMain: number, idDessert: number, idSnack: number, idGroup: number){
      this.params = 'idSchool=' + idSchool + '&idMenu=' + idMenu + '&idBreakfast=' + idBreakfast + '&idStarter=' + idStarter + '&idMain=' + idMain + '&idDessert=' + idDessert + '&idSnack=' + idSnack + '&idGroup=' + idGroup;
      this.commonFunction.write('assignmentMenuService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/assignmentMenu.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/assignmentMenu.php?'+ this.params);
    }

    selectTodayMenuService(idSchool: number, idStudent){
      this.params = 'idSchool=' + idSchool + '&idStudent' + idStudent;
      this.commonFunction.write('selectTodayMenuService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/readTodayMenu.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/readTodayMenu.php?'+ this.params);
    }

  }
 


