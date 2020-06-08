import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
    selector: 'app-kindergarten',
    templateUrl: '../module-base/views/base.component.html',
    styleUrls: ['../module-base/views/base.component.scss']
  })
  export class KindergartenService {

    protected commonFunction: CommonFunction;

    private nameEntity: String = 'kindergarten';
    private params: String = '';

    constructor(private http: HttpClient){
        this.commonFunction= new CommonFunction(); 
        this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
    }

    getKindergartensService() {
        this.commonFunction.write('get' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');     
        return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php');
    }

    deleteKindergartenService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('delete' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/delete.php?id=' + id);
    }
    
    insertKindergartenService(CIF: string, name: string){      
      this.params = 'CIF=' + CIF + '&name=' + name;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/new.php?'+ this.params);
    }

    updateKindergartenService(id: number, CIF: string, name: string) {
      this.params = 'id=' + id + '&CIF=' + CIF + '&name=' + name;
      this.commonFunction.write('insert' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/update.php?' + this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/'+ this.nameEntity +'/update.php?'+ this.params);
    }

    getKindergartenByIdService(id: number) {      
      this.params = 'id=' + id;
      this.commonFunction.write('get' + this.nameEntity + 'ByIdService', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?' + this.params);           
      return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/read.php?'+ this.params);
  }

    /*
    getKindergartensByDishService(id: number) {
      this.params = 'id=' + id;
      this.commonFunction.write('getKindergartensByDishServiceService', this.commonFunction.getBaseURL() + '/' + 'dishKindergartensRead.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/kindergartensRead.php?'+ this.params);
    }

    addKindergartensToDish(id: number, kindergartens: string){
      this.params = 'id=' + id + '&kindergartens=' + kindergartens;
      this.commonFunction.write('addKindergartensToDish', this.commonFunction.getBaseURL() + '/' + 'dishKindergartensNew.php?'+ this.params);     
      return this.http.get(this.commonFunction.getBaseURL() + '/' + 'dish' + '/kindergartensNew.php?'+ this.params);
    }
    */

  }
 


