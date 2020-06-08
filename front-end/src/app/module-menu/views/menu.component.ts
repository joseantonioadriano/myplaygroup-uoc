import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Menu from '../../types/menu.type';
import CDish from '../../classes/dish.class';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { MenuService } from '../../services/menu.service';
import { DishService } from '../../services/dish.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class MenuComponent extends BaseComponent  {

    menusArray: Menu[] = [];
    dishesArray: CDish[] = [];
    schoolsArray: CSchool[] = [];

    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
    public idBreakfast: number = 0;
    public nameBreakfast:string = '';
    public idStarter: number = 0;
    public nameStarter:string = '';
    public idMain: number = 0;
    public nameMain:string = '';
    public idDessert: number = 0;
    public nameDessert:string = '';
    public idSnack: number = 0;    
    public nameSnack:string = '';
    public breakfastSelected: CDish;
    public starterSelected: CDish;
    public mainSelected: CDish;
    public dessertSelected: CDish;
    public snackSelected: CDish;
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;

    public selectingSchool: boolean= false;      

    // CLASSES
    //public labelClassName: string = !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string = 'inputcomp__label--activated';
    
    public selectingBreakfast: boolean= false;
    public selectingStarter: boolean= false;
    public selectingMain: boolean= false;
    public selectingDessert: boolean= false;
    public selectingSnack: boolean= false;

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
    private LABELIDDISH: string = 'idDish';
    private LABELIDBREAKFAST: string = 'idBreakfast';
    private LABELIDSTARTER: string = 'idStarter';
    private LABELIDMAIN: string = 'idMain';
    private LABELIDDESSERT: string = 'idDessert';
    private LABELIDSNACK: string = 'idSnack';
    private LABELNAMEDISH: string = 'name';
    private LABELDISHID: string = 'id';
    private LABELDISHNAME: string = 'name';
    private LABELBREAKFAST: number = 1;
    private LABELSTARTER: number = 2;
    private LABELMAIN: number = 3;
    private LABELDESSERT: number = 4;
    private LABELSNACK: number = 5;
    private LABELIDSCHOOL: string = 'idSchool';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';

    private menuService: MenuService;
    private dishService: DishService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor MenuComponent', '');      
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.menuService = new MenuService(this.http);
        this.dishService = new DishService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectMenu();
        this.selectDishes();
        this.selectSchools();
    }      
    

    /* SEARCHS */


    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.menusArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.menusArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
      this.syncMenus('save');      
    }

    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }    


    private async selectMenu() {
      this.commonFunction.write('selectMenu', '');        
      this.menuService.getMenusService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectMenuOK();
        this.commonFunction.write('getMenus', 'ok');
      }, response => {
        this.selectMenuKO();
        this.commonFunction.write('getMenus', 'ko');
      });
    }

    private updateMenu(index: number) {
      this.commonFunction.write('updateMenu', 'index:' + index.toString() + ', id: '
      + this.menusArray[index][this.LABELID].toString() + ', name: ' 
      + this.menusArray[index][this.LABELNAME].toString() + ', idBreakfast: ' 
      + this.menusArray[index][this.LABELIDBREAKFAST].toString()+ ', idStarter: ' 
      + this.menusArray[index][this.LABELIDSTARTER].toString()+ ', idMain: ' 
      + this.menusArray[index][this.LABELIDMAIN].toString()+ ', idDessert: ' 
      + this.menusArray[index][this.LABELIDDESSERT].toString()+ ', idSnack: ' 
      + this.menusArray[index][this.LABELIDSNACK].toString()  + ', idSchool: ' 
      + this.menusArray[index][this.LABELIDSCHOOL].toString());
      this.menuService.updateMenuService(this.id, this.name, 
                                         this.idBreakfast, 
                                         this.idStarter, 
                                         this.idMain, 
                                         this.idDessert, 
                                         this.idStarter,
                                         this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateMenuOK(index);
      }, response => {
        this.updateMenuKO();
      });
    }

    public deleteMenu(index: number) {
      this.commonFunction.write('deleteMenu', index.toString() + ' with id: ' + this.menusArray[index][this.LABELID]);
      this.menuService.deleteMenuService(this.menusArray[index][this.LABELID]).subscribe((response: any) => {
        this.responseGET = response;
        this.deleteMenuOK(index);
      }, response => {
        this.deleteMenuKO();
      });
    }

    private insertMenu(menu: Menu) {
      const index: number = menu.id;
      this.logData();
      this.commonFunction.write('insertMenu', 'index:' + index.toString() + this.menusArray[index][this.LABELNAME].toString() + ', idBreakfast: ' 
          + this.menusArray[index][this.LABELIDBREAKFAST].toString()+ ', idStarter: ' 
          + this.menusArray[index][this.LABELIDSTARTER].toString()+ ', idMain: ' 
          + this.menusArray[index][this.LABELIDMAIN].toString()+ ', idDessert: ' 
          + this.menusArray[index][this.LABELIDDESSERT].toString()+ ', idSnack: ' 
          + this.menusArray[index][this.LABELIDSNACK].toString() + ', idSchool'
          + this.menusArray[index][this.LABELIDSCHOOL].toString()
          );
      this.menuService.insertMenuService(this.name, 
                                         this.idBreakfast, 
                                         this.idStarter, 
                                         this.idMain, 
                                         this.idDessert, 
                                         this.idStarter,
                                         this.idSchool).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertMenu', 'Register created with id: ' + response.newId);
        this.menusArray[index][this.LABELID] = response.newId;
        this.insertMenuOK(this.menusArray[index][this.LABELID]);
      }, response => {
        this.selectMenuKO();
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

    public async selectDishes() {
      this.commonFunction.write('selectDishes', '');        
      this.dishService.getDishesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selecDishOK();
        this.commonFunction.write('selectDishes', 'ok');
      }, response => {
        this.selecDishKO();
        this.commonFunction.write('selectDishes', 'ko');
      });
    }    

    private selecDishOK() {
      this.commonFunction.write('selecDishOK', '');
      this.dishesArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.dishesArray.push(new CDish(this.responseGET[i][this.LABELDISHID], 
                                        this.responseGET[i][this.LABELDISHNAME], 
                                        this.responseGET[i][this.LABELIDSCHOOL]))
      }   
      this.syncMenus('save');      
    }

    private selecDishKO() {
      this.commonFunction.write('selecDishKO', '');
    }


    private selectMenuOK() {
      this.commonFunction.write('selectMenuOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.menusArray.push({'id':          this.responseGET[i][this.LABELID],
                              'name':        this.responseGET[i][this.LABELNAME],
                              'idBreakfast': this.responseGET[i][this.LABELIDBREAKFAST],
                              'idStarter':   this.responseGET[i][this.LABELIDSTARTER],
                              'idMain':      this.responseGET[i][this.LABELIDMAIN],
                              'idDessert':   this.responseGET[i][this.LABELIDDESSERT],
                              'idSnack':     this.responseGET[i][this.LABELIDSNACK],
                              'idSchool':    this.responseGET[i][this.LABELIDSCHOOL]});        
      }      
      //this.showArray();
      this.syncMenus('save');
      this.firstLoad();
    }

    public showArray(){
      this.commonFunction.write('showArray', '');        
      for(let i= 0; i< this.menusArray.length; i++){
        console.log('Menu: '+
          this.menusArray[i][this.LABELID]+'_'+
          this.menusArray[i][this.LABELNAME]+'_'+
          this.menusArray[i][this.LABELIDBREAKFAST]+'_'+
          this.menusArray[i][this.LABELIDSTARTER]+'_'+
          this.menusArray[i][this.LABELIDMAIN]+'_'+
          this.menusArray[i][this.LABELIDDESSERT]+'_'+
          this.menusArray[i][this.LABELIDSNACK]+'_');
      }
      for(let i= 0; i< this.dishesArray.length; i++){
        console.log('Dish: '+
          this.dishesArray[i][this.LABELDISHID]+'_'+
          this.dishesArray[i][this.LABELDISHNAME]+'_'+
          this.dishesArray[i][this.LABELIDSCHOOL]);
      }
    }    

    public async searchNameDish(idType: number, idDish: number) {
      this.commonFunction.write('searchNameDish', '');        
      this.dishService.getDishByIdService(idDish).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNameDishOK(idType);
        this.commonFunction.write('searchNameDish', 'ok');
      }, response => {
        this.searchNameDishKO();
        this.commonFunction.write('searchNameDish', 'ko');
      });
    }

    private searchNameDishOK(idType: number) {
      this.commonFunction.write('searchNameDishOK', idType.toString());
      console.log("this.responseGET[0][this.LABELNAMEDISH]:"+this.responseGET[0][this.LABELNAMEDISH]);
      switch (idType) {
        case this.LABELBREAKFAST: 
          this.nameBreakfast= this.responseGET[0][this.LABELNAMEDISH];
          break;
        case this.LABELSTARTER:
          this.nameStarter= this.responseGET[0][this.LABELNAMEDISH];
          break;
        case this.LABELMAIN:
          this.nameMain= this.responseGET[0][this.LABELNAMEDISH];
          break;
        case this.LABELDESSERT:
          this.nameDessert= this.responseGET[0][this.LABELNAMEDISH];
          break;
        case this.LABELSNACK:
          this.nameSnack= this.responseGET[0][this.LABELNAMEDISH];     
          break;
        default:
          break;
      }      
    }

    private searchNameDishKO() {
      this.commonFunction.write('searchNameDishKO', '');
    }


    private updateMenuOK(index: number) {
      this.commonFunction.write('updateMenuOK', index.toString());
      this.setUpdating(false);
      this.syncMenus('save');
    }

    private deleteMenuOK(index: number) {
      this.commonFunction.write('deleteMenuOK', 'Menu deleted from DB, deleting from array now..');
      this.menusArray.splice(index, 1);
      this.syncMenus('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertMenuOK(index: number) {
      this.commonFunction.write('insertMenuOK', index.toString());
      this.syncMenus('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */
    
    

    private selectMenuKO() {
      this.commonFunction.write('badResponseGET', '');
    }


    private updateMenuKO() {
      this.commonFunction.write('updateMenuKO', 'Error updating menu in DB');      
      this.setUpdating(false);
    }

    private deleteMenuKO() {
      this.commonFunction.write('deleteMenuKO', 'Error deleting menu from DB');
    }

    private insertMenuKO() {
      this.commonFunction.write('insertMenuKO', 'Error inserting menu in DB');
    }

    /* LOADS */

    private loadMenus() {
      this.commonFunction.write('loadMenus', '');
      this.selectMenu();
    }



    private loadArrayMenus() {
      this.commonFunction.write('loadArrayMenus', '');
      /* TODO
      for (var i= 0; i<menuModule.menusArray.length; i++) {
        this.menusArray.push(menuModule.menusArray[i]);
      }
      */
    }

    protected loadFieldsValidate() {
      this.commonFunction.write('loadFieldsValidate', '');
      this.loadFieldValidate(this.LABELNAME);
    }   

    /* RESETS */    

    protected resetExtra(){
      this.commonFunction.write('resetExtra', '');
      this.selectingBreakfast = false;           
      this.selectingStarter = false;           
      this.selectingMain = false;           
      this.selectingDessert = false;           
      this.selectingSnack = false;           
      this.breakfastSelected= null;         
      this.starterSelected= null;         
      this.mainSelected= null;         
      this.dessertSelected= null;         
      this.snackSelected= null;
      this.schoolSelected= null;
      this.selectingSchool= false;
    }

    protected resetFormFields(){
      this.commonFunction.write('resetFormFields', '');
      this.id = 0;
      this.name = '';
      this.idBreakfast= 0;
      this.idStarter= 0;
      this.idMain= 0;
      this.idDessert= 0;
      this.idSnack= 0;
      this.idSchool = 0;
      this.nameBreakfast= '';
      this.nameStarter= '';
      this.nameMain= '';
      this.nameDessert= '';
      this.nameSnack= '';
      this.breakfastSelected= null;
      this.starterSelected= null;
      this.mainSelected= null;
      this.dessertSelected= null;
      this.snackSelected= null;
      this.selectingBreakfast= false;
      this.selectingStarter= false;
      this.selectingMain= false;
      this.selectingDessert= false;
      this.selectingSnack= false;
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
      this.commonFunction.write('logData', 'idBreakfast: ' + this.idBreakfast);
      this.commonFunction.write('logData', 'idStarter: ' + this.idStarter);
      this.commonFunction.write('logData', 'idMain: ' + this.idMain);
      this.commonFunction.write('logData', 'idDessert: ' + this.idDessert);
      this.commonFunction.write('logData', 'idSnack: ' + this.idSnack);
      this.commonFunction.write('logData', 'nameBreakfast: ' + this.nameBreakfast);
      this.commonFunction.write('logData', 'nameStarter: ' + this.nameStarter);
      this.commonFunction.write('logData', 'nameMain: ' + this.nameMain);
      this.commonFunction.write('logData', 'nameDessert: ' + this.nameDessert);
      this.commonFunction.write('logData', 'nameSnack: ' + this.nameSnack);
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
      this.commonFunction.write('getNumEntity', this.menusArray.length.toString());
      return this.menusArray.length;
    }

    
    /* FUNCTIONALITIES */   
  
    public addNewMenu() {
      this.commonFunction.write('addNewMenu', '');
      this.resetForm();      
      this.activateMode('form');
    }

    private syncMenus(option: string) {
      this.commonFunction.write('syncMenus', option);
      if (option === 'save') {
        // TODO
        // menuModule.setmenusArray(this.menusArray);
      } else if (option === 'load') {
        this.loadArrayMenus();
        this.maxId = this.menusArray.length;
      }
      this.commonFunction.write('syncMenus', option + ' finished');
    }

    public addMenu() {
      this.commonFunction.write('addMenu', '');
      this.logData();
      this.showArray();

      if (this.validateEntity() === false) {
        this.commonFunction.write('addMenu', 'validateMenu === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addMenu', 'isUpdating === true');          
          this.menusArray[this.index][this.LABELID] = this.id;
          this.menusArray[this.index][this.LABELNAME] = this.name;
          
          this.isSelectingBreakfast()=== true ? 
            this.idBreakfast = this.breakfastSelected.getId() : null;
          this.menusArray[this.index][this.LABELIDBREAKFAST] = this.idBreakfast;
          
          this.isSelectingStarter()=== true ? 
            this.idStarter = this.starterSelected.getId() : null;
          this.menusArray[this.index][this.LABELIDSTARTER] = this.idStarter;
          
          this.isSelectingMain()=== true ? 
            this.idMain = this.mainSelected.getId() : null;
          this.menusArray[this.index][this.LABELIDMAIN] = this.idMain;
          
          this.isSelectingDessert()=== true ? 
            this.idDessert = this.dessertSelected.getId() : null;
          this.menusArray[this.index][this.LABELIDDESSERT] = this.idDessert;
          
          this.isSelectingSnack()=== true ? 
            this.idSnack = this.snackSelected.getId() : null;
          this.menusArray[this.index][this.LABELIDSNACK] = this.idSnack;

          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.menusArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          

          this.updateMenu(this.index);          
        } else {
          this.commonFunction.write('addMenu', 'isUpdating === false');
          this.maxId++;          
          this.idBreakfast= this.breakfastSelected.getId();
          this.idStarter= this.starterSelected.getId();
          this.idMain= this.mainSelected.getId();
          this.idDessert= this.dessertSelected.getId();
          this.idSnack= this.snackSelected.getId();          
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
            
          const menu: Menu = { id: this.menusArray.length, name: this.name, idBreakfast: this.idBreakfast, idStarter: this.idStarter, 
                                                            idMain: this.idMain, idDessert: this.idDessert, idSnack: this.idSnack, idSchool: this.idSchool};
          this.menusArray.push(menu);
          this.insertMenu(menu);
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

    public modifyMenu(index: number) {
      this.commonFunction.write('modifyMenu', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.menusArray[index][this.LABELID];
      this.name = this.menusArray[index][this.LABELNAME];
      this.idBreakfast = this.menusArray[index][this.LABELIDBREAKFAST];
      this.idStarter = this.menusArray[index][this.LABELIDSTARTER];
      this.idMain = this.menusArray[index][this.LABELIDMAIN];
      this.idDessert = this.menusArray[index][this.LABELIDDESSERT];
      this.idSnack = this.menusArray[index][this.LABELIDSNACK];
      this.idSchool= this.menusArray[index][this.LABELIDSCHOOL];
      this.searchNameSchool(this.idSchool);
      this.searchNameDish(this.LABELBREAKFAST, this.idBreakfast);
      this.searchNameDish(this.LABELSTARTER, this.idStarter);
      this.searchNameDish(this.LABELMAIN, this.idMain);
      this.searchNameDish(this.LABELDESSERT, this.idDessert);
      this.searchNameDish(this.LABELSNACK, this.idSnack);
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

    public isSelectingBreakfast(){
      return this.selectingBreakfast;
    }

    public isSelectingStarter(){
      return this.selectingStarter;
    }

    public isSelectingMain(){
      return this.selectingMain;
    }

    public isSelectingDessert(){
      return this.selectingDessert;
    }

    public isSelectingSnack(){
      return this.selectingSnack;
    }

    public selectBreakfast(){
       (this.isSelectingBreakfast() === true) ? this.selectingBreakfast = false: this.selectingBreakfast = true;
    }

    public selectStarter(){
       (this.isSelectingStarter() === true) ? this.selectingStarter = false: this.selectingStarter = true;
    }

    public selectMain(){
       (this.isSelectingMain() === true) ? this.selectingMain = false: this.selectingMain = true;
    }

    public selectDessert(){
       (this.isSelectingDessert() === true) ? this.selectingDessert = false: this.selectingDessert = true;
    }

    public selectSnack(){
       (this.isSelectingSnack() === true) ? this.selectingSnack = false: this.selectingSnack = true;
    }

  }
 