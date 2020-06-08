import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Psychologist from '../../types/psychologist.type'; 
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { PsychologistService } from '../../services/psychologist.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';


@Component({
    selector: 'app-psychologist',
    templateUrl: './psychologist.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class PsychologistComponent extends BaseComponent {
    
    psychologistsArray: Psychologist[] = [];
    schoolsArray: CSchool[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public dni:string = '';
    public name:string = '';
    public surname:string = '';    
    public idSchool:number = 0;    
    public nameSchool:string = '';

    public schoolSelected: CSchool;
    public selectingSchool: boolean= false;
      
    // CLASSES
    public labelClassDni: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassSurname: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';     
    
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
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';

    private psychologistService: PsychologistService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor PsychologistComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.psychologistService = new PsychologistService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectPsychologist();
        this.selectSchools();
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

    private selectSchoolsOK() {
      this.commonFunction.write('selectSchoolsOK', '');
      this.schoolsArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.schoolsArray.push(new CSchool(this.responseGET[i][this.LABELSCHOOLID], 
                                           this.responseGET[i][this.LABELSCHOOLNAME] + ' (' + this.responseGET[i][this.LABELSCHOOLKINDERGARTENNAME] + ')',
                                           this.responseGET[i][this.LABELSCHOOLKINDERGARTENNAME], 
                                           ''))
      }   
      this.syncPsychologists('save');      
    }    

    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
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
      if(this.psychologistsArray[position][field]!=null){
        switch(field) {
          case this.LABELDNI:
            return (this.psychologistsArray[position][field].toUpperCase().search(this.inputSearchDni.toUpperCase()) > -1);
            break;
            case this.LABELNAME:
              return (this.psychologistsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
              break;
              case this.LABELSURNAME:
                return (this.psychologistsArray[position][field].toUpperCase().search(this.inputSearchSurname.toUpperCase()) > -1);
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
    
    private async selectPsychologist() {
      this.commonFunction.write('selectPsychologist', '');        
      console.log(this.commonFunction.getStorage('userLogged')['idSchool'].toString());
      this.psychologistService.getPsychologistsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectPsychologistOK();
        this.commonFunction.write('getPsychologists', 'ok');
      }, response => {
        this.selectPsychologistKO();
        this.commonFunction.write('getPsychologists', 'ko');
      });
    }

    private updatePsychologist(index: number) {
      this.commonFunction.write('updatePsychologist', 'index:' + index.toString() + ', id: '
      + this.psychologistsArray[index][this.LABELID].toString() + ', dni: '
      + this.psychologistsArray[index][this.LABELDNI].toString() + ', name: '
      + this.psychologistsArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.psychologistsArray[index][this.LABELSURNAME].toString() + ', idSchool: '
      + this.psychologistsArray[index][this.LABELIDSCHOOL].toString());
      this.psychologistService.updatePsychologistService(this.id, this.dni, this.name, this.surname, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updatePsychologistOK(index);
      }, response => {
        this.updatePsychologistKO();
      });
    }

    public deletePsychologist(index: number) {
      this.commonFunction.write('deletePsychologist', index.toString() + ' with id: ' + this.psychologistsArray[index][this.LABELID]);
      this.psychologistService.deletePsychologistService(this.psychologistsArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deletePsychologistOK(index);
      }, response => {
        this.deletePsychologistKO();
      });
    }

    private insertPsychologist(psychologist: Psychologist) {
      const index: number = psychologist.id;
      this.commonFunction.write('insertPsychologist', 'index:' + index.toString() + ', dni: '
      + this.psychologistsArray[index][this.LABELDNI].toString() + ', name: '
      + this.psychologistsArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.psychologistsArray[index][this.LABELSURNAME].toString() + ', idSchool: '
      + this.psychologistsArray[index][this.LABELIDSCHOOL].toString());
      this.logData();
      this.psychologistService.insertPsychologistService(this.dni, this.name, this.surname, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertPsychologist', 'Register created with id: ' + response.newId);
        this.psychologistsArray[index][this.LABELID] = response.newId;
        this.insertPsychologistOK(this.psychologistsArray[index][this.LABELID]);
      }, response => {
        this.selectPsychologistKO();
      });
    }  


    /* HTTPGET REPONSE OK */

    private selectPsychologistOK() {
      this.commonFunction.write('selectPsychologistOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.psychologistsArray.push({'id': this.responseGET[i][this.LABELID],
                                'dni': this.responseGET[i][this.LABELDNI],
                                'name': this.responseGET[i][this.LABELNAME],
                                'surname': this.responseGET[i][this.LABELSURNAME],
                                'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncPsychologists('save');
      this.firstLoad();
    }

    private updatePsychologistOK(index: number) {
      this.commonFunction.write('updatePsychologistOK', index.toString());
      this.setUpdating(false);
      this.syncPsychologists('save');
    }

    private deletePsychologistOK(index: number) {
      this.commonFunction.write('deletePsychologistOK', 'Psychologist deleted from DB, deleting from array now..');
      this.psychologistsArray.splice(index, 1);
      this.syncPsychologists('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertPsychologistOK(index: number) {
      this.commonFunction.write('insertPsychologistOK', index.toString());
      this.syncPsychologists('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectPsychologistKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updatePsychologistKO() {
      this.commonFunction.write('updatePsychologistKO', 'Error updating psychologist in DB');
      this.setUpdating(false);
    }

    private deletePsychologistKO() {
      this.commonFunction.write('deletePsychologistKO', 'Error deleting psychologist from DB');
    }

    private insertPsychologistKO() {
      this.commonFunction.write('insertPsychologistKO', 'Error inserting psychologist in DB');
    }

    /* LOADS */

    private loadPsychologists() {
      this.commonFunction.write('loadPsychologists', '');
      this.selectPsychologist();
    }


    private loadArrayPsychologists() {
      this.commonFunction.write('loadArrayPsychologists', '');
      /* TODO
      for (var i= 0; i<psychologistModule.psychologistsArray.length; i++) {
        this.psychologistsArray.push(psychologistModule.psychologistsArray[i]);
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
      this.commonFunction.write('getNumEntity', this.psychologistsArray.length.toString());
      return this.psychologistsArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewPsychologist() {
      this.commonFunction.write('addNewPsychologist', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncPsychologists(option: string) {
      this.commonFunction.write('syncPsychologists', option);
      if (option === 'save') {
        // TODO
        // psychologistModule.setpsychologistsArray(this.psychologistsArray);
      } else if (option === 'load') {
        this.loadArrayPsychologists();
        this.maxId = this.psychologistsArray.length;
      }
      this.commonFunction.write('syncPsychologists', option + ' finished');
    }

    public addPsychologist() {
      this.commonFunction.write('addPsychologist', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addPsychologist', 'validatePsychologist === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addPsychologist', 'isUpdating === true');
          this.psychologistsArray[this.index][this.LABELID] = this.id;
          this.psychologistsArray[this.index][this.LABELDNI] = this.dni;
          this.psychologistsArray[this.index][this.LABELNAME] = this.name;
          this.psychologistsArray[this.index][this.LABELSURNAME] = this.surname;
          //this.psychologistsArray[this.index][this.LABELIDSCHOOL] = this.idSchool;
          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.updatePsychologist(this.index);
        } else {
          this.commonFunction.write('addPsychologist', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          const psychologist: Psychologist = { id: this.psychologistsArray.length,
            dni: this.dni, name: this.name, surname: this.surname, idSchool: this.idSchool};
          this.psychologistsArray.push(psychologist);
          this.insertPsychologist(psychologist);
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

    public modifyPsychologist(index: number) {
      this.commonFunction.write('modifyPsychologist', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.psychologistsArray[index][this.LABELID];
      this.dni = this.psychologistsArray[index][this.LABELDNI];
      this.name = this.psychologistsArray[index][this.LABELNAME];
      this.surname = this.psychologistsArray[index][this.LABELSURNAME];
      this.idSchool = this.psychologistsArray[index][this.LABELIDSCHOOL];      
      this.searchNameSchool(this.idSchool);
      this.logData();
      this.activateMode('form');
      this.resetErrors();
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