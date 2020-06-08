import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Activity from '../../types/activity.type';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { ActivityService } from '../../services/activity.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-activity',
    templateUrl: './activity.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class ActivityComponent extends BaseComponent  {

    activitiesArray: Activity[] = [];
    schoolsArray: CSchool[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;


    public selectingSchool: boolean= false;    
      
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


    private activityService: ActivityService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor ActivityComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.activityService = new ActivityService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectActivity();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.activitiesArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.activitiesArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
      this.syncActivities('save');      
    }    
    
    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }    

    public async selectActivity() {
      this.commonFunction.write('selectActivity', '');        
      this.activityService.getActivitiesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectActivityOK();
        this.commonFunction.write('getActivities', 'ok');
      }, response => {
        this.selectActivityKO();
        this.commonFunction.write('getActivities', 'ko');
      });
    }

    public updateActivity(index: number) {
      this.commonFunction.write('updateActivity', 'index:' + index.toString() + ', id: '
      + this.activitiesArray[index][this.LABELID].toString() + ', login: ' 
      + this.activitiesArray[index][this.LABELNAME].toString()  + ', idSchool: ' 
      + this.activitiesArray[index][this.LABELIDSCHOOL].toString());
      this.activityService.updateActivityService(this.id, this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateActivityOK(index);
      }, response => {
        this.updateActivityKO();
      });
    }

    public deleteActivity(index: number) {
      this.commonFunction.write('deleteActivity', index.toString() + ' with id: ' + this.activitiesArray[index][this.LABELID]);
      this.activityService.deleteActivityService(this.activitiesArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteActivityOK(index);
      }, response => {
        this.deleteActivityKO();
      });
    }

    public insertActivity(activity: Activity) {
      const index: number = activity.id;
      this.commonFunction.write('insertActivity', 'index:' + index.toString() 
      + this.activitiesArray[index][this.LABELNAME].toString()  + ', idSchool'
      + this.activitiesArray[index][this.LABELIDSCHOOL].toString());
      this.activityService.insertActivityService(this.name, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertActivity', 'Register created with id: ' + response.newId);
        this.activitiesArray[index][this.LABELID] = response.newId;
        this.insertActivityOK(this.activitiesArray[index][this.LABELID]);
      }, response => {
        this.selectActivityKO();
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

    private selectActivityOK() {
      this.commonFunction.write('selectActivityOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.activitiesArray.push({'id': this.responseGET[i][this.LABELID],
                                   'name': this.responseGET[i][this.LABELNAME],
                                   'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncActivities('save');
      this.firstLoad();
    }

    private updateActivityOK(index: number) {
      this.commonFunction.write('updateActivityOK', index.toString());
      this.setUpdating(false);
      this.syncActivities('save');
    }

    private deleteActivityOK(index: number) {
      this.commonFunction.write('deleteActivityOK', 'Activity deleted from DB, deleting from array now..');
      this.activitiesArray.splice(index, 1);
      this.syncActivities('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertActivityOK(index: number) {
      this.commonFunction.write('insertActivityOK', index.toString());
      this.syncActivities('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectActivityKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateActivityKO() {
      this.commonFunction.write('updateActivityKO', 'Error updating activity in DB');
      this.setUpdating(false);
    }

    private deleteActivityKO() {
      this.commonFunction.write('deleteActivityKO', 'Error deleting activity from DB');
    }

    private insertActivityKO() {
      this.commonFunction.write('insertActivityKO', 'Error inserting activity in DB');
    }

    /* LOADS */

    private loadActivities() {
      this.commonFunction.write('loadActivities', '');
      this.selectActivity();
    }


    private loadArrayActivities() {
      this.commonFunction.write('loadArrayActivities', '');
      /* TODO
      for (var i= 0; i<activityModule.activitiesArray.length; i++) {
        this.activitiesArray.push(activityModule.activitiesArray[i]);
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
      this.commonFunction.write('getNumEntity', this.activitiesArray.length.toString());
      return this.activitiesArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewActivity() {
      this.commonFunction.write('addNewActivity', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncActivities(option: string) {
      this.commonFunction.write('syncActivities', option);
      if (option === 'save') {
        // TODO
        // activityModule.setactivitiesArray(this.activitiesArray);
      } else if (option === 'load') {
        this.loadArrayActivities();
        this.maxId = this.activitiesArray.length;
      }
      this.commonFunction.write('syncActivities', option + ' finished');
    }

    public addActivity() {
      this.commonFunction.write('addActivity', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addActivity', 'validateActivity === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addActivity', 'isUpdating === true');
          this.activitiesArray[this.index][this.LABELID] = this.id;
          this.activitiesArray[this.index][this.LABELNAME] = this.name;

          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.activitiesArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          

          this.updateActivity(this.index);
        } else {
          this.commonFunction.write('addActivity', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          const activity: Activity = { id: this.activitiesArray.length, name: this.name, idSchool: this.idSchool};
          this.activitiesArray.push(activity);
          this.insertActivity(activity);
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

    public modifyActivity(index: number) {
      this.commonFunction.write('modifyActivity', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.activitiesArray[index][this.LABELID];
      this.name = this.activitiesArray[index][this.LABELNAME];
      this.idSchool= this.activitiesArray[index][this.LABELIDSCHOOL];
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
 