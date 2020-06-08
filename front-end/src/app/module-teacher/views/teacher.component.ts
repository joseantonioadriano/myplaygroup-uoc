import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Teacher from '../../types/teacher.type';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { TeacherService } from '../../services/teacher.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-teacher',
    templateUrl: './teacher.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class TeacherComponent extends BaseComponent {
    
    teachersArray: Teacher[] = [];
    schoolsArray: CSchool[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public dni:string = '';
    public name:string = '';
    public surname:string = '';    
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;
      
    // CLASSES
    public labelClassDni: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassSurname: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';     
    
    public selectingSchool: boolean= false;

    // BOOLEANS FOR ERROR CONTROLS    
    // DNI
    public dniEmptyError: boolean = false;
    public dniCorrect: boolean = false;
    public dniNotCharError: boolean = false;
    // NAME
    public nameEmptyError: boolean = false;
    public nameCorrect: boolean = false;
    public nameNotCharError: boolean = false;
    // SURNAME
    public surnameEmptyError: boolean = false;
    public surnameCorrect: boolean = false;
    public surnameNotCharError: boolean = false;
      
    // MESSAGE    
    public errorMSGLogin: string = 'Please introduce a value';
    public errorMSGDni: string = 'Please introduce a dni';
    public errorMSGName: string = 'Please introduce a name';
    public errorMSGSurname: string = 'Please introduce a surname';    
      
    // SEARCHS
    public inputSearchLogin: string = '';
    public inputSearchDni: string = '';
    public inputSearchName: string = '';
    public inputSearchSurname: string = '';    
    
    // LABELS
    private LABELID: string = 'id';    
    private LABELDNI: string = 'dni';
    private LABELNAME: string = 'name';
    private LABELSURNAME: string = 'surname';    
    private LABELIDSCHOOL: string = 'idSchool';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';

    private teacherService: TeacherService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor TeacherComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.teacherService = new TeacherService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectTeacher();
        this.selectSchools();
    }    

   

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELDNI, i) && 
              this.showLineFilter(this.LABELNAME, i) && 
              this.showLineFilter(this.LABELSURNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.teachersArray[position][field]!=null){
        switch(field) {
          case this.LABELDNI:
            return (this.teachersArray[position][field].toUpperCase().search(this.inputSearchDni.toUpperCase()) > -1);
            break;
            case this.LABELNAME:
              return (this.teachersArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
              break;
              case this.LABELSURNAME:
                return (this.teachersArray[position][field].toUpperCase().search(this.inputSearchSurname.toUpperCase()) > -1);
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
      this.commonFunction.write('filterList', 'this.inputSearchLogin:' + this.inputSearchLogin);
      this.commonFunction.write('filterList', 'this.inputSearchDni:' + this.inputSearchDni);
      this.commonFunction.write('filterList', 'this.inputSearchName:' + this.inputSearchName);
      this.commonFunction.write('filterList', 'this.inputSearchSurname:' + this.inputSearchSurname);
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

    private async selectTeacher() {
      this.commonFunction.write('selectTeacher', '');        
      this.teacherService.getTeachersService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectTeacherOK();
        this.commonFunction.write('getTeachers', 'ok');
      }, response => {
        this.selectTeacherKO();
        this.commonFunction.write('getTeachers', 'ko');
      });
    }

    private updateTeacher(index: number) {
      this.commonFunction.write('updateTeacher', 'index:' + index.toString() + ', id: '
      + this.teachersArray[index][this.LABELID].toString() + ', dni: '
      + this.teachersArray[index][this.LABELDNI].toString() + ', name: '
      + this.teachersArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.teachersArray[index][this.LABELSURNAME].toString() + ', idSchool: ' 
      + this.teachersArray[index][this.LABELIDSCHOOL].toString());
      this.teacherService.updateTeacherService(this.id, this.dni, this.name, this.surname, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateTeacherOK(index);
      }, response => {
        this.updateTeacherKO();
      });
    }

    public deleteTeacher(index: number) {
      this.commonFunction.write('deleteTeacher', index.toString() + ' with id: ' + this.teachersArray[index][this.LABELID]);
      this.teacherService.deleteTeacherService(this.teachersArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteTeacherOK(index);
      }, response => {
        this.deleteTeacherKO();
      });
    }

    private insertTeacher(teacher: Teacher) {
      const index: number = teacher.id;
      this.commonFunction.write('insertTeacher', 'index:' + index.toString() + ', dni: '
      + this.teachersArray[index][this.LABELDNI].toString() + ', name: '
      + this.teachersArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.teachersArray[index][this.LABELSURNAME].toString() + ', idSchool'
      + this.teachersArray[index][this.LABELIDSCHOOL].toString());
      this.teacherService.insertTeacherService(this.dni, this.name, this.surname, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertTeacher', 'Register created with id: ' + response.newId);
        this.teachersArray[index][this.LABELID] = response.newId;
        this.insertTeacherOK(this.teachersArray[index][this.LABELID]);
      }, response => {
        this.selectTeacherKO();
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

    
    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }

    /* HTTPGET REPONSE OK */

    private selectTeacherOK() {
      this.commonFunction.write('selectTeacherOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.teachersArray.push({'id': this.responseGET[i][this.LABELID],
                                'dni': this.responseGET[i][this.LABELDNI],
                                'name': this.responseGET[i][this.LABELNAME],
                                'surname': this.responseGET[i][this.LABELSURNAME],
                                'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncTeachers('save');
      this.firstLoad();
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
      this.syncTeachers('save');      
    }

    private updateTeacherOK(index: number) {
      this.commonFunction.write('updateTeacherOK', index.toString());
      this.setUpdating(false);
      this.syncTeachers('save');
    }

    private deleteTeacherOK(index: number) {
      this.commonFunction.write('deleteTeacherOK', 'Teacher deleted from DB, deleting from array now..');
      this.teachersArray.splice(index, 1);
      this.syncTeachers('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertTeacherOK(index: number) {
      this.commonFunction.write('insertTeacherOK', index.toString());
      this.syncTeachers('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectTeacherKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateTeacherKO() {
      this.commonFunction.write('updateTeacherKO', 'Error updating teacher in DB');
      this.setUpdating(false);
    }

    private deleteTeacherKO() {
      this.commonFunction.write('deleteTeacherKO', 'Error deleting teacher from DB');
    }

    private insertTeacherKO() {
      this.commonFunction.write('insertTeacherKO', 'Error inserting teacher in DB');
    }

    /* LOADS */

    private loadTeachers() {
      this.commonFunction.write('loadTeachers', '');
      this.selectTeacher();
    }


    private loadArrayTeachers() {
      this.commonFunction.write('loadArrayTeachers', '');
      /* TODO
      for (var i= 0; i<teacherModule.teachersArray.length; i++) {
        this.teachersArray.push(teacherModule.teachersArray[i]);
      }
      */
    }

    protected loadFieldsValidate() {
      this.commonFunction.write('loadFieldsValidate', '');
      this.loadFieldValidate(this.LABELDNI);
    }   

    /* RESETS */    

    protected resetFormFields(){
      this.commonFunction.write('resetFormFields', '');
      this.id = 0;
      this.dni = '';
      this.name = '';
      this.surname = '';
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
      //this.loginEmptyError = false;
    }

    protected resetNotCharErrors() {
      //this.loginNotCharError = false;
    }

    /* UTILITIES */

    protected logData() {
      this.commonFunction.write('logData', '');
      this.commonFunction.write('logData', 'id: ' + this.id);
      this.commonFunction.write('logData', 'index: ' + this.index);
      this.commonFunction.write('logData', 'dni: ' + this.dni);
      this.commonFunction.write('logData', 'name: ' + this.name);
      this.commonFunction.write('logData', 'surname: ' + this.surname);
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
        case this.LABELSURNAME:
          this.validateFieldEmpty(field);
          this.validateFieldChars(field);
          break;
        case this.LABELDNI:
          this.validateFieldChars(field);
          break;
        default:
          break;
      }
    }

    protected validateFieldEmpty(field: string) {
      this.commonFunction.write('validateFieldEmpty', field);
      switch (field) {
        case this.LABELDNI:
          if (this.validationEmpty(this.dni ? this.dni : '')) {
            this.errorEnrity(false);
            this.setFieldEmpty(this.LABELDNI, false);
          } else {
            this.deleteFieldEspaces(this.LABELDNI);
            this.setFieldEmpty(this.LABELDNI, true);
          }
          break;
          case this.LABELNAME:
            if (this.validationEmpty(this.name ? this.name : '')) {
              this.errorEnrity(false);
              this.setFieldEmpty(this.LABELNAME, false);
            } else {
              this.deleteFieldEspaces(this.LABELNAME);
              this.setFieldEmpty(this.LABELNAME, true);
            }
            break;
            case this.LABELSURNAME:
              if (this.validationEmpty(this.surname ? this.surname : '')) {
                this.errorEnrity(false);
                this.setFieldEmpty(this.LABELSURNAME, false);
              } else {
                this.deleteFieldEspaces(this.LABELSURNAME);
                this.setFieldEmpty(this.LABELSURNAME, true);
              }
              break;
        default:
          break;
      }
    }

    protected validateFieldChars(field: string) {
      this.commonFunction.write('validateFieldChars', field);
      switch(field) {
        case this.LABELDNI:
          if (!this.commonFunction.validationChars(this.dni ? this.dni : '')) {
            this.errorEnrity(true);
            this.setFieldChar(this.LABELDNI, false);
          } else {
              this.setFieldChar(this.LABELDNI, true);
          }
          break;
          case this.LABELNAME:
            if (!this.commonFunction.validationChars(this.name ? this.name : '')) {
              this.errorEnrity(true);
              this.setFieldChar(this.LABELNAME, false);
            } else {
                this.setFieldChar(this.LABELNAME, true);
            }
            break;
            case this.LABELSURNAME:
              if (!this.commonFunction.validationChars(this.surname ? this.surname : '')) {
                this.errorEnrity(true);
                this.setFieldChar(this.LABELSURNAME, false);
              } else {
                  this.setFieldChar(this.LABELSURNAME, true);
              }
              break;
        default:
          break;
      }
    }

    protected deleteFieldEspaces(field: string) {
      this.commonFunction.write('deleteFieldEspaces', field);
      switch (field) {
        case this.LABELDNI:
          if (this.dni !== undefined) {
            this.dni = this.dni.trim();
            this.dni = this.dni.replace(/ +/g, ' ');
          }
          break;
          case this.LABELNAME:
            if (this.name !== undefined) {
              this.name = this.name.trim();
              this.name = this.name.replace(/ +/g, ' ');
            }
            break;
          case this.LABELSURNAME:
            if (this.surname !== undefined) {
              this.surname = this.surname.trim();
              this.surname = this.surname.replace(/ +/g, ' ');
            }
            break;
        default:
          break;
      }
    }

    protected deleteEspaces() {
      this.commonFunction.write('deleteAllEspaces', '');
      this.deleteFieldEspaces(this.LABELDNI);
    }
       
    protected getNumEntity() {
      this.commonFunction.write('getNumEntity', this.teachersArray.length.toString());
      return this.teachersArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewTeacher() {
      this.commonFunction.write('addNewTeacher', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncTeachers(option: string) {
      this.commonFunction.write('syncTeachers', option);
      if (option === 'save') {
        // TODO
        // teacherModule.setteachersArray(this.teachersArray);
      } else if (option === 'load') {
        this.loadArrayTeachers();
        this.maxId = this.teachersArray.length;
      }
      this.commonFunction.write('syncTeachers', option + ' finished');
    }

    public addTeacher() {
      this.commonFunction.write('addTeacher', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addTeacher', 'validateTeacher === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addTeacher', 'isUpdating === true');
          this.teachersArray[this.index][this.LABELID] = this.id;
          this.teachersArray[this.index][this.LABELDNI] = this.dni;
          this.teachersArray[this.index][this.LABELNAME] = this.name;
          this.teachersArray[this.index][this.LABELSURNAME] = this.surname;
          
          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.teachersArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          
          
          this.updateTeacher(this.index);
        } else {
          this.commonFunction.write('addTeacher', 'isUpdating === false');
          this.maxId++;         
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          const teacher: Teacher = { id: this.teachersArray.length,
            dni: this.dni, name: this.name, surname: this.surname, idSchool: this.idSchool};
          this.teachersArray.push(teacher);
          this.insertTeacher(teacher);
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

    public modifyTeacher(index: number) {
      this.commonFunction.write('modifyTeacher', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.teachersArray[index][this.LABELID];
      this.dni = this.teachersArray[index][this.LABELDNI];
      this.name = this.teachersArray[index][this.LABELNAME];
      this.surname = this.teachersArray[index][this.LABELSURNAME];
      this.idSchool= this.teachersArray[index][this.LABELIDSCHOOL];
      this.searchNameSchool(this.idSchool);
      this.logData();
      this.activateMode('form');
      this.resetErrors();
    }    

    /* SET BOOLEANS VALIDATIONS */

    private setFieldChar(field: string, valide: boolean) {
    this.commonFunction.write('setFieldChar', field + ' ' + valide.toString());
    switch (field) {
      case this.LABELDNI:
      if (valide === false) {
        this.dniCorrect = false;
        this.dniNotCharError = true;
      } else {
        this.dniCorrect = true;
        this.dniNotCharError = false;
      }
      break;
      case this.LABELNAME:
      if (valide === false) {
        this.nameCorrect = false;
        this.nameNotCharError = true;
      } else {
        this.nameCorrect = true;
        this.nameNotCharError = false;
      }
      break;
      case this.LABELSURNAME:
      if (valide === false) {
        this.surnameCorrect = false;
        this.surnameNotCharError = true;
      } else {
        this.surnameCorrect = true;
        this.surnameNotCharError = false;
      }
      break;
      default:
      break;
    }
    }

    private setFieldEmpty(field: string, valide: boolean) {
    this.commonFunction.write('setFieldEmpty', field + ' ' + valide.toString());
    switch(field) {
      case this.LABELDNI:
      if (valide === false) {
        this.dniCorrect = false;
        this.dniEmptyError = true;
      } else {
        this.dniCorrect = true;
        this.dniEmptyError = false;
      }
      break;
      case this.LABELNAME:
      if (valide === false) {
        this.nameCorrect = false;
        this.nameEmptyError = true;
      } else {
        this.nameCorrect = true;
        this.nameEmptyError = false;
      }
      break;
      case this.LABELSURNAME:
      if (valide === false) {
        this.surnameCorrect = false;
        this.surnameEmptyError = true;
      } else {
        this.surnameCorrect = true;
        this.surnameEmptyError = false;
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
        case this.LABELDNI:
        this.labelClassDni = 'inputcomp__label--activated';
        // TODO (this.$refs.dni as HTMLElement).focus();
        this.dniCorrect = false;
        break;
        case this.LABELNAME:
        this.labelClassName = 'inputcomp__label--activated';
        // TODO (this.$refs.dni as HTMLElement).focus();
        this.nameCorrect = false;
        break;
        case this.LABELSURNAME:
        this.labelClassSurname = 'inputcomp__label--activated';
        // TODO (this.$refs.dni as HTMLElement).focus();
        this.surnameCorrect = false;
        break;
        
        default:
        break;
      }
    }

    /* ONBLUR */

    public blurLabel(field: string) {
      this.commonFunction.write('blurLabel', field);
      switch (field) {
        case this.LABELDNI:
        if (!this.dni || this.dni === '') {
          this.labelClassDni = 'inputcomp__label';
        }
        if (this.commonFunction.validationChars(this.dni ? this.dni : '') &&
          !this.validationEmpty(this.dni ? this.dni : '')) {
          this.dniCorrect = true;
        }
        this.validateField(this.LABELDNI);
        break;
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
        case this.LABELSURNAME:
        if (!this.surname || this.surname === '') {
          this.labelClassSurname = 'inputcomp__label';
        }
        if (this.commonFunction.validationChars(this.surname ? this.surname : '') &&
          !this.validationEmpty(this.surname ? this.surname : '')) {
          this.surnameCorrect = true;
        }
        this.validateField(this.LABELSURNAME);
        break;
        default:
        break;
      }
    }

  }