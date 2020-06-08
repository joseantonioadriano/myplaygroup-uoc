import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CSchool from '../../classes/school.class';
import Intolerance from '../../types/intolerance.type';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { IntoleranceService } from '../../services/intolerance.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-intolerance',
    templateUrl: './intolerance.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class IntoleranceComponent extends BaseComponent  {

    intolerancesArray: Intolerance[] = [];
    schoolsArray: CSchool[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;
      
    // CLASSES
    //public labelClassName: string = !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string = 'inputcomp__label--activated';
    
    public selectingSchool: boolean= false;

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

    private intoleranceService: IntoleranceService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor IntoleranceComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.intoleranceService = new IntoleranceService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectIntolerance();
        this.selectSchools();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.intolerancesArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.intolerancesArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
      this.syncintolerances('save');      
    }

    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
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

    public updateIntolerance(index: number) {
      this.commonFunction.write('updateIntolerance', 'index:' + index.toString() + ', id: '
      + this.intolerancesArray[index][this.LABELID].toString() + ', login: ' 
      + this.intolerancesArray[index][this.LABELNAME].toString()  + ', idSchool: ' 
      + this.intolerancesArray[index][this.LABELIDSCHOOL].toString());
      this.intoleranceService.updateIntoleranceService(this.id, this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateIntoleranceOK(index);
      }, response => {
        this.updateIntoleranceKO();
      });
    }

    public deleteIntolerance(index: number) {
      this.commonFunction.write('deleteIntolerance', index.toString() + ' with id: ' + this.intolerancesArray[index][this.LABELID]);
      this.intoleranceService.deleteIntoleranceService(this.intolerancesArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteIntoleranceOK(index);
      }, response => {
        this.deleteIntoleranceKO();
      });
    }

    public insertIntolerance(intolerance: Intolerance) {
      const index: number = intolerance.id;
      this.commonFunction.write('insertIntolerance', 'index:' + index.toString() 
      + this.intolerancesArray[index][this.LABELNAME].toString() + ', idSchool'
      + this.intolerancesArray[index][this.LABELIDSCHOOL].toString());
      this.intoleranceService.insertIntoleranceService(this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertIntolerance', 'Register created with id: ' + response.newId);
        this.intolerancesArray[index][this.LABELID] = response.newId;
        this.insertIntoleranceOK(this.intolerancesArray[index][this.LABELID]);
      }, response => {
        this.selectIntoleranceKO();
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

    private selectIntoleranceOK() {
      this.commonFunction.write('selectIntoleranceOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.intolerancesArray.push({'id': this.responseGET[i][this.LABELID],
                                   'name': this.responseGET[i][this.LABELNAME],
                                   'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncintolerances('save');
      this.firstLoad();
    }

    private updateIntoleranceOK(index: number) {
      this.commonFunction.write('updateIntoleranceOK', index.toString());
      this.setUpdating(false);
      this.syncintolerances('save');
    }

    private deleteIntoleranceOK(index: number) {
      this.commonFunction.write('deleteIntoleranceOK', 'Intolerance deleted from DB, deleting from array now..');
      this.intolerancesArray.splice(index, 1);
      this.syncintolerances('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertIntoleranceOK(index: number) {
      this.commonFunction.write('insertIntoleranceOK', index.toString());
      this.syncintolerances('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectIntoleranceKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateIntoleranceKO() {
      this.commonFunction.write('updateIntoleranceKO', 'Error updating intolerance in DB');
      this.setUpdating(false);
    }

    private deleteIntoleranceKO() {
      this.commonFunction.write('deleteIntoleranceKO', 'Error deleting intolerance from DB');
    }

    private insertIntoleranceKO() {
      this.commonFunction.write('insertIntoleranceKO', 'Error inserting intolerance in DB');
    }

    /* LOADS */

    private loadintolerances() {
      this.commonFunction.write('loadintolerances', '');
      this.selectIntolerance();
    }


    private loadArrayintolerances() {
      this.commonFunction.write('loadArrayintolerances', '');
      /* TODO
      for (var i= 0; i<intoleranceModule.intolerancesArray.length; i++) {
        this.intolerancesArray.push(intoleranceModule.intolerancesArray[i]);
      }
      */
    }

    protected loadFieldsValidate() {
      this.commonFunction.write('loadFieldsValidate', '');
      this.loadFieldValidate(this.LABELNAME);
    }   

    /* RESETS */    

    protected resetFormFields(){
      this.commonFunction.write('resetFormFields', '');
      this.id = 0;
      this.name = '';
      this.idSchool = 0;
      this.nameSchool = '';
      this.schoolSelected= null;
      this.selectingSchool= false;
    }    

    protected resetExtra(){      
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
      this.commonFunction.write('getNumEntity', this.intolerancesArray.length.toString());
      return this.intolerancesArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewIntolerance() {
      this.commonFunction.write('addNewIntolerance', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncintolerances(option: string) {
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

    public addIntolerance() {
      this.commonFunction.write('addIntolerance', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addIntolerance', 'validateIntolerance === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addIntolerance', 'isUpdating === true');
          this.intolerancesArray[this.index][this.LABELID] = this.id;
          this.intolerancesArray[this.index][this.LABELNAME] = this.name;

          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.intolerancesArray[this.index][this.LABELIDSCHOOL] = this.idSchool;         

          this.updateIntolerance(this.index);
        } else {
          this.commonFunction.write('addIntolerance', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
          this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
          this.idSchool= this.schoolSelected.getId();
          const intolerance: Intolerance = { id: this.intolerancesArray.length, name: this.name, idSchool: this.idSchool};
          this.intolerancesArray.push(intolerance);
          this.insertIntolerance(intolerance);
        }
        this.resetForm();
        this.activateMode('list');
      }
    }

    public selectSchool(){
      (this.isSelectingSchool() === true) ? this.selectingSchool = false: this.selectingSchool = true;
    }

    public isSelectingSchool(){
      return this.selectingSchool;
    }


    public modifyIntolerance(index: number) {
      this.commonFunction.write('modifyIntolerance', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.intolerancesArray[index][this.LABELID];
      this.name = this.intolerancesArray[index][this.LABELNAME];
      this.idSchool= this.intolerancesArray[index][this.LABELIDSCHOOL];
      this.searchNameSchool(this.idSchool);
      this.logData();
      this.activateMode('form');
      this.resetErrors();
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

  }
 