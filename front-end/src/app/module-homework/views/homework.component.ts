import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Homework from '../../types/homework.type';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { HomeworkService } from '../../services/homework.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-homework',
    templateUrl: './homework.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class HomeworkComponent extends BaseComponent  {

    homeworksArray: Homework[] = [];
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

    private homeworkService: HomeworkService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor HomeworkComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.homeworkService = new HomeworkService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectHomework();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.homeworksArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.homeworksArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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

    public async selectHomework() {
      this.commonFunction.write('selectHomework', '');        
      this.homeworkService.getHomeworksService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectHomeworkOK();
        this.commonFunction.write('getHomeworks', 'ok');
      }, response => {
        this.selectHomeworkKO();
        this.commonFunction.write('getHomeworks', 'ko');
      });
    }

    public updateHomework(index: number) {
      this.commonFunction.write('updateHomework', 'index:' + index.toString() + ', id: '
      + this.homeworksArray[index][this.LABELID].toString() + ', login: ' 
      + this.homeworksArray[index][this.LABELNAME].toString() + ', idSchool: ' 
      + this.homeworksArray[index][this.LABELIDSCHOOL].toString() );
      this.homeworkService.updateHomeworkService(this.id, this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateHomeworkOK(index);
      }, response => {
        this.updateHomeworkKO();
      });
    }

    public deleteHomework(index: number) {
      this.commonFunction.write('deleteHomework', index.toString() + ' with id: ' + this.homeworksArray[index][this.LABELID]);
      this.homeworkService.deleteHomeworkService(this.homeworksArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteHomeworkOK(index);
      }, response => {
        this.deleteHomeworkKO();
      });
    }

    public insertHomework(homework: Homework) {
      const index: number = homework.id;
      this.commonFunction.write('insertHomework', 'index:' + index.toString() 
      + this.homeworksArray[index][this.LABELNAME].toString() + ', idSchool'
      + this.homeworksArray[index][this.LABELIDSCHOOL].toString());
      this.homeworkService.insertHomeworkService(this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertHomework', 'Register created with id: ' + response.newId);
        this.homeworksArray[index][this.LABELID] = response.newId;
        this.insertHomeworkOK(this.homeworksArray[index][this.LABELID]);
      }, response => {
        this.selectHomeworkKO();
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

    private selectSchoolsOK() {
      this.commonFunction.write('selectSchoolsOK', '');
      this.schoolsArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.schoolsArray.push(new CSchool(this.responseGET[i][this.LABELSCHOOLID], 
                                           this.responseGET[i][this.LABELSCHOOLNAME] + ' (' + this.responseGET[i][this.LABELSCHOOLKINDERGARTENNAME] + ')',
                                           this.responseGET[i][this.LABELSCHOOLKINDERGARTENNAME], 
                                           ''))
      }   
      this.syncHomeworks('save');      
    }

    private selectHomeworkOK() {
      this.commonFunction.write('selectHomeworkOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.homeworksArray.push({'id': this.responseGET[i][this.LABELID],
                                   'name': this.responseGET[i][this.LABELNAME],
                                   'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncHomeworks('save');
      this.firstLoad();
    }

    private updateHomeworkOK(index: number) {
      this.commonFunction.write('updateHomeworkOK', index.toString());
      this.setUpdating(false);
      this.syncHomeworks('save');
    }

    private deleteHomeworkOK(index: number) {
      this.commonFunction.write('deleteHomeworkOK', 'Homework deleted from DB, deleting from array now..');
      this.homeworksArray.splice(index, 1);
      this.syncHomeworks('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertHomeworkOK(index: number) {
      this.commonFunction.write('insertHomeworkOK', index.toString());
      this.syncHomeworks('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */
    
    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }

    private selectHomeworkKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateHomeworkKO() {
      this.commonFunction.write('updateHomeworkKO', 'Error updating homework in DB');
      this.setUpdating(false);
    }

    private deleteHomeworkKO() {
      this.commonFunction.write('deleteHomeworkKO', 'Error deleting homework from DB');
    }

    private insertHomeworkKO() {
      this.commonFunction.write('insertHomeworkKO', 'Error inserting homework in DB');
    }

    /* LOADS */

    private loadHomeworks() {
      this.commonFunction.write('loadHomeworks', '');
      this.selectHomework();
    }


    private loadArrayHomeworks() {
      this.commonFunction.write('loadArrayHomeworks', '');
      /* TODO
      for (var i= 0; i<homeworkModule.homeworksArray.length; i++) {
        this.homeworksArray.push(homeworkModule.homeworksArray[i]);
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
      this.commonFunction.write('getNumEntity', this.homeworksArray.length.toString());
      return this.homeworksArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewHomework() {
      this.commonFunction.write('addNewHomework', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncHomeworks(option: string) {
      this.commonFunction.write('syncHomeworks', option);
      if (option === 'save') {
        // TODO
        // homeworkModule.sethomeworksArray(this.homeworksArray);
      } else if (option === 'load') {
        this.loadArrayHomeworks();
        this.maxId = this.homeworksArray.length;
      }
      this.commonFunction.write('syncHomeworks', option + ' finished');
    }

    public addHomework() {
      this.commonFunction.write('addHomework', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addHomework', 'validateHomework === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addHomework', 'isUpdating === true');
          this.homeworksArray[this.index][this.LABELID] = this.id;
          this.homeworksArray[this.index][this.LABELNAME] = this.name;

          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.homeworksArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          
          
          this.updateHomework(this.index);
        } else {
          this.commonFunction.write('addHomework', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          const homework: Homework = { id: this.homeworksArray.length, name: this.name, idSchool: this.idSchool};
          this.homeworksArray.push(homework);
          this.insertHomework(homework);
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

    public modifyHomework(index: number) {
      this.commonFunction.write('modifyHomework', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.homeworksArray[index][this.LABELID];
      this.name = this.homeworksArray[index][this.LABELNAME];
      this.idSchool= this.homeworksArray[index][this.LABELIDSCHOOL];
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
 