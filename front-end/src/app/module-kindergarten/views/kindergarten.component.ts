import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Kindergarten from '../../types/kindergarten.type';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { KindergartenService } from '../../services/kindergarten.service';

@Component({
    selector: 'app-kindergarten',
    templateUrl: './kindergarten.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class KindergartenComponent extends BaseComponent  {

    kindergartensArray: Kindergarten[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public name: string = '';
    public cif: string = '';
      
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
    private LABELCIF: string = 'cif';

    private kindergartenService: KindergartenService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor KindergartenComponent', '');
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.kindergartenService = new KindergartenService(this.http);
        this.loadConf();
        this.selectKindergarten();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.kindergartensArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.kindergartensArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
    
    public async selectKindergarten() {
      this.commonFunction.write('selectKindergarten', '');        
      this.kindergartenService.getKindergartensService().subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectKindergartenOK();
        this.commonFunction.write('getKindergartens', 'ok');
      }, response => {
        this.selectKindergartenKO();
        this.commonFunction.write('getKindergartens', 'ko');
      });
    }

    public updateKindergarten(index: number) {
      this.commonFunction.write('updateKindergarten', 'index:' + index.toString() + ', id: '
      + this.kindergartensArray[index][this.LABELID].toString() + ', login: ' 
      + this.kindergartensArray[index][this.LABELNAME].toString() + ', cif: ' 
      + this.kindergartensArray[index][this.LABELCIF].toString());
      this.kindergartenService.updateKindergartenService(this.id, this.cif, this.name).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateKindergartenOK(index);
      }, response => {
        this.updateKindergartenKO();
      });
    }

    public deleteKindergarten(index: number) {
      this.commonFunction.write('deleteKindergarten', index.toString() + ' with id: ' + this.kindergartensArray[index][this.LABELID]);
      this.kindergartenService.deleteKindergartenService(this.kindergartensArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteKindergartenOK(index);
      }, response => {
        this.deleteKindergartenKO();
      });
    }

    public showArray(){
      this.commonFunction.write('showArray', 'responsablesArray');        
      for(let i= 0; i< this.kindergartensArray.length; i++){
        console.log(
          this.kindergartensArray[i][this.LABELID]+'_'+
          this.kindergartensArray[i][this.LABELCIF]+'-'+
          this.kindergartensArray[i][this.LABELNAME]
          );
      }
    }  

    public insertKindergarten(kindergarten: Kindergarten) {
      this.commonFunction.write('insertKindergarten',  kindergarten.id + '-' + kindergarten.name + '-' + kindergarten.cif);
      const index: number = kindergarten.id;
      //this.showArray();
      this.commonFunction.write('insertKindergarten', 'index:' + index.toString() 
      + this.kindergartensArray[index][this.LABELNAME].toString() + ', CIF:' 
      + this.kindergartensArray[index][this.LABELCIF].toString());
      this.kindergartenService.insertKindergartenService(this.cif, this.name).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertKindergarten', 'Register created with id: ' + response.newId);
        this.kindergartensArray[index][this.LABELID] = response.newId;
        this.insertKindergartenOK(this.kindergartensArray[index][this.LABELID]);
      }, response => {
        this.selectKindergartenKO();
      });
    }  


    /* HTTPGET REPONSE OK */

    private selectKindergartenOK() {
      this.commonFunction.write('selectKindergartenOK', '');
      //this.showArray();
      for (let i = 0; i < this.responseGET.length; i++) {
        this.kindergartensArray.push({'id': this.responseGET[i][this.LABELID],
                                      'cif': this.responseGET[i][this.LABELCIF],
                                      'name': this.responseGET[i][this.LABELNAME]                                      
                                   });
      }
      //this.showArray();
      this.syncKindergartens('save');
      this.firstLoad();
    }

    private updateKindergartenOK(index: number) {
      this.commonFunction.write('updateKindergartenOK', index.toString());
      this.setUpdating(false);
      this.syncKindergartens('save');
    }

    private deleteKindergartenOK(index: number) {
      this.commonFunction.write('deleteKindergartenOK', 'Kindergarten deleted from DB, deleting from array now..');
      this.kindergartensArray.splice(index, 1);
      this.syncKindergartens('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertKindergartenOK(index: number) {
      this.commonFunction.write('insertKindergartenOK', index.toString());
      this.syncKindergartens('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectKindergartenKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateKindergartenKO() {
      this.commonFunction.write('updateKindergartenKO', 'Error updating kindergarten in DB');
      this.setUpdating(false);
    }

    private deleteKindergartenKO() {
      this.commonFunction.write('deleteKindergartenKO', 'Error deleting kindergarten from DB');
    }

    private insertKindergartenKO() {
      this.commonFunction.write('insertKindergartenKO', 'Error inserting kindergarten in DB');
    }

    /* LOADS */

    private loadKindergartens() {
      this.commonFunction.write('loadKindergartens', '');
      this.selectKindergarten();
    }


    private loadArrayKindergartens() {
      this.commonFunction.write('loadArrayKindergartens', '');
      /* TODO
      for (var i= 0; i<kindergartenModule.kindergartensArray.length; i++) {
        this.kindergartensArray.push(kindergartenModule.kindergartensArray[i]);
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
      this.cif= '';
      this.name = '';
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
      this.commonFunction.write('logData', 'cif: ' + this.cif);
      this.commonFunction.write('logData', 'name: ' + this.name);
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
      this.commonFunction.write('getNumEntity', this.kindergartensArray.length.toString());
      return this.kindergartensArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewKindergarten() {
      this.commonFunction.write('addNewKindergarten', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncKindergartens(option: string) {
      this.commonFunction.write('syncKindergartens', option);
      if (option === 'save') {
        // TODO
        // kindergartenModule.setkindergartensArray(this.kindergartensArray);
      } else if (option === 'load') {
        this.loadArrayKindergartens();
        this.maxId = this.kindergartensArray.length;
      }
      this.commonFunction.write('syncKindergartens', option + ' finished');
    }

    public addKindergarten() {
      this.commonFunction.write('addKindergarten', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addKindergarten', 'validateKindergarten === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addKindergarten', 'isUpdating === true');
          this.kindergartensArray[this.index][this.LABELID] = this.id;
          this.kindergartensArray[this.index][this.LABELCIF] = this.cif;
          this.kindergartensArray[this.index][this.LABELNAME] = this.name;
          this.updateKindergarten(this.index);
        } else {
          this.commonFunction.write('addKindergarten', 'isUpdating === false');
          this.maxId++;
          //console.log("CIF:"+this.cif);
          const kindergarten: Kindergarten = {id: this.kindergartensArray.length, cif: this.cif, name: this.name};
          //this.showArray();
          this.kindergartensArray.push(kindergarten);
          //this.showArray();
          this.insertKindergarten(kindergarten);
        }
        this.resetForm();
        this.activateMode('list');
      }
    }

    public modifyKindergarten(index: number) {
      this.commonFunction.write('modifyKindergarten', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.kindergartensArray[index][this.LABELID];
      this.cif = this.kindergartensArray[index][this.LABELCIF];
      this.name = this.kindergartensArray[index][this.LABELNAME];
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
 