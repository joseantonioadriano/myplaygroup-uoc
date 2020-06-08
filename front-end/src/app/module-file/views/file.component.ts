import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import CommonFunction from '../../common/common-functions';
import CIntolerance from '../../classes/intolerance.class';
import { BaseComponent } from '../../module-base/views/base.component';
import { StudentService } from '../../services/student.service';
import { ParentService } from '../../services/parent.service';
import { IntoleranceService } from '../../services/intolerance.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-file',
    templateUrl: './file.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class FileComponent extends BaseComponent {    

    public id: number= 0;
    public studentName: string= '';
    public studentSurname: string= '';
    public studentDni: string= '';
    public idResponsable1: number= 0;
    public idResponsable2: number= 0;
    public nameResponsable1: string= '';
    public nameResponsable2: string= '';
    public nameSchool: string= '';
    public depositions: number= 0;
    public remarks: string= '';
    public namePicture: string= 'boy.png';

    public meal: number = 0;
    public nameMeal: string = '';
    public selectingMeal: boolean= false;
    public mealSelected: number= 0;

    public nap: number = 0;
    public nameNap: string = '';
    public selectingNap: boolean= false;
    public napSelected: number= 0;

    private studentService: StudentService;    
    private parentService: ParentService;    
    private intoleranceService: IntoleranceService;
    private sessionService: SessionService;    

    private LABELSTUDENTID: string = 'id';
    private LABELSTUDENTDNI: string = 'dni';
    private LABELSTUDENTIDTYPE: string = 'idType';
    private LABELSTUDENTNAME: string = 'name';
    private LABELSTUDENTSURNAME: string = 'surname';
    private LABELSTUDENTIDRESPONSABLE1: string = 'idResponsable1';
    private LABELSTUDENTIDRESPONSABLE2: string = 'idResponsable2';
    private LABELSURNAMERESPONSABLE1: string = 'surname';
    private LABELSURNAMERESPONSABLE2: string = 'surname';
    private LABELNAMERESPONSABLE1: string = 'name';
    private LABELNAMERESPONSABLE2: string = 'name';
    private LABELINTOLERANCEID: string = 'id';
    private LABELINTOLERANCENAME: string = 'name';
    private LABELINTOLERANCEIDSCHOOL: string = 'idSchool';
    private LABELTODAYDEPOSITIONS: string = 'depositions';
    private LABELTODAYMEALS: string = 'meals';
    private LABELTODAYNAP: string = 'nap';
    private LABELTODAYREMARKS: string = 'remarks';

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
    
    intolerancesArray: CIntolerance[] = [];

    constructor(private http: HttpClient, private router : Router){
      super();
      this.commonFunction= new CommonFunction(); 
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');

        this.studentService = new StudentService(this.http);
        this.parentService = new ParentService(this.http);
        this.intoleranceService= new IntoleranceService(this.http);
        this.sessionService = new SessionService();

        this.id= this.commonFunction.getStorage('studentSelectedFile');
        this.selectStudent();        
        this.selectIntolerance();
        this.selectTodaysRegister();
    }   
    
    public async selectStudent() {
        this.commonFunction.write('selectStudent', '');  
        this.setUpdating(true);      
        this.studentService.getStudentByIdService(this.id, this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.selectStudentOK();
          this.commonFunction.write('selectStudent', 'ok');
        }, response => {
          this.selectStudentKO();
          this.commonFunction.write('selectStudent', 'ko');
        });
      }
    
    private selectStudentOK() {
        this.commonFunction.write('selectStudentOK', '');        
        this.studentName= this.responseGET[0][this.LABELSTUDENTNAME];        
        this.studentSurname= this.responseGET[0][this.LABELSTUDENTSURNAME];  
        this.studentDni= this.responseGET[0][this.LABELSTUDENTDNI];
        this.idResponsable1= this.responseGET[0][this.LABELSTUDENTIDRESPONSABLE1];
        this.idResponsable2= this.responseGET[0][this.LABELSTUDENTIDRESPONSABLE2];
        this.searchNameResponsable(1, this.idResponsable1);
        this.searchNameResponsable(2, this.idResponsable2);
        this.firstLoad();
    }

    private getMealName(meal: string){
        this.commonFunction.write('getMealName', meal.toString());   
        switch(meal){
            case "1": 
                return "Little";
                break;
            case "2": 
                return "Normal";
                break;
            case "3": 
                return "All";
                break;
            default:
                return "";
                break;
        }
    }

    private getNapName(meal: string){
        this.commonFunction.write('getNapName', meal.toString());   
        switch(meal){
            case "1": 
                return "Yes";
                break;
            case "2": 
                return "No";
                break;
            default:
                return "";
                break;
        }
    }

    private selectStudentKO() {
        this.commonFunction.write('badResponseGET', '');
    }

    private selectIntoleranceOK() {
        this.commonFunction.write('selectIntoleranceOK', '');
        for (let i = 0; i < this.responseGET.length; i++) {        
          this.intolerancesArray.push(new CIntolerance(this.responseGET[i][this.LABELINTOLERANCEID], 
                                                       this.responseGET[i][this.LABELINTOLERANCENAME], 
                                                       this.responseGET[i][this.LABELINTOLERANCEIDSCHOOL]));
        }
        this.syncFile('save');
        this.firstLoad();
      }

      private syncFile(option: string) {
        this.commonFunction.write('syncFile', option);
        if (option === 'save') {
          // TODO
          // studentModule.setstudentsArray(this.studentsArray);
        } else if (option === 'load') {
          //this.loadArrayStudents();
          //this.maxId = this.studentsArray.length;
        }
        this.commonFunction.write('syncFile', option + ' finished');
      }
  
  
      public async selectIntolerance() {
        this.commonFunction.write('selectIntolerance', '');        
        this.intoleranceService.getIntolerancesByStudentService(this.id).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.selectIntoleranceOK();
          this.commonFunction.write('getintolerances', 'ok');
        }, response => {
          this.selectIntoleranceKO();
          this.commonFunction.write('getintolerances', 'ko');
        });
      }
  
      private selectIntoleranceKO() {
        this.commonFunction.write('badResponseGET', '');
      }

    public async searchNameResponsable(idType: number, idResponsable: number) {
        this.commonFunction.write('searchNameResponsable', '');        
        this.parentService.getParentByIdService(idResponsable).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.searchNameResponsableOK(idType);
          this.commonFunction.write('searchNameResponsable', 'ok');
        }, response => {
          this.searchNameResponsableKO();
          this.commonFunction.write('searchNameResponsable', 'ko');
        });
      }
  
      private searchNameResponsableOK(idType: number) {
        this.commonFunction.write('searchNameResponsableOK', '');
        switch(idType){
          case 1:
          this.nameResponsable1= this.responseGET[0][this.LABELSURNAMERESPONSABLE1] + ', ' + this.responseGET[0][this.LABELNAMERESPONSABLE1];
          break;
          case 2:
          this.nameResponsable2= this.responseGET[0][this.LABELSURNAMERESPONSABLE2] + ', ' + this.responseGET[0][this.LABELNAMERESPONSABLE2];
          break;
          default:
            break;
        }
      }
  
      private searchNameResponsableKO() {
        this.commonFunction.write('searchNameResponsableKO', '');
      }
      
    public async updateTodaysRegister() {
        this.commonFunction.write('updateTodaysRegister', '');        
        
        this.isSelectingMeal()=== true ? 
            this.meal = this.mealSelected : null;
        
        this.isSelectingNap()=== true ? 
            this.nap = this.napSelected : null;

        this.studentService.updateTodaysRegisterService(this.id, this.depositions, this.meal, this.nap, this.remarks).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.updateTodaysRegisterOK();
          this.commonFunction.write('updateTodaysRegister', 'ok');
        }, response => {
          this.updateTodaysRegisterKO();
          this.commonFunction.write('updateTodaysRegister', 'ko');
        });
      }

    private updateTodaysRegisterOK() {
        this.commonFunction.write('updateTodaysRegisterOK', '');
        for (let i = 0; i < this.responseGET.length; i++) {        
            this.intolerancesArray.push(new CIntolerance(this.responseGET[i][this.LABELINTOLERANCEID], 
                                                        this.responseGET[i][this.LABELINTOLERANCENAME], 
                                                        this.responseGET[i][this.LABELINTOLERANCEIDSCHOOL]));
        }
        this.syncFile('save');
        this.firstLoad();
        this.router.navigateByUrl('mainpane');
    }

    private updateTodaysRegisterKO() {
        this.commonFunction.write('badResponseGET', '');
    }

    public cancel(){
        this.router.navigateByUrl('mainpane');
    }


    protected resetFormFields(){
        this.commonFunction.write('resetFormFields', '');
        this.id = 0;
        this.selectingMeal= false;
        this.mealSelected= null;
        this.selectingNap= false;
        this.napSelected= null;
      }    
  
      protected resetExtra(){      
        this.selectingMeal= false;
        this.mealSelected= null;
        this.selectingNap= false;
        this.napSelected= null;
      }    


    public async selectTodaysRegister() {
        this.commonFunction.write('selectTodaysRegister', '');        
        this.studentService.selectTodaysRegisterService(this.id).subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.selectTodaysRegisterOK();
          this.commonFunction.write('selectTodaysRegister', 'ok');
        }, response => {
          this.selectTodaysRegisterKO();
          this.commonFunction.write('selectTodaysRegister', 'ko');
        });
      }

    private selectTodaysRegisterOK() {
        this.commonFunction.write('selectTodaysRegisterOK', '');
        for (let i = 0; i < this.responseGET.length; i++) {        
            this.id= this.responseGET[i][this.LABELSTUDENTID];
            this.depositions= this.responseGET[i][this.LABELTODAYDEPOSITIONS];
            this.meal= this.responseGET[i][this.LABELTODAYMEALS];
            this.nap= this.responseGET[i][this.LABELTODAYNAP];
            this.remarks= this.responseGET[i][this.LABELTODAYREMARKS];
            this.nameMeal= this.getMealName(this.meal.toString());
            this.nameNap= this.getNapName(this.nap.toString());
        }
        this.syncFile('save');
        this.firstLoad();
    }

    private selectTodaysRegisterKO() {
        this.commonFunction.write('badResponseGET', '');
    }

    public selectMeal(){
        (this.isSelectingMeal() === true) ? this.selectingMeal = false: this.selectingMeal = true;
     }
 
     public isSelectingMeal(){
       return this.selectingMeal;
     }   

     public selectNap(){
        (this.isSelectingNap() === true) ? this.selectingNap = false: this.selectingNap = true;
     }
 
     public isSelectingNap(){
       return this.selectingNap;
     }  
 


    /* ONFOCUS ONCLICK */
        
    public showLabel(field: string) {
        this.commonFunction.write('showLabel', field);
        switch(field) {        
          case this.LABELSTUDENTDNI:
          this.labelClassDni = 'inputcomp__label--activated';
          // TODO (this.$refs.dni as HTMLElement).focus();
          this.dniCorrect = false;
          break;
          case this.LABELSTUDENTNAME:
          this.labelClassName = 'inputcomp__label--activated';
          // TODO (this.$refs.dni as HTMLElement).focus();
          this.nameCorrect = false;
          break;
          case this.LABELSTUDENTSURNAME:
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
          case this.LABELSTUDENTDNI:
          if (!this.studentDni || this.studentDni === '') {
            this.labelClassDni = 'inputcomp__label';
          }
          if (this.commonFunction.validationChars(this.studentDni ? this.studentDni : '') &&
            !this.validationEmpty(this.studentDni ? this.studentDni : '')) {
            this.dniCorrect = true;
          }
          this.validateField(this.LABELSTUDENTDNI);
          break;
          case this.LABELSTUDENTNAME:
          if (!this.studentName || this.studentName === '') {
            this.labelClassName = 'inputcomp__label';
          }
          if (this.commonFunction.validationChars(this.studentName ? this.studentName : '') &&
            !this.validationEmpty(this.studentName ? this.studentName : '')) {
            this.nameCorrect = true;
          }
          this.validateField(this.LABELSTUDENTNAME);
          break;
          case this.LABELSTUDENTSURNAME:
          if (!this.studentSurname || this.studentSurname === '') {
            this.labelClassSurname = 'inputcomp__label';
          }
          if (this.commonFunction.validationChars(this.studentSurname ? this.studentSurname : '') &&
            !this.validationEmpty(this.studentSurname ? this.studentSurname : '')) {
            this.surnameCorrect = true;
          }
          this.validateField(this.LABELSTUDENTSURNAME);
          break;
          default:
          break;
        }
      }

  }