import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
//import iBase from './iBase.component';
import CommonFunction from '../../common/common-functions';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-user',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
  })
  export class BaseComponent implements OnInit /*,iBase*/ {        

    protected fieldsValidate: string[] = [];

    // ATTRIBUTES
    protected index: number = 0;
    protected maxId: number = 0;      

    // BOOLEANS TO SHOW
    protected boolShowAddBoutton_: boolean = false;
    protected boolShowAddNewBoutton_: boolean = false;
    protected boolUpdating_: boolean = false;    
    protected errorForm_: boolean = false;   
    protected loaded: boolean = false;
    protected errorEntity: boolean = false;
  
    private MAXROWSGRID: number = 20;

    // PAGINATION--
    protected paginationBy: number = 0;
    protected paginationFrom: number = 0;
    protected paginationTo: number = 0;
    protected paginationPageShowed: number = 1;
    protected numPages: number = 1;
    protected pageByOptions: number[] = [];

    // MESSAGE
    public errorMSGEmpty: string = 'Please introduce a value';
    public errorMSGChars: string = 'Only spacial characters - and \' are authorized in the fields';

    protected responseGET: any;
  

    private languageService: LanguageService;

    protected mode_: string = 'list';

    protected commonFunction: CommonFunction;

    constructor() {      
      this.languageService = new LanguageService();    
    }
    
    ngOnInit() {       
        this.commonFunction= new CommonFunction();        
        this.commonFunction.write('ngOnInit', '');        
        this.loadConf();
    }
    
    protected loadConf() {
        this.commonFunction.write('loadConf', '');
    }

    /* GETS */

    public getMode() {
        return this.mode_;
    }

    protected getNumEntity() { return 0; }

    protected firstLoad() {
        this.loadFieldsValidate();
        this.loadPagination();
        this.activateMode('');
    }

    protected loadFieldsValidate(){}

    protected loadFieldValidate(field: string) {
        this.fieldsValidate[this.fieldsValidate.length] = field;
    }

    /* SET STATES */

    public setUpdating(updating: boolean) {
        this.commonFunction.write('setUpdating', updating.toString());
        this.boolUpdating_ = updating;
    }
  
    protected setMode(mode: string) {
        this.commonFunction.write('setMode', mode);
        this.mode_ = mode;
      }

    /* RESETS */

    protected resetForm() {
        this.commonFunction.write('resetForm', '');
        this.resetFormFields();
        this.index = -1;
        this.errorUser(false);
        this.errorForm(false);
        this.resetExtra();
    }

    protected resetExtra(){}

    protected resetFormFields(){}

    protected resetErrors() {
        this.commonFunction.write('resetErrors', '');
        this.resetEmptyErrors();
        this.resetNotCharErrors();
        this.errorUser(false);
        this.errorForm(false);     
      }

    protected resetEmptyErrors() {}
    protected resetNotCharErrors() {}

    /* ERROR CONTROLS */

    protected errorUser(state: boolean) {}
  
    protected errorForm(state: boolean) {
        this.commonFunction.write('errorForm', state.toString());
        this.errorForm_ = state;
    }

    protected errorEnrity(state: boolean) {
        this.commonFunction.write('errorUser', state.toString());
        this.errorEntity = state;
      }
  
  
    /* UTILITIES */

    protected logData() {}

    /* RETOUR BOOLEANS */

    public isShowAddBoutton() {
    return this.boolShowAddBoutton_;
    }

    public isShowAddNewBoutton() {
    return this.boolShowAddNewBoutton_;
    }

    public isUpdating() {
    return this.boolUpdating_;
    }

    protected isEntityError() {
        return this.errorEntity;
      }

    public getLabel(label: string){    
      return this.languageService.getWord(Number(this.commonFunction.getStorage('currentLanguage')), label);
    }      

    protected isFormError() {
    return this.errorForm_;
    }

    /* VALIDATIONS */

    protected validateEntity() {
        this.commonFunction.write('validateEntity', '');
        this.errorEnrity(false);
        this.validateFields();
        return this.isEntityError();
    }

    protected validateFields() {
        this.commonFunction.write('validateFields', this.fieldsValidate.length + ' fields');
        for (var i = 0; i < this.fieldsValidate.length; i ++) {
            this.validateField(this.fieldsValidate[i]);
        }
    }

    protected validateField(field: string) {}

    protected validateFieldEmpty(field: string) {}

    protected validateFieldChars(field: string) {}

    protected deleteFieldEspaces(field: string) {}

    protected deleteEspaces() {}

    protected validationEmpty(sFieldValue: string) {
        this.commonFunction.write('validationEmpty', sFieldValue);
        if (sFieldValue.trim() === '') {
          this.deleteEspaces();
          this.commonFunction.write('validationEmpty', 'return ' + true);
          return true;
        } else {
          this.commonFunction.write('validationEmpty', 'return ' + false);
          return false;
        }
      } 

 /* MODES FORM OR LIST */

    protected activateMode(mode: string) {
        this.commonFunction.write('activateMode', mode.toString());
        if (mode === '') {
          if(this.getNumEntity() === 0) {
            this.activateMode('form');
          } else {
            this.activateMode('list');
          }
        } else {
          this.setMode(mode);
          this.showMode();
        }
      }
 
  protected showMode() {
    if (this.getMode() === 'form') {
      this.boolShowAddBoutton_ = true;
      this.boolShowAddNewBoutton_ = false;
    } else if (this.getMode() === 'list') {
      this.boolShowAddBoutton_ = false;
      this.boolShowAddNewBoutton_ = true;
    }
  }

  public cancel() {
    this.commonFunction.write('cancel', '');
    if (this.getNumEntity() > 0) {
      this.activateMode('list');
      this.setUpdating(false);
      this.errorEnrity(false);
      this.resetErrors();
      this.resetArray();
      this.resetExtra();
    }
  }

  protected resetArray(){}

  
  protected loadPagination() {
    this.commonFunction.write('loadPagination', '');
    this.paginationBy = this.MAXROWSGRID;
    if(this.getNumEntity() > 0) {
      this.paginationFrom = 1;
    }
    if(this.getNumEntity() < this.paginationBy) {
      this.paginationTo = this.getNumEntity();
    } else {
      this.paginationTo = this.paginationBy;
    }
    this.numPages = Math.ceil(this.getNumEntity() / this.paginationBy);
    this.paginationPageShowed = 1;
    // this.pageByOptions[this.pageByOptions.length]= 3;
    // this.pageByOptions[this.pageByOptions.length]= 5;
    // this.pageByOptions[this.pageByOptions.length]= 10;
    // this.pageByOptions[this.pageByOptions.length]= 20;
    // this.pageByOptions[this.pageByOptions.length]= 50;
    this.commonFunction.write('getNumEntity', this.getNumEntity().toString());
    this.commonFunction.write('paginationBy', this.paginationBy.toString());
    this.commonFunction.write('paginationFrom', this.paginationFrom.toString());
    this.commonFunction.write('paginationTo', this.paginationTo.toString());
    this.commonFunction.write('numPages', this.numPages.toString());
    this.commonFunction.write('paginationPageShowed', this.paginationPageShowed.toString());
  }  

  public showLinePage(i: number) {
    if(i + 1 >= this.paginationFrom && i + 1 <= this.paginationTo) {
      return true;
    } else {
      return false;
    }
  }

  protected refreshPagged($event: any) {
    const pagedValue = ($event.target.value.toString() ? $event.target.value.toString() : $event.which);
    this.commonFunction.write('refreshPagged', pagedValue);
    /*this.paginationPageShowed= 1;
    this.paginationFrom = ((this.paginationPageShowed*this.paginationBy)-(this.paginationBy-1));
    if(this.paginationFrom+this.paginationBy-1>=this.getNumUsers()) {
      this.paginationTo = this.getNumUsers();
    } else {
      this.paginationTo = this.paginationFrom+this.paginationBy-1;
    }
    this.commonFunction.write('getNumUsers', this.getNumUsers().toString());
    this.commonFunction.write('paginationBy', this.paginationBy.toString());
    this.commonFunction.write('paginationFrom', this.paginationFrom.toString());
    this.commonFunction.write('paginationTo', this.paginationTo.toString());
    this.commonFunction.write('numPages', this.numPages.toString());
    this.commonFunction.write('paginationPageShowed', this.paginationPageShowed.toString());*/
  }

  private refreshPagination($event: any) {
    const pageValue = ($event.target.value.toString() ? $event.target.value.toString() : $event.which);
    this.commonFunction.write('refreshPagination', pageValue);
    this.paginationPageShowed= pageValue;
    this.paginationFrom = ((this.paginationPageShowed * this.paginationBy) - (this.paginationBy - 1));
    if (this.paginationFrom + this.paginationBy - 1 >= this.getNumEntity()) {
      this.paginationTo = this.getNumEntity();
    } else {
      this.paginationTo = this.paginationFrom + this.paginationBy - 1;
    }
    this.commonFunction.write('getNumEntity', this.getNumEntity().toString());
    this.commonFunction.write('paginationBy', this.paginationBy.toString());
    this.commonFunction.write('paginationFrom', this.paginationFrom.toString());
    this.commonFunction.write('paginationTo', this.paginationTo.toString());
    this.commonFunction.write('numPages', this.numPages.toString());
    this.commonFunction.write('paginationPageShowed', this.paginationPageShowed.toString());
  }



    /* MOCK */

    /*
    private loadUserssMock() {
        this.commonFunction.write('loadUserssMock', '');
        this.usersArray.push({'id': 1, 'login': 'testLoginA','password': 'testPasswordA', 'name': 'testName', 'surname': 'testSurname'});
        this.usersArray.push({'id': 2, 'login': 'testLoginB','password': 'testPasswordB', 'name': 'testName', 'surname': 'testSurname'});
        this.usersArray.push({'id': 3, 'login': 'testLoginC','password': 'testPasswordC', 'name': 'testName', 'surname': 'testSurname'});
        this.usersArray.push({'id': 4, 'login': 'testLoginD','password': 'testPasswordD', 'name': 'testName', 'surname': 'testSurname'});
        this.syncUsers('save');
        this.loaded = true;
      }
  
      private deleteUserMock(index: number){
        this.commonFunction.write('deleteUserMock', 'Deleting user from array..');
        this.usersArray.splice(index, 1);
        this.syncUsers('save');
        this.loadPagination();
        this.activateMode('');
      }
  
      private updateUserMock(index: number) {
        this.commonFunction.write('updateUserMock', index.toString());
        this.setUpdating(false);
        this.syncUsers('save');
      }
  
      private insertUserMock(user: User, index: number) {
        this.commonFunction.write('insertUserMock', index.toString());
        this.usersArray[index][this.LABELID] = this.maxId + 1;
        this.maxId = this.maxId + 1;
        this.syncUsers('save');
        this.loadPagination();
      }
    */

  }
 