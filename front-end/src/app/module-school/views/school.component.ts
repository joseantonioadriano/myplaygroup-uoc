import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CSchool from '../../classes/school.class';
import CKindergarten from '../../classes/kindergarten.class';
import School from '../../types/school.type';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { SchoolService } from '../../services/school.service';
import { KindergartenService } from '../../services/kindergarten.service';
//import { SchoolRelationsComponent } from './school.relations';

@Component({
    selector: 'app-school',
    templateUrl: './school.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class SchoolComponent extends BaseComponent  {

    schoolsArray: School[] = [];
    kindergartensArray: CKindergarten[] = [];
      
    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
    public address:string = '';
    public idKindergarten: number = 0;
    public nameKindergarten:string = '';
    public kindergartenSelected: CKindergarten;
      
    // CLASSES
    //public labelClassName: string = !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string = 'inputcomp__label--activated';
           
    public selectingKindergarten: boolean= false;

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
    private LABELIDKINDERDARTEN: string = 'idKindergarten';
    private LABELADDRESS: string = 'address';
    private LABELKINDERDARTENID: string = 'id';
    private LABELKINDERGARTENNAME: string = 'name';
    private LABELKINDERGARTENCIF: string = 'cif';

    private schoolService: SchoolService;
    private kindergartenService: KindergartenService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor SchoolComponent', '');      
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.schoolService = new SchoolService(this.http);
        this.kindergartenService = new KindergartenService(this.http);
        this.loadConf();
        this.selectSchool();        
        this.selectKindergartens();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.schoolsArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.schoolsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
    
    public async selectSchool() {
      this.commonFunction.write('selectSchool', '');        
      this.schoolService.getSchoolsService().subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectSchoolOK();
        this.commonFunction.write('getSchools', 'ok');
      }, response => {
        this.selectSchoolKO();
        this.commonFunction.write('getSchools', 'ko');
      });
    }

    public updateSchool(index: number) {
      this.commonFunction.write('updateSchool', 'index:' + index.toString() + ', id: '
      + this.schoolsArray[index][this.LABELID].toString() + ', name: ' 
      + this.schoolsArray[index][this.LABELNAME].toString() + ', idKindergarten: ' 
      + this.schoolsArray[index][this.LABELIDKINDERDARTEN].toString() + ', address: '
      + this.schoolsArray[index][this.LABELADDRESS].toString() );
      this.schoolService.updateSchoolService(this.id, this.name, this.idKindergarten, this.address).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateSchoolOK(index);
      }, response => {
        this.updateSchoolKO();
      });
    }

    public isKindergartenSelected(){
      this.commonFunction.write('isKindergartenSelected', '');        
      return true;
    }

    public deleteSchool(index: number) {
      this.commonFunction.write('deleteSchool', index.toString() + ' with id: ' + this.schoolsArray[index][this.LABELID]);
      this.schoolService.deleteSchoolService(this.schoolsArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteSchoolOK(index);
      }, response => {
        this.deleteSchoolKO();
      });
    }

    public insertSchool(school: School) {
      const index: number = school.id;
      this.commonFunction.write('insertSchool', 'index:' + index.toString() 
      + this.schoolsArray[index][this.LABELNAME].toString()
      + this.schoolsArray[index][this.LABELIDKINDERDARTEN].toString()
      + this.schoolsArray[index][this.LABELADDRESS].toString()
      );
      this.schoolService.insertSchoolService(this.name, this.idKindergarten, this.address).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertSchool', 'Register created with id: ' + response.newId);
        this.schoolsArray[index][this.LABELID] = response.newId;
        this.insertSchoolOK(this.schoolsArray[index][this.LABELID]);
      }, response => {
        this.selectSchoolKO();
      });
    }  


    /* HTTPGET REPONSE OK */

    private selectSchoolOK() {
      this.commonFunction.write('selectSchoolOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.schoolsArray.push({'id': this.responseGET[i][this.LABELID],
                                   'name': this.responseGET[i][this.LABELNAME],
                                  'idKindergarten': this.responseGET[i][this.LABELIDKINDERDARTEN],
                                  'address': this.responseGET[i][this.LABELADDRESS]
                                });
        //this.showArray();
      }
      this.syncSchools('save');
      this.firstLoad();
    }

      public async searchNameKindergarten(idKindergarten: number) {
      this.commonFunction.write('searchNameKindergarten', idKindergarten.toString());        
      this.kindergartenService.getKindergartenByIdService(idKindergarten).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNameKindergartenOK();
        this.commonFunction.write('getGroups', 'ok');
      }, response => {
        this.searchNameKindergartenKO();
        this.commonFunction.write('getGroups', 'ko');
      });
    }

    private searchNameKindergartenOK() {
      this.commonFunction.write('searchNameKindergartenOK', '');
      this.nameKindergarten= this.responseGET[0][this.LABELKINDERGARTENNAME]
    }

    private searchNameKindergartenKO() {
      this.commonFunction.write('searchNameKindergartenKO', '');
    }

    private updateSchoolOK(index: number) {
      this.commonFunction.write('updateSchoolOK', index.toString());
      this.setUpdating(false);
      this.syncSchools('save');
    }

    private deleteSchoolOK(index: number) {
      this.commonFunction.write('deleteSchoolOK', 'School deleted from DB, deleting from array now..');
      this.schoolsArray.splice(index, 1);
      this.syncSchools('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertSchoolOK(index: number) {
      this.commonFunction.write('insertSchoolOK', index.toString());
      this.syncSchools('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectSchoolKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateSchoolKO() {
      this.commonFunction.write('updateSchoolKO', 'Error updating school in DB');
      this.setUpdating(false);
    }

    private deleteSchoolKO() {
      this.commonFunction.write('deleteSchoolKO', 'Error deleting school from DB');
    }

    private insertSchoolKO() {
      this.commonFunction.write('insertSchoolKO', 'Error inserting school in DB');
    }

    /* LOADS */

    private loadSchools() {
      this.commonFunction.write('loadSchools', '');
      this.selectSchool();
    }


    private loadArraySchools() {
      this.commonFunction.write('loadArraySchools', '');
      /* TODO
      for (var i= 0; i<schoolModule.schoolsArray.length; i++) {
        this.schoolsArray.push(schoolModule.schoolsArray[i]);
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
      this.idKindergarten= 0;
      this.nameKindergarten= '';
      this.address = '';
      this.kindergartenSelected= null;
      this.selectingKindergarten= false;
    }    

    protected resetExtra(){      
      this.selectingKindergarten= false;
      this.kindergartenSelected= null;
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
      this.commonFunction.write('logData', 'idKindergarten: ' + this.idKindergarten);
      this.commonFunction.write('logData', 'nameKindergarten: ' + this.nameKindergarten);
      this.commonFunction.write('logData', 'address: ' + this.address);
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
      this.commonFunction.write('getNumEntity', this.schoolsArray.length.toString());
      return this.schoolsArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewSchool() {
      this.commonFunction.write('addNewSchool', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncSchools(option: string) {
      this.commonFunction.write('syncSchools', option);
      if (option === 'save') {
        // TODO
        // schoolModule.setschoolsArray(this.schoolsArray);
      } else if (option === 'load') {
        this.loadArraySchools();
        this.maxId = this.schoolsArray.length;
      }
      this.commonFunction.write('syncSchools', option + ' finished');
    }

    public addSchool() {
      this.commonFunction.write('addSchool', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addSchool', 'validateSchool === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addSchool', 'isUpdating === true');
          this.schoolsArray[this.index][this.LABELID] = this.id;
          this.schoolsArray[this.index][this.LABELNAME] = this.name;
          this.isSelectingKindergarten()=== true ? 
            this.idKindergarten = this.kindergartenSelected.getId() : null;
          this.schoolsArray[this.index][this.LABELIDKINDERDARTEN] = this.idKindergarten;
          this.schoolsArray[this.index][this.LABELADDRESS] = this.address;
          this.updateSchool(this.index);
        } else {
          this.commonFunction.write('addSchool', 'isUpdating === false');
          this.maxId++;
          this.idKindergarten = this.kindergartenSelected.getId();          
          const school: School = { id: this.schoolsArray.length, name: this.name, idKindergarten: this.idKindergarten, address: this.address};
          this.schoolsArray.push(school);
          this.insertSchool(school);
        }
        this.resetForm();
        this.activateMode('list');
      }
    }

    public showArray(){
      this.commonFunction.write('showArray', '');        
      for(let i= 0; i< this.schoolsArray.length; i++){
        console.log(
          this.schoolsArray[i][this.LABELID]+'_'+
          this.schoolsArray[i][this.LABELNAME]+'_'+
          this.schoolsArray[i][this.LABELIDKINDERDARTEN]+
          this.schoolsArray[i][this.LABELADDRESS]+'_');
      }
    }    

    public selectKindergarten(){
      //this.commonFunction.write('selectKindergarten', '');
       (this.isSelectingKindergarten() === true) ? this.selectingKindergarten = false: this.selectingKindergarten = true;
    }

    public isSelectingKindergarten(){
      //this.commonFunction.write('isSelectingKindergarten', this.selectingKindergarten.toString());
      return this.selectingKindergarten;
    }    

    public modifySchool(index: number) {
      this.commonFunction.write('modifySchool', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.schoolsArray[index][this.LABELID];
      this.name = this.schoolsArray[index][this.LABELNAME];      
      this.address = this.schoolsArray[index][this.LABELADDRESS];
      this.idKindergarten = this.schoolsArray[index][this.LABELIDKINDERDARTEN];      
      this.searchNameKindergarten(this.idKindergarten);      
      this.logData();
      this.activateMode('form');
      this.resetErrors();
    }    

    public async selectKindergartens() {
      this.commonFunction.write('selectKindergartens', '');        
      this.kindergartenService.getKindergartensService().subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectKindergartensOK();
        this.commonFunction.write('getTeachers', 'ok');
      }, response => {
        this.selectKindergartensKO();
        this.commonFunction.write('getTeachers', 'ko');
      });
    }       

    private selectKindergartensOK() {
      this.commonFunction.write('selectTeacherOK', '');
      this.kindergartensArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.kindergartensArray.push(new CKindergarten(this.responseGET[i][this.LABELKINDERDARTENID], 
                                                       this.responseGET[i][this.LABELKINDERGARTENNAME],
                                                       this.responseGET[i][this.LABELKINDERGARTENCIF]))
      }   
      this.syncSchools('save');      
    }

    private selectKindergartensKO() {
      this.commonFunction.write('selectKindergartensKO', '');
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
 