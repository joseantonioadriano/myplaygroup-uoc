import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Group from '../../types/group.type';
import CTeacher from '../../classes/teacher.class';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { GroupService } from '../../services/group.service';
import { TeacherService } from '../../services/teacher.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';
//import { GroupRelationsComponent } from './group.relations';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class GroupComponent extends BaseComponent  {

    groupsArray: Group[] = [];
    teachersArray: CTeacher[] = [];
    schoolsArray: CSchool[] = [];

    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
    public idTutor: number = 0;
    public nameTutor:string = '';
    public tutorSelected: CTeacher;
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;

    private USERSUPERADMIN: String = '1';
      
    // CLASSES
    //public labelClassName: string = !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string = 'inputcomp__label--activated';
    
    public selectingTutor: boolean= false;
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
    private LABELIDTUTOR: string = 'idTutor';
    private LABELNAMETUTOR: string = 'name';
    private LABELSURNAMETUTOR: string = 'surname';
    private LABELTEACHERID: string = 'id';
    private LABELTEACHERNAME: string = 'name';
    private LABELTEACHERSURNAME: string = 'surname';
    private LABELIDSCHOOL: string = 'idSchool';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';
    private LABELTEACHERIDSCHOOL: string = 'idSchool';
    
    private groupService: GroupService;
    private teacherService: TeacherService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor GroupComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.groupService = new GroupService(this.http);
        this.teacherService = new TeacherService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectGroup();
        this.selectSchools();
        this.selectTeachers();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.groupsArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.groupsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
    
    public async selectGroup() {
      this.commonFunction.write('selectGroup', '');        
      this.groupService.getGroupsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectGroupOK();
        this.commonFunction.write('getGroups', 'ok');
      }, response => {
        this.selectGroupKO();
        this.commonFunction.write('getGroups', 'ko');
      });
    }

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

    public updateGroup(index: number) {
      this.commonFunction.write('updateGroup', 'index:' + index.toString() + ', id: '
      + this.groupsArray[index][this.LABELID].toString() + ', login: ' 
      + this.groupsArray[index][this.LABELNAME].toString() + ', idSchool: ' 
      + this.groupsArray[index][this.LABELIDSCHOOL].toString() + ', idTutor: ' 
      + this.groupsArray[index][this.LABELIDTUTOR].toString() );
      this.groupService.updateGroupService(this.id, this.name, this.idSchool, this.idTutor).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateGroupOK(index);
      }, response => {
        this.updateGroupKO();
      });
    }

    public deleteGroup(index: number) {
      this.commonFunction.write('deleteGroup', index.toString() + ' with id: ' + this.groupsArray[index][this.LABELID]);
      this.groupService.deleteGroupService(this.groupsArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteGroupOK(index);
      }, response => {
        this.deleteGroupKO();
      });
    }

    public insertGroup(group: Group) {
      const index: number = group.id;
      this.commonFunction.write('insertGroup', 'index:' + index.toString() 
      + this.groupsArray[index][this.LABELNAME].toString()
      + this.groupsArray[index][this.LABELIDSCHOOL].toString()
      + this.groupsArray[index][this.LABELIDTUTOR].toString());
      this.groupService.insertGroupService(this.name, this.idSchool, this.idTutor).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertGroup', 'Register created with id: ' + response.newId);
        this.groupsArray[index][this.LABELID] = response.newId;
        this.insertGroupOK(this.groupsArray[index][this.LABELID]);
      }, response => {
        this.selectGroupKO();
      });
    }  

    public async selectTeachers() {
      this.commonFunction.write('selectTeachers', '');        
      this.teacherService.getTeachersService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectTeacherOK();
        this.commonFunction.write('selectTeachers', 'ok');
      }, response => {
        this.selectTeacherKO();
        this.commonFunction.write('selectTeachers', 'ko');
      });
    }    

    public async selectTeachersBySchool() {
      this.commonFunction.write('selectTeachers', '');        
      this.teacherService.getTeacherBySchoolService(this.idSchool).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectTeacherOK();
        this.commonFunction.write('selectTeachersBySchool', 'ok');
      }, response => {
        this.selectTeacherKO();
        this.commonFunction.write('selectTeachersBySchool', 'ko');
      });
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
      this.syncGroups('save');      
    }

    private selectTeacherOK() {
      this.commonFunction.write('selectTeacherOK', '');
      this.teachersArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.teachersArray.push(new CTeacher(this.responseGET[i][this.LABELTEACHERID], 
                                             this.responseGET[i][this.LABELTEACHERSURNAME] + ', ' + this.responseGET[i][this.LABELTEACHERNAME], 
                                             this.responseGET[i][this.LABELTEACHERSURNAME],
                                             this.responseGET[i][this.LABELTEACHERIDSCHOOL]))
      }   
      this.syncGroups('save');      
    }

    private selectGroupOK() {
      this.commonFunction.write('selectGroupOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.groupsArray.push({'id': this.responseGET[i][this.LABELID],
                               'name': this.responseGET[i][this.LABELNAME],
                               'idSchool': this.responseGET[i][this.LABELIDSCHOOL],
                               'idTutor': this.responseGET[i][this.LABELIDTUTOR]});
      }            
      this.syncGroups('save');
      this.firstLoad();
    }

    public async searchNameTutor(idTutor: number) {
      this.commonFunction.write('searchNameTutorOK', '');        
      this.teacherService.getTeacherByIdService(idTutor).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNameTutorOK();
        this.commonFunction.write('searchNameTutor', 'ok');
      }, response => {
        this.searchNameTutorKO();
        this.commonFunction.write('searchNameTutor', 'ko');
      });
    }

    public reloadTeachers(){
      this.commonFunction.write('reloadTeachers', '');
      (this.selectingSchool === true) ? this.idSchool = this.schoolSelected.getId() : null;
      this.selectTeachersBySchool();
      this.selectingTutor= true;
    }

    private searchNameTutorOK() {
      this.commonFunction.write('searchNameTutorOK', '');
      this.nameTutor= this.responseGET[0][this.LABELSURNAMETUTOR] + ', ' + this.responseGET[0][this.LABELNAMETUTOR];
    }

    private searchNameTutorKO() {
      this.commonFunction.write('searchNameTutorKO', '');
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

    private updateGroupOK(index: number) {
      this.commonFunction.write('updateGroupOK', index.toString());
      this.setUpdating(false);
      this.syncGroups('save');
    }

    private deleteGroupOK(index: number) {
      this.commonFunction.write('deleteGroupOK', 'Group deleted from DB, deleting from array now..');
      this.groupsArray.splice(index, 1);
      this.syncGroups('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertGroupOK(index: number) {
      this.commonFunction.write('insertGroupOK', index.toString());
      this.syncGroups('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectTeacherKO() {
      this.commonFunction.write('selectTeacherKO', '');
    }

    private selectGroupKO() {
      this.commonFunction.write('selectGroupKO', '');
    }

    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }

    private updateGroupKO() {
      this.commonFunction.write('updateGroupKO', 'Error updating group in DB');
      this.setUpdating(false);
    }

    private deleteGroupKO() {
      this.commonFunction.write('deleteGroupKO', 'Error deleting group from DB');
    }

    private insertGroupKO() {
      this.commonFunction.write('insertGroupKO', 'Error inserting group in DB');
    }    

    /* LOADS */

    private loadGroups() {
      this.commonFunction.write('loadGroups', '');
      this.selectGroup();
    }


    private loadArrayGroups() {
      this.commonFunction.write('loadArrayGroups', '');
      /* TODO
      for (var i= 0; i<groupModule.groupsArray.length; i++) {
        this.groupsArray.push(groupModule.groupsArray[i]);
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
      this.idTutor = 0;
      this.nameTutor = '';
      this.tutorSelected= null;
      this.selectingTutor= false;
      this.idSchool = 0;
      this.nameSchool = '';
      this.schoolSelected= null;
      this.selectingSchool= false;
    }    

    protected resetExtra(){      
      this.selectingTutor= false;
      this.tutorSelected= null;
      this.schoolSelected= null;
      this.selectingSchool= false;      
    }

    protected resetArray(){
      this.selectTeachers();
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
      this.commonFunction.write('logData', 'idTutor: ' + this.idTutor);
      this.commonFunction.write('logData', 'nameTutor: ' + this.nameTutor);
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
      this.commonFunction.write('getNumEntity', this.groupsArray.length.toString());
      return this.groupsArray.length;
    }

    
    /* FUNCTIONALITIES */

    public addNewGroup() {
      this.commonFunction.write('addNewGroup', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncGroups(option: string) {
      this.commonFunction.write('syncGroups', option);
      if (option === 'save') {
        // TODO
        // groupModule.setgroupsArray(this.groupsArray);
      } else if (option === 'load') {
        this.loadArrayGroups();
        this.maxId = this.groupsArray.length;
      }
      this.commonFunction.write('syncGroups', option + ' finished');
    }

    public addGroup() {
      this.commonFunction.write('addGroup', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addGroup', 'validateGroup === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addGroup', 'isUpdating === true');
          this.groupsArray[this.index][this.LABELID] = this.id;
          this.groupsArray[this.index][this.LABELNAME] = this.name;
          this.isSelectingTutor()=== true ? 
            this.idTutor = this.tutorSelected.getId() : null;
          this.groupsArray[this.index][this.LABELIDTUTOR] = this.idTutor;                    
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          this.groupsArray[this.index][this.LABELIDSCHOOL] = this.idSchool;
          this.updateGroup(this.index);
        } else {
          this.commonFunction.write('addGroup', 'isUpdating === false');
          this.maxId++;
          this.idTutor = this.tutorSelected.getId();    
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          const group: Group = { id: this.groupsArray.length, name: this.name, idSchool: this.idSchool, idTutor: this.idTutor};
          this.groupsArray.push(group);
          this.insertGroup(group);
        }
        this.resetForm();
        this.activateMode('list');
      }
    }

    public selectTutor(){
       (this.isSelectingTutor() === true) ? this.selectingTutor = false: this.selectingTutor = true;
       this.reloadTeachers();
    }

    public isSelectingTutor(){
      return this.selectingTutor;
    }

    public selectSchool(){
       (this.isSelectingSchool() === true) ? this.selectingSchool = false: this.selectingSchool = true;
    }

    public isSelectingSchool(){
      return this.selectingSchool;
    }

    public modifyGroup(index: number) {
      this.commonFunction.write('modifyGroup', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.groupsArray[index][this.LABELID];
      this.name = this.groupsArray[index][this.LABELNAME];
      this.idTutor = this.groupsArray[index][this.LABELIDTUTOR];
      this.idSchool= this.groupsArray[index][this.LABELIDSCHOOL];
      this.searchNameTutor(this.idTutor);
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
 