import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CIntolerance from '../../classes/intolerance.class';
import CSchool from '../../classes/school.class';
import Dish from '../../types/dish.type';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { DishService } from '../../services/dish.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';
import { IntoleranceService } from '../../services/intolerance.service';
//import { DishRelationsComponent } from './dish.relations';

@Component({
    selector: 'app-dish',
    templateUrl: './dish.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class DishComponent extends BaseComponent  {

    dishsArray: Dish[] = [];
    intolerancesArray: CIntolerance[] = [];
    schoolsArray: CSchool[] = [];
    intolerancesDishsArray: CIntolerance[] = [];
  
    //public dishRelations: DishRelationsComponent;

    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;

    public selectingSchool: boolean= false;
    public selectedIntolerance: CIntolerance;
    private intoleranceService: IntoleranceService;
      
    // CLASSES
    //public labelClassName: string = !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string = 'inputcomp__label--activated';
    
    // BOOLEANS FOR ERROR CONTROLS
    // NAME
    public nameEmptyError: boolean = false;
    public nameCorrect: boolean = false;
    public nameNotCharError: boolean = false;
      
    // MESSAGE    
    public errorMSGName: string = 'Please introduce a name';
      
    // SEARCHS
    public inputSearchName: string = '';
    
    // LABELS
    private LABELID: string = 'id';
    private LABELNAME: string = 'name';
    private LABELIDSCHOOL: string = 'idSchool';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';

    private dishService: DishService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor DishComponent', '');
      this.sessionService= new SessionService();
      this.intoleranceService= new IntoleranceService(http);
      //this.dishRelations= new DishRelationsComponent(this.http);
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.dishService = new DishService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.intoleranceService = new IntoleranceService(this.http);        
        this.loadConf();
        this.selectDish();
        this.selectSchools();
        this.selectIntolerance();
    }      
    

    /* SEARCHS */


    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.dishsArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.dishsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
            break;            
          default:
            return false;
            break;
        }
      }
    }

    public filterList($event: any) {
      this.commonFunction.write('filterList', '');
      const searchValue = ($event.target.value.toString() ? $event.target.value.toString() : $event.which);
      this.commonFunction.write('filterList', 'this.inputSearchName:' + this.inputSearchName);
    }

    /* HTTPGET */      

    public async selectSchools() {
      this.commonFunction.write('selectSchools', '');        
      this.schoolService.getSchoolKindergartenService(this.idSchool).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectSchoolsOK();
        this.commonFunction.write('selectSchools', 'ok');
      }, response => {
        this.selectSchoolsKO();
        this.commonFunction.write('selectSchools', 'ko');
      });
    }

    private selectSchoolsOK() {
      this.commonFunction.write('selectSchoolsOK', '');
      this.schoolsArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.schoolsArray.push(new CSchool(this.responseGET[i][this.LABELSCHOOLID], 
                                           this.responseGET[i][this.LABELSCHOOLNAME] + ' (' + this.responseGET[i][this.LABELSCHOOLKINDERGARTENNAME] + ')',
                                           this.responseGET[i][this.LABELSCHOOLKINDERGARTENNAME], 
                                           ''))
      }   
      this.syncDishs('save');      
    }
    
    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }

    private async selectDish() {
      this.commonFunction.write('selectDish', '');        
      this.dishService.getDishesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectDishOK();
        this.commonFunction.write('getDishs', 'ok');
      }, response => {
        this.selectDishKO();
        this.commonFunction.write('getDishs', 'ko');
      });
    }

    private updateDish(index: number) {
      this.commonFunction.write('updateDish', 'index:' + index.toString() + ', id: '
      + this.dishsArray[index][this.LABELID].toString() + ', name: ' 
      + this.dishsArray[index][this.LABELNAME].toString() + ', idSchool: ' 
      + this.dishsArray[index][this.LABELIDSCHOOL].toString());
      this.dishService.updateDishService(this.id, this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateDishOK(index);
      }, response => {
        this.updateDishKO();
      });
    }

    public deleteDish(index: number) {
      this.commonFunction.write('deleteDish', index.toString() + ' with id: ' + this.dishsArray[index][this.LABELID]);
      this.dishService.deleteDishService(this.dishsArray[index][this.LABELID]).subscribe((response: any) => {
        this.responseGET = response;
        this.deleteDishOK(index);
      }, response => {
        this.deleteDishKO();
      });
    }

    private insertDish(dish: Dish) {
      const index: number = dish.id;
      this.commonFunction.write('insertDish', 'index:' + index.toString() 
      + this.dishsArray[index][this.LABELNAME].toString()  + ', idSchool'
      + this.dishsArray[index][this.LABELIDSCHOOL].toString() + ', stringIdFromArray' 
      + this.getStringIdFromArray());
      let stringIdFromArray: string = this.getStringIdFromArray();
      this.dishService.insertDishService(this.name, stringIdFromArray, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertDish', 'Register created with id: ' + response.newId);
        this.dishsArray[index][this.LABELID] = response.newId;
        //this.saveintolerancesToDish(this.index, response.newId, this.getStringIdFromArray());
        this.insertDishOK(this.dishsArray[index][this.LABELID]);
      }, response => {
        this.selectDishKO();
      });
    }  

    public async searchNameSchool(idSchool: number) {
      this.commonFunction.write('searchNameSchool', '');        
      this.schoolService.getSchoolKindergartenByIdService(idSchool).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNameSchoolOK();
        this.commonFunction.write('searchNameSchool', 'ok');
      }, response => {
        this.searchNameSchoolKO();
        this.commonFunction.write('searchNameSchool', 'ko');
      });
    }

    private searchNameSchoolOK() {
      this.commonFunction.write('searchNameSchoolOK', '');
      this.nameSchool= this.responseGET[0][this.LABELNAMESCHOOL] + ' (' + this.responseGET[0][this.LABELNAMEKINDERGARTEN] + ')';
    }

    private searchNameSchoolKO() {
      this.commonFunction.write('searchNameSchoolKO', '');
    }



    /* HTTPGET REPONSE OK */




    private selectDishOK() {
      this.commonFunction.write('selectDishOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.dishsArray.push({'id': this.responseGET[i][this.LABELID],
                            'name': this.responseGET[i][this.LABELNAME],
                            'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncDishs('save');
      this.firstLoad();
    }

    private updateDishOK(index: number) {
      this.commonFunction.write('updateDishOK', index.toString());
      this.setUpdating(false);
      this.syncDishs('save');
    }

    private deleteDishOK(index: number) {
      this.commonFunction.write('deleteDishOK', 'Dish deleted from DB, deleting from array now..');
      this.dishsArray.splice(index, 1);
      this.syncDishs('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertDishOK(index: number) {
      this.commonFunction.write('insertDishOK', index.toString());
      this.syncDishs('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */
    
    

    private selectDishKO() {
      this.commonFunction.write('badResponseGET', '');
    }


    private updateDishKO() {
      this.commonFunction.write('updateDishKO', 'Error updating dish in DB');      
      this.setUpdating(false);
    }

    private deleteDishKO() {
      this.commonFunction.write('deleteDishKO', 'Error deleting dish from DB');
    }

    private insertDishKO() {
      this.commonFunction.write('insertDishKO', 'Error inserting dish in DB');
    }

    /* LOADS */

    private loadDishs() {
      this.commonFunction.write('loadDishs', '');
      this.selectDish();
    }



    private loadArrayDishs() {
      this.commonFunction.write('loadArrayDishs', '');
      /* TODO
      for (var i= 0; i<dishModule.dishsArray.length; i++) {
        this.dishsArray.push(dishModule.dishsArray[i]);
      }
      */
    }

    protected loadFieldsValidate() {
      this.commonFunction.write('loadFieldsValidate', '');
      this.loadFieldValidate(this.LABELNAME);
    }   

    /* RESETS */    

    protected resetExtra(){
      this.commonFunction.write('resetExtra', '');
      this.selectedIntolerance = null;           
      this.schoolSelected= null;
      this.selectingSchool= false;
    }

    protected resetFormFields(){
      this.commonFunction.write('resetFormFields', '');
      this.id = 0;
      this.name = '';
      this.idSchool = 0;
      this.nameSchool = '';
      this.schoolSelected= null;
      this.selectingSchool= false;
    }    

    protected resetEmptyErrors() {
      //
    }

    protected resetNotCharErrors() {
      //
    }

    /* UTILITIES */

    protected logData() {
      this.commonFunction.write('logData', '');
      this.commonFunction.write('logData', 'id: ' + this.id);
      this.commonFunction.write('logData', 'index: ' + this.index);
      this.commonFunction.write('logData', 'name: ' + this.name);
      this.commonFunction.write('logData', 'idSchool: ' + this.idSchool);
      this.commonFunction.write('logData', 'nameSchool: ' + this.nameSchool);
      this.commonFunction.write('logData', 'maxId: ' + this.maxId);
    }


    /* VALIDATIONS */
    
    protected validateField(field: string) {
      this.commonFunction.write('validateField', field);
      switch(field) {
        case this.LABELNAME:
          this.validateFieldEmpty(field);
          this.validateFieldChars(field);
          break;
        default:
          break;
      }
    }

    protected validateFieldEmpty(field: string) {
      this.commonFunction.write('validateFieldEmpty', field);
      switch (field) {        
          case this.LABELNAME:
            if (this.validationEmpty(this.name ? this.name : '')) {
              this.errorEnrity(false);
              this.setFieldEmpty(this.LABELNAME, false);
            } else {
              this.deleteFieldEspaces(this.LABELNAME);
              this.setFieldEmpty(this.LABELNAME, true);
            }
            break;          
        default:
          break;
      }
    }

    protected validateFieldChars(field: string) {
      this.commonFunction.write('validateFieldChars', field);
      switch(field) {        
          case this.LABELNAME:
            if (!this.commonFunction.validationChars(this.name ? this.name : '')) {
              this.errorEnrity(true);
              this.setFieldChar(this.LABELNAME, false);
            } else {
                this.setFieldChar(this.LABELNAME, true);
            }
          break;          
        default:
          break;
      }
    }

    protected deleteFieldEspaces(field: string) {
      this.commonFunction.write('deleteFieldEspaces', field);
      switch (field) {        
          case this.LABELNAME:
            if (this.name !== undefined) {
              this.name = this.name.trim();
              this.name = this.name.replace(/ +/g, ' ');
            }
            break;          
        default:
          break;
      }
    }

    protected deleteEspaces() {
      this.commonFunction.write('deleteAllEspaces', '');
      this.deleteFieldEspaces(this.LABELNAME);
    }
       
    protected getNumEntity() {
      this.commonFunction.write('getNumEntity', this.dishsArray.length.toString());
      return this.dishsArray.length;
    }

    
    /* FUNCTIONALITIES */
   




    

    public addNewDish() {
      this.commonFunction.write('addNewDish', '');
      this.resetForm();      
      this.activateMode('form');
    }



    private syncDishs(option: string) {
      this.commonFunction.write('syncDishs', option);
      if (option === 'save') {
        // TODO
        // dishModule.setdishsArray(this.dishsArray);
      } else if (option === 'load') {
        this.loadArrayDishs();
        this.maxId = this.dishsArray.length;
      }
      this.commonFunction.write('syncDishs', option + ' finished');
    }



    public addDish() {
      this.commonFunction.write('addDish', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addDish', 'validateDish === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addDish', 'isUpdating === true');
          this.dishsArray[this.index][this.LABELID] = this.id;
          this.dishsArray[this.index][this.LABELNAME] = this.name;

          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.dishsArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          

          this.updateDish(this.index);
          this.saveintolerancesToDish(this.index, this.id, this.getStringIdFromArray());
        } else {
          this.commonFunction.write('addDish', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          const dish: Dish = { id: this.dishsArray.length, name: this.name, idSchool: this.idSchool};
          this.dishsArray.push(dish);
          this.insertDish(dish);
        }
        this.resetForm();
        this.resetArrayintolerancesDish();
        this.activateMode('list');
      }
    }

    public selectSchool(){
      (this.isSelectingSchool() === true) ? this.selectingSchool = false: this.selectingSchool = true;
    }

    public isSelectingSchool(){
      return this.selectingSchool;
    }

    public modifyDish(index: number) {
      this.commonFunction.write('modifyDish', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.dishsArray[index][this.LABELID];
      this.name = this.dishsArray[index][this.LABELNAME];
      this.idSchool= this.dishsArray[index][this.LABELIDSCHOOL];
      this.searchNameSchool(this.idSchool);
      this.logData();
      this.activateMode('form');
      this.resetErrors();            
      this.getIntolerancesDish(this.id);
    }    

    /* SET BOOLEANS VALIDATIONS */

    private setFieldChar(field: string, valide: boolean) {
    this.commonFunction.write('setFieldChar', field + ' ' + valide.toString());
    switch (field) {
      case this.LABELNAME:
      if (valide === false) {
        this.nameCorrect = false;
        this.nameNotCharError = true;
      } else {
        this.nameCorrect = true;
        this.nameNotCharError = false;
      }
      break;
      default:
      break;
    }
    }

    private setFieldEmpty(field: string, valide: boolean) {
    this.commonFunction.write('setFieldEmpty', field + ' ' + valide.toString());
    switch(field) {
      case this.LABELNAME:
      if (valide === false) {
        this.nameCorrect = false;
        this.nameEmptyError = true;
      } else {
        this.nameCorrect = true;
        this.nameEmptyError = false;
      }
      break;
      default:
      break;
    }
    }

    public resetArray(){      
      this.resetArrayintolerancesDish();
    }

    /* ONFOCUS ONCLICK */
        
    public showLabel(field: string) {
      this.commonFunction.write('showLabel', field);
      switch(field) {
        case this.LABELNAME:
        this.labelClassName = 'inputcomp__label--activated';
        // TODO (this.$refs.password as HTMLElement).focus();
        this.nameCorrect = false;
        break;       
        default:
        break;
      }
    }

    /* ONBLUR */

    public blurLabel(field: string) {
      this.commonFunction.write('blurLabel', field);
      switch (field) {
        case this.LABELNAME:
        if (!this.name || this.name === '') {
          this.labelClassName = 'inputcomp__label';
        }
        if (this.commonFunction.validationChars(this.name ? this.name : '') &&
          !this.validationEmpty(this.name ? this.name : '')) {
          this.nameCorrect = true;
        }
        this.validateField(this.LABELNAME);
        break;
        default:
        break;
      }
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

    public saveintolerancesToDish(index: number, id: number, intolerancesDish: string){
      this.commonFunction.write('saveintolerancesToDish', 'index:' + index.toString() + ', id: '
      + id + ', intolerancesDish: ' + intolerancesDish);
      this.intoleranceService.addIntolerancesToDish(id, intolerancesDish).subscribe((response: any) => {
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

    public getIntolerancesDish(id: number){
      this.commonFunction.write('getIntolerancesDish', '');     
      this.intoleranceService.getIntolerancesByDishService(id).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.getIntolerancesDishOK();              
        this.commonFunction.write('getIntolerancesDish', 'ok');
      }, response => {
        this.getIntolerancesDishKO();
        this.commonFunction.write('getIntolerancesDish', 'ko');
      });
    }

    private getIntolerancesDishOK() {
      this.commonFunction.write('getIntolerancesDishOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {        
        this.intolerancesDishsArray.push(new CIntolerance(this.responseGET[i][this.LABELID], this.responseGET[i][this.LABELNAME], this.responseGET[i][this.LABELIDSCHOOL]));
      }
    }

    private getIntolerancesDishKO() {
      this.commonFunction.write('getIntolerancesDishKO', '');    
    } 

    public deleteIntoleranceDish(id: number){
      this.commonFunction.write('deleteIntoleranceDish', id.toString());    
      let posIntoleranceDish= this.intoleranceInDishArray(id);      
      if (posIntoleranceDish > -1){
        this.intolerancesDishsArray.splice(posIntoleranceDish, 1);
      }
      //this.showintolerancesDishsArrayrray();
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


    public loadArrayintolerances() {
      this.commonFunction.write('loadArrayintolerances', '');
      /* TODO
      for (var i= 0; i<intoleranceModule.intolerancesArray.length; i++) {
        this.intolerancesArray.push(intoleranceModule.intolerancesArray[i]);
      }
      */
    }

  }
 