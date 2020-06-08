import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Parent from '../../types/parent.type';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { ParentService } from '../../services/parent.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-parent',
    templateUrl: './parent.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class ParentComponent extends BaseComponent {
    
    parentsArray: Parent[] = [];
    schoolsArray: CSchool[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public dni:string = '';
    public name:string = '';
    public surname:string = '';    
    public type: number= 0;
    public nameType:string = '';
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;
      
    public typeSelected: number= 0;
    public selectingType: boolean= false;
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
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELTYPE: string = 'type';    
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';

    private parentService: ParentService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor ParentComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.parentService = new ParentService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectParent();
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
      if(this.parentsArray[position][field]!=null){
        switch(field) {
          case this.LABELDNI:
            return (this.parentsArray[position][field].toUpperCase().search(this.inputSearchDni.toUpperCase()) > -1);
            break;
            case this.LABELNAME:
              return (this.parentsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
              break;
              case this.LABELSURNAME:
                return (this.parentsArray[position][field].toUpperCase().search(this.inputSearchSurname.toUpperCase()) > -1);
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
    
    private async selectParent() {
      this.commonFunction.write('selectParent', '');        
      this.parentService.getParentsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectParentOK();
        this.commonFunction.write('getParents', 'ok');
      }, response => {
        this.selectParentKO();
        this.commonFunction.write('getParents', 'ko');
      });
    }

    private updateParent(index: number) {
      this.commonFunction.write('updateParent', 'index:' + index.toString() + ', id: '
      + this.parentsArray[index][this.LABELID].toString() + ', dni: '
      + this.parentsArray[index][this.LABELDNI].toString() + ', name: '
      + this.parentsArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.parentsArray[index][this.LABELSURNAME].toString() + ', type: '  
      + this.parentsArray[index][this.LABELTYPE].toString() + ', idSchool: ' 
      + this.parentsArray[index][this.LABELIDSCHOOL].toString());
      this.parentService.updateParentService(this.id, this.dni, this.name, this.surname, this.type,  this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateParentOK(index);
      }, response => {
        this.updateParentKO();
      });
    }

    public deleteParent(index: number) {
      this.commonFunction.write('deleteParent', index.toString() + ' with id: ' + this.parentsArray[index][this.LABELID]);
      this.parentService.deleteParentService(this.parentsArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteParentOK(index);
      }, response => {
        this.deleteParentKO();
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
      this.syncParents('save');      
    }

    private insertParent(parent: Parent) {
      const index: number = parent.id;
      this.commonFunction.write('insertParent', 'index:' + index.toString() + ', dni: '
      + this.parentsArray[index][this.LABELDNI].toString() + ', name: '
      + this.parentsArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.parentsArray[index][this.LABELSURNAME].toString() + ', type: '  
      + this.parentsArray[index][this.LABELTYPE].toString() + ', idSchool'
      + this.parentsArray[index][this.LABELIDSCHOOL].toString()
      );
      this.parentService.insertParentService(this.dni, this.name, this.surname, this.type, this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertParent', 'Register created with id: ' + response.newId);
        this.parentsArray[index][this.LABELID] = response.newId;
        this.insertParentOK(this.parentsArray[index][this.LABELID]);
      }, response => {
        this.selectParentKO();
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

    private selectParentOK() {
      this.commonFunction.write('selectParentOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.parentsArray.push({'id': this.responseGET[i][this.LABELID],
                                'dni': this.responseGET[i][this.LABELDNI],
                                'name': this.responseGET[i][this.LABELNAME],
                                'surname': this.responseGET[i][this.LABELSURNAME],
                                'type': this.responseGET[i][this.LABELTYPE],
                                'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncParents('save');
      this.firstLoad();
    }

    private updateParentOK(index: number) {
      this.commonFunction.write('updateParentOK', index.toString());
      this.setUpdating(false);
      this.syncParents('save');
    }

    private deleteParentOK(index: number) {
      this.commonFunction.write('deleteParentOK', 'Parent deleted from DB, deleting from array now..');
      this.parentsArray.splice(index, 1);
      this.syncParents('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertParentOK(index: number) {
      this.commonFunction.write('insertParentOK', index.toString());
      this.syncParents('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectParentKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateParentKO() {
      this.commonFunction.write('updateParentKO', 'Error updating parent in DB');
      this.setUpdating(false);
    }

    private deleteParentKO() {
      this.commonFunction.write('deleteParentKO', 'Error deleting parent from DB');
    }

    private insertParentKO() {
      this.commonFunction.write('insertParentKO', 'Error inserting parent in DB');
    }

    /* LOADS */

    private loadParents() {
      this.commonFunction.write('loadParents', '');
      this.selectParent();
    }


    private loadArrayParents() {
      this.commonFunction.write('loadArrayParents', '');
      /* TODO
      for (var i= 0; i<parentModule.parentsArray.length; i++) {
        this.parentsArray.push(parentModule.parentsArray[i]);
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
      this.type= 0;
      this.idSchool = 0;
      this.nameType= '';
      this.typeSelected= null;
      this.selectingType= false;
      this.schoolSelected= null;
      this.selectingSchool= false;
    }    

    protected resetExtra(){      
      this.selectingType= false;
      this.typeSelected= null;
    }

    protected resetEmptyErrors() {
      //this.loginEmptyError = false;
    }

    protected resetNotCharErrors() {
      //this.loginNotCharError = false;
    }

    public selectType(){
       (this.isSelectingType() === true) ? this.selectingType = false: this.selectingType = true;
    }

    public isSelectingType(){
      return this.selectingType;
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
      this.commonFunction.write('logData', 'type: ' + this.type);
      this.commonFunction.write('logData', 'nameType: ' + this.nameType);
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
      this.commonFunction.write('getNumEntity', this.parentsArray.length.toString());
      return this.parentsArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewParent() {
      this.commonFunction.write('addNewParent', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncParents(option: string) {
      this.commonFunction.write('syncParents', option);
      if (option === 'save') {
        // TODO
        // parentModule.setparentsArray(this.parentsArray);
      } else if (option === 'load') {
        this.loadArrayParents();
        this.maxId = this.parentsArray.length;
      }
      this.commonFunction.write('syncParents', option + ' finished');
    }

    public addParent() {
      this.commonFunction.write('addParent', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addParent', 'validateParent === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addParent', 'isUpdating === true');
          this.parentsArray[this.index][this.LABELID] = this.id;
          this.parentsArray[this.index][this.LABELDNI] = this.dni;
          this.parentsArray[this.index][this.LABELNAME] = this.name;
          this.parentsArray[this.index][this.LABELSURNAME] = this.surname;
          
          this.isSelectingType()=== true ? 
            this.type = this.typeSelected : null;
          this.parentsArray[this.index][this.LABELTYPE] = this.type;      
          
          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.parentsArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          

          this.updateParent(this.index);
        } else {
          this.commonFunction.write('addParent', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          this.type = this.typeSelected;          
          const parent: Parent = { id: this.parentsArray.length,
            dni: this.dni, name: this.name, surname: this.surname, type: this.type, idSchool: this.idSchool};
          this.parentsArray.push(parent);
          this.insertParent(parent);
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


    public modifyParent(index: number) {
      this.commonFunction.write('modifyParent', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.parentsArray[index][this.LABELID];
      this.dni = this.parentsArray[index][this.LABELDNI];
      this.name = this.parentsArray[index][this.LABELNAME];
      this.surname = this.parentsArray[index][this.LABELSURNAME];
      this.type = this.parentsArray[index][this.LABELTYPE];                  
      this.idSchool= this.parentsArray[index][this.LABELIDSCHOOL];      
      this.nameType =this.searchNameType(this.type);
      this.searchNameSchool(this.idSchool);
      this.logData();
      this.activateMode('form');
      this.resetErrors();
    }    

    private searchNameType(idType: number) {
      this.commonFunction.write('searchNameType', idType.toString());
      switch(idType.toString())
      {
        case '1':
          return 'Father';
          break;          
        case '2':
          return 'Mother';
          break;
        case '3':
          return 'Tutor';
          break;
        default:                   
          break;
      }      
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