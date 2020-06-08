import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CIntolerance from '../../classes/intolerance.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { IntoleranceService } from '../../services/intolerance.service';

@Component({
    selector: 'app-dish',
    templateUrl: '../../module-base/views/base.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class DishRelationsComponent extends BaseComponent {

    intolerancesArray: CIntolerance[] = [];
    intolerancesDishsArray: CIntolerance[] = [];
    intoleranceElem: CIntolerance;

    // LABELS
    private LABELID: string = 'id';
    private LABELNAME: string = 'name';    
    private LABELIDSCHOOL: string = 'idSchool';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';


    public selectedIntolerance: CIntolerance;

    private intoleranceService: IntoleranceService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor DishComponent', '');
      this.intoleranceService= new IntoleranceService(http);
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');        
        this.intoleranceService = new IntoleranceService(this.http);        
    }      

    public saveintolerancesToDish(index: number, id: number, intolerancesDish: string){
        this.commonFunction.write('saveintolerancesToDish', 'index:' + index.toString() + ', id: '
        + id + ', intolerancesDish: ' + intolerancesDish);
        this.intoleranceService.addintolerancesToDish(id, intolerancesDish).subscribe((response: any) => {
          console.log(response);
          this.responseGET = response;
          this.saveIntoleracesToDishOK(index);
        }, response => {
          this.saveIntoleracesToDishKO();
        });
      }

      private saveIntoleracesToDishOK(index: number) {
        this.commonFunction.write('saveIntoleracesToDishOK', 'index: '+index);
      }
  
      private saveIntoleracesToDishKO() {
        this.commonFunction.write('saveIntoleracesToDishKO', '');
      }
    
      public resetArrayintolerancesDish(){
        this.commonFunction.write('resetArrayintolerancesDish', '');
        delete this.intolerancesDishsArray;
        this.intolerancesDishsArray= new Array();
      }

      public addIntoleranceDish() {
        this.commonFunction.write('addIntoleranceDish', '');
        if (this.isUpdating() === true) {        
          this.commonFunction.write('addIntoleranceDish', 'isUpdating === true');                
        } else {
          this.commonFunction.write('addIntoleranceDish', 'isUpdating === false');                
        }
        if(this.intoleranceSelected() && !this.intoleranceAddedBefore()){
          this.commonFunction.write('addIntoleranceDish', 'adding '+this.selectedIntolerance.getId()+' to the intolerances');                
          this.intolerancesDishsArray.push(this.selectedIntolerance);                  
        }
      }

      public intoleranceSelected(){
        this.commonFunction.write('intoleranceSelected', '');        
        return (!(this.selectedIntolerance===undefined) && !(this.selectedIntolerance===null));
      }

      public getSelectedIntolerance(){
        return this.selectedIntolerance;
      }

      public intoleranceAddedBefore(){
        this.commonFunction.write('intoleranceAddedBefore', this.selectedIntolerance.getId().toString() + ":" + this.selectedIntolerance.getName().toString());
            let present: boolean= false;            
            let i= 0;
            while(!present && i< this.intolerancesDishsArray.length){
              this.intolerancesDishsArray[i].getId() == this.selectedIntolerance.getId() ? present= true : null;
              i++;
            }
        return present;
      }

      public loadArrayintolerances() {
        this.commonFunction.write('loadArrayintolerances', '');
        /* TODO
        for (var i= 0; i<intoleranceModule.intolerancesArray.length; i++) {
          this.intolerancesArray.push(intoleranceModule.intolerancesArray[i]);
        }
        */
      }

      public syncintolerances(option: string) {
        this.commonFunction.write('syncintolerances', option);
        if (option === 'save') {
          // TODO
          // intoleranceModule.setintolerancesArray(this.intolerancesArray);
        } else if (option === 'load') {
          this.loadArrayintolerances();
          this.maxId = this.intolerancesArray.length;
        }
        this.commonFunction.write('syncintolerances', option + ' finished');
      }

      private selectIntoleranceOK() {
        this.commonFunction.write('selectIntoleranceOK', '');
        for (let i = 0; i < this.responseGET.length; i++) {        
          this.intolerancesArray.push(new CIntolerance(this.responseGET[i][this.LABELID], this.responseGET[i][this.LABELNAME], this.responseGET[i][this.LABELIDSCHOOL]));
        }
        this.syncintolerances('save');
        this.firstLoad();
      }

      public async selectIntolerance() {
        this.commonFunction.write('selectIntolerance', '');        
        this.intoleranceService.getIntolerancesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.selectIntoleranceOK();
          this.commonFunction.write('getintolerances', 'ok');
        }, response => {
          this.selectIntoleranceKO();
          this.commonFunction.write('getintolerances', 'ko');
        });
      }

      private selectIntoleranceKO() {
        this.commonFunction.write('badResponseGET', '');
      }

      public getintolerancesDish(id: number){
        this.commonFunction.write('getintolerancesDish', '');     
        this.intoleranceService.getIntolerancesByDishService(id).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.getIntolerancesDishOK();              
          this.commonFunction.write('getintolerancesDish', 'ok');
        }, response => {
          this.getIntolerancesDishKO();
          this.commonFunction.write('getintolerancesDish', 'ko');
        });
      }

      private getintolerancesDishOK() {
        this.commonFunction.write('getintolerancesDishOK', '');
        for (let i = 0; i < this.responseGET.length; i++) {        
          this.intolerancesDishsArray.push(new CIntolerance(this.responseGET[i][this.LABELID], this.responseGET[i][this.LABELNAME], this.responseGET[i][this.LABELIDSCHOOL]));
        }
      }

      private getintolerancesDishKO() {
        this.commonFunction.write('getintolerancesDishKO', '');    
      } 
  
      public deleteIntoleranceDish(id: number){
        this.commonFunction.write('deleteIntoleranceDish', id.toString());    
        let posIntoleranceDish= this.intoleranceInDishArray(id);      
        if (posIntoleranceDish > -1){
          this.intolerancesDishsArray.splice(posIntoleranceDish, 1);
        }
        //this.showintolerancesDishsArrayrray();
      }
  
      private showintolerancesDishsArrayrray(){
        let i= 0;
        while(i< this.intolerancesDishsArray.length){
          console.log(this.intolerancesDishsArray[i].getId() + ":" + this.intolerancesDishsArray[i].getName());
          i++;
        }
      }
  
      public intoleranceInDishArray(id: number){
        this.commonFunction.write('intoleranceInDishArray', id.toString());    
        let i= 0;
        let pos= -1;
        while(i< this.intolerancesDishsArray.length && pos===-1){        
          this.intolerancesDishsArray[i].getId()===id ? pos = i : null;
          i++;
        }
        return pos;
      }
  
      public getStringIdFromArray(){      
        let i= 0;            
        let stringList: string= "";
        while(i< this.intolerancesDishsArray.length){
          stringList+= this.intolerancesDishsArray[i].getId() +"@";
          i++;
        }
        return stringList.slice(0, stringList.length-1);
      }
  

  }
 