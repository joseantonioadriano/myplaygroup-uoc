import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import CAssignment from '../../classes/assignment.class';
import Dish from '../../types/dish.type';
import CGroup from '../../classes/group.class';
import CStudent from '../../classes/student.class';
import CommonFunction from '../../common/common-functions';
import CIntolerance from '../../classes/intolerance.class';
import { BaseComponent } from '../../module-base/views/base.component';
import { GroupService } from '../../services/group.service';
import { StudentService } from '../../services/student.service';
import { MenuService } from '../../services/menu.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { SessionService } from '../../services/session.service';
import { DishService } from '../../services/dish.service';
import Enrollment from 'src/app/types/enrollment.type';
import { Session } from 'protractor';
import { timingSafeEqual } from 'crypto';

@Component({
  selector: 'app-mainpane',
  templateUrl: './mainpane.component.html',
  styleUrls: ['../../module-base/views/base.component.scss']
})
export class MainpaneComponent extends BaseComponent {   

  groupsArray: CGroup[] = [];
  studentsGroupsArray: CStudent[] = [];
  enrollmentsArray: Enrollment[] = [];
  assignmentsArray: CAssignment[] = [];
  dishsArray: Dish[] = [];
  intolerancesArray: CIntolerance[] =[];

  public idStudent: number= 0;
  public completeNameStudent: string= '';
  public nameStudent: string= '';
  public surnameStudent: string= '';
  public studentSelected: CStudent;
  public studentsArray: CStudent[] = [];
  public selectingStudent: boolean= false;
  public age: number= 0;
  public depositions: number= 0;
  public naps: number= 0;
  public nameTutor: string= '';
  public nameGroup: string= '';
  public namePicture: string= '';

  public remarks: string= '';
  public meal: number = 0;
    
  private idTypeResponsable: number= 0;  

  private LABELID: string = 'id';
  private LABELDNI: string = 'dni';
  private LABELIDTYPE: string = 'idType';
  private LABELNAME: string = 'name';
  private LABELSURNAME: string = 'surname';
  private LABELRESPONSABLE1: string = 'idResponsable1';
  private LABELRESPONSABLE2: string = 'idResponsable2';
  private LABELSTUDENTSARRAY: string= 'studentsArray';
  private LABELFAVLANGUAGE: string= 'favouriteLang';
  private LABELIDSCHOOL: string = 'idSchool';  

  private LABELENROLLMENTID: string ='id';
  private LABELENROLLMENTIDSTUDENT: string ='idStudent';
  private LABELENROLLMENTIDCOURSE: string ='idCourse';
  private LABELENROLLMENTIDSCHOOL: string ='idSchool';
  private LABELENROLLMENTFEE: string ='fee';
  private LABELENROLLMENTNAMEPICTURE: string ='namePicture';
  private LABELENROLLMENTIDGROUP: string ='idGroup';
  private LABELSTUDENTID: string = 'id';

  private LABELTODAYDEPOSITIONS: string = 'depositions';
  private LABELTODAYMEALS: string = 'meals';
  private LABELTODAYNAP: string = 'nap';
  private LABELTODAYREMARKS: string = 'remarks';

  private LABELIDBREAKFAST: string = 'idBreakfast';
  private LABELIDSTARTER: string = 'idStarter';
  private LABELIDMAIN: string = 'idMain';
  private LABELIDDESSERT: string = 'idDessert';
  private LABELIDSNACK: string = 'idSnack';
  private LABELIDSTUDENT: string = 'idStudent';
  
  public TSUPERADMIN: number= 1;
  public TADMIN: number= 2;  
  public TTEACHER: number= 3;
  public TPSYCHOLOGIST: number= 4;
  public TPARENT: number= 5;
  public TDEMO: number= 99;

  private LABELNAMEDISH: string = 'name';
  private LABELBREAKFAST: number = 1;
  private LABELSTARTER: number = 2;
  private LABELMAIN: number = 3;
  private LABELDESSERT: number = 4;
  private LABELSNACK: number = 5;
  
  public nameBreakfast:string = '';
  public nameStarter:string = '';
  public nameMain:string = '';
  public nameDessert:string = '';
  public nameSnack:string = '';

  private groupService: GroupService;
  private studentService: StudentService;
  private enrollmentService: EnrollmentService;
  private menuService: MenuService;
  private dishService: DishService;
  private sessionService: SessionService;

  public commonFunction;
 

  constructor(private http: HttpClient, private router : Router){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor MainpaneComponent', '');
  }

  ngOnInit() {       
      this.commonFunction.write('ngOnInit', '');         
      this.selectParentDataFromSession();  
      this.groupService = new GroupService(this.http);
      this.studentService = new StudentService(this.http);
      this.enrollmentService = new EnrollmentService(this.http);
      this.menuService = new MenuService(this.http);
      this.dishService = new DishService(this.http);
      this.sessionService = new SessionService();      
      this.selectGroups();
      this.selectStudentsEnrolled();
      this.selectEnrollments();
      if (this.getUserType()==this.TPARENT) {
        this.selectTodaysRegister();      
      }
      this.selectTodaysMenu();
      this.selectDishes();      
  }   
  
  protected logData() {
    this.commonFunction.write('logData', '');
    this.commonFunction.write('logData', 'idStudent: ' + this.idStudent);
    this.commonFunction.write('logData', 'completeNameStudent: ' + this.completeNameStudent);
    this.commonFunction.write('logData', 'nameStudent: ' + this.nameStudent);
    this.commonFunction.write('logData', 'surnameStudent: ' + this.surnameStudent);
    this.commonFunction.write('logData', 'studentSelected: ' + this.studentSelected);
    this.commonFunction.write('logData', 'selectingStudent: ' + this.selectingStudent);
  }  

  public updateStudentSelected(){
    this.commonFunction.write('updateStudentSelected', '');    
    (this.studentSelected===null || this.studentSelected===undefined) ? null : this.selectDefaultStudent(this.studentSelected);    
  }

  public selectDefaultStudent(student: CStudent){
    this.commonFunction.write('selectDefaultStudent', '');
    this.idStudent= student.getId();
    this.nameStudent= student.getName();
    this.surnameStudent= student.getSurname();    
    this.completeNameStudent= this.nameStudent + ' ' + this.surnameStudent;
    this.nameTutor= this.commonFunction.getStorage('userLogged')['infoStudentArray'][this.getIndexStudentFromArrayInfoStudent(this.idStudent)]['nameTutor'];
    this.nameGroup= this.commonFunction.getStorage('userLogged')['infoStudentArray'][this.getIndexStudentFromArrayInfoStudent(this.idStudent)]['nameGroup'];
    this.age= this.commonFunction.getStorage('userLogged')['infoStudentArray'][this.getIndexStudentFromArrayInfoStudent(this.idStudent)]['age'];    
    this.namePicture= this.commonFunction.getStorage('userLogged')['infoStudentArray'][this.getIndexStudentFromArrayInfoStudent(this.idStudent)]['namePicture'];    
    this.reloadintolerances(this.idStudent);
    this.selectingStudent= false;    
    this.selectTodaysRegister();
    (student===null || student===undefined) ? null :this.commonFunction.setStorage('studentSelected', student);
  }

  public reloadintolerances(idStudent: number){   
    this.commonFunction.write('reloadintolerances', ''); 
    let found: boolean= false;
    this.intolerancesArray= [];
    for (let i = 0; i < this.commonFunction.getStorage('userLogged')['infoStudentArray'].length && !found; i++) {     
      if(idStudent===this.commonFunction.getStorage('userLogged')['infoStudentArray'][i]['id']){  
        for (let j = 0; j < this.commonFunction.getStorage('userLogged')['infoStudentArray'][i]['intolerances'].length; j++) {   
          this.intolerancesArray.push(new CIntolerance(this.commonFunction.getStorage('userLogged')['infoStudentArray'][i]['intolerances'][j]['id'],
                                                       this.commonFunction.getStorage('userLogged')['infoStudentArray'][i]['intolerances'][j]['name'],
                                                       0));
        }        
        found= true;
      }      
    }
  }

  public getIndexStudentFromArrayInfoStudent(idStudent: number){
    let found: boolean= false;
    let index: number= 0;
    for (let i = 0; i < this.commonFunction.getStorage('userLogged')['infoStudentArray'].length && !found; i++) {
      if(idStudent===this.commonFunction.getStorage('userLogged')['infoStudentArray'][i]['id']){
        found= true;
        index= i;
      }      
    }
    return index;
  }

  public multiStudents(){
    this.commonFunction.write('multiStudents', '');    
    let boolmultiStudents= false;
    (this.studentsArray.length>1) ? boolmultiStudents= true : null;
    return boolmultiStudents;
  }

  public getUserType(){  
    //this.commonFunction.write('getUserType', '');    
    return this.idTypeResponsable;
  }

  public selectParentDataFromSession() {        
    this.commonFunction.write('selectParentDataFromSession','');    
    this.idTypeResponsable= this.commonFunction.getStorage('userLogged')[this.LABELIDTYPE];
  }

  public selectStudentsFromSession(){
    this.commonFunction.write('selectStudentsFromSession','');
    for (let i = 0; i < this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY].length; i++) {
      if(this.isStudentEnrolled(this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELID])){
        let student: CStudent;
        student= new CStudent(this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELID],                               
                              this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELDNI],                          
                              this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELNAME],                                
                              this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELSURNAME], 
                              this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELRESPONSABLE1],
                              this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELRESPONSABLE2],
                              this.commonFunction.getStorage('userLogged')[this.LABELSTUDENTSARRAY][i][this.LABELIDSCHOOL], 
                              0,
                              '');
        (i===0) ? this.selectDefaultStudent(student) : null;
        this.studentsArray.push(student);
      }
    }
  }

  private isStudentEnrolled(idStudent: number){
    this.commonFunction.write('isStudentEnrolled', idStudent.toString());
    let found: boolean= false;
    console.log(this.studentsGroupsArray);
    for (let i = 0; i < this.studentsGroupsArray.length && !found; i++) {      
      if(this.studentsGroupsArray[i].getId()===idStudent){
        found= true;
      }
    }
    console.log(found);
    return found; 
  }
  

  public isUserLogged(){    
    //this.commonFunction.write('isUserLogged', '');    
    return !(this.commonFunction.getStorage('userLogged') === null);
  }

  public isSelectingStudent(){
    this.commonFunction.write('isSelectingStudent', '');    
    return this.selectingStudent;
  }    

  public selectStudent(){
    this.commonFunction.write('selectStudent', '');    
    (this.isSelectingStudent() === true) ? this.selectingStudent = false: this.selectingStudent = true;
  }
   
  public async selectStudentsEnrolled() {
    this.commonFunction.write('selectStudentsEnrolled', '');        
    this.studentService.getStudentsEnrolledService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
      console.log(response);          
      this.responseGET = response;
      this.selectStudentsEnrolledOK();
      this.commonFunction.write('selectStudentsEnrolled', 'ok');
    }, response => {
      this.selectStudentsEnrolledKO();
      this.commonFunction.write('selectStudentsEnrolled', 'ko');
    });
  }

  private selectStudentsEnrolledOK() {
    this.commonFunction.write('selectStudentsEnrolledOK', '');
    this.studentsGroupsArray= [];
    for (let i = 0; i < this.responseGET.length; i++) {
      this.studentsGroupsArray.push(new CStudent(
                                       this.responseGET[i][this.LABELID],
                                       this.responseGET[i][this.LABELDNI],
                                       this.responseGET[i][this.LABELNAME],
                                       this.responseGET[i][this.LABELSURNAME],
                                       this.responseGET[i][this.LABELRESPONSABLE1],
                                       this.responseGET[i][this.LABELRESPONSABLE2],
                                       this.responseGET[i][this.LABELIDSCHOOL],
                                       0, ''
                                    ));
      //this.showArray();
    }
    console.log(this.studentsGroupsArray);
    this.selectStudentsFromSession();     
    //this.sync('save');
    this.firstLoad();
  }
  
  private selectStudentsEnrolledKO() {
    this.commonFunction.write('badResponseGET', '');
  }  

  public async selectEnrollments() {
    this.commonFunction.write('selectEnrollments', '');        
    this.enrollmentService.getEnrollmentsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
      console.log(response);          
      this.responseGET = response;
      this.selectEnrollmentsOK();
      this.commonFunction.write('selectEnrollments', 'ok');
    }, response => {
      this.selectEnrollmentsKO();
      this.commonFunction.write('selectEnrollments', 'ko');
    });
  }

  private selectEnrollmentsOK() {
    this.commonFunction.write('selectEnrollmentsOK', '');
    this.enrollmentsArray= [];
    for (let i = 0; i < this.responseGET.length; i++) {
      this.enrollmentsArray.push({id:this.responseGET[i][this.LABELENROLLMENTID],
                                  idStudent: this.responseGET[i][this.LABELENROLLMENTIDSTUDENT],
                                  idCourse: this.responseGET[i][this.LABELENROLLMENTIDCOURSE],
                                  idSchool: this.responseGET[i][this.LABELENROLLMENTIDSCHOOL],
                                  fee: this.responseGET[i][this.LABELENROLLMENTFEE],
                                  namePicture: this.responseGET[i][this.LABELENROLLMENTNAMEPICTURE],
                                  idGroup: this.responseGET[i][this.LABELENROLLMENTIDGROUP]
                                    });
      //this.showArray();
    }
    //this.sync('save');
    this.firstLoad();
  }
  
  private selectEnrollmentsKO() {
    this.commonFunction.write('badResponseGET', '');
  }

  public async selectGroups() {
    this.commonFunction.write('selectGroups', '');        
    this.groupService.getGroupsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
      console.log(response);          
      this.responseGET = response;
      this.selectGroupOK();
      this.commonFunction.write('selectGroups', 'ok');
    }, response => {
      this.selectGroupKO();
      this.commonFunction.write('selectGroups', 'ko');
    });
  }

  private selectGroupOK() {
    this.commonFunction.write('selectGroupOK', '');
    this.groupsArray= [];
    for (let i = 0; i < this.responseGET.length; i++) {
      this.groupsArray.push(new CGroup(this.responseGET[i][this.LABELID],
                                       this.responseGET[i][this.LABELNAME],
                                       this.responseGET[i][this.LABELIDSCHOOL],
                                       0
                            ));
      //this.showArray();
    }
    //this.sync('save');
    this.firstLoad();
  }
  
  private selectGroupKO() {
    this.commonFunction.write('badResponseGET', '');
  }

  public studentInGroup(group: number, student: number){
    //this.commonFunction.write('studentInGroup', group.toString() + ' - ' + student.toString());    
    let found: boolean = false;
      for(let i= 0; i< this.enrollmentsArray.length && !found; i++){
        if(this.enrollmentsArray[i][this.LABELENROLLMENTIDSTUDENT] === student && this.enrollmentsArray[i][this.LABELENROLLMENTIDGROUP] === group){
            found= true;
        }
      }
    return found;
  }

  public groupHasStudents(group: number){
    //this.commonFunction.write('groupHasStudents', group.toString());    
    let found: boolean = false;
      for(let i= 0; i< this.enrollmentsArray.length && !found; i++){
        if(this.enrollmentsArray[i][this.LABELENROLLMENTIDGROUP] === group){
            found= true;
        }
      }
    return found;
  }

  public viewFile(idStudent: number){
    this.commonFunction.write('viewFile', idStudent.toString());
    this.commonFunction.setStorage('studentSelectedFile', idStudent.toString());
    this.router.navigateByUrl('file');
  }

  public async selectTodaysRegister() {
    this.commonFunction.write('selectTodaysRegister', '');        
    this.studentService.selectTodaysRegisterService(this.idStudent).subscribe((response: any) => {        
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
      this.depositions= 0;
      this.meal= 0;
      this.naps= 0;
      this.remarks= '';
      for (let i = 0; i < this.responseGET.length; i++) {        
          this.idStudent= this.responseGET[i][this.LABELSTUDENTID];
          this.depositions= this.responseGET[i][this.LABELTODAYDEPOSITIONS];
          this.meal= this.responseGET[i][this.LABELTODAYMEALS];
          this.naps= this.responseGET[i][this.LABELTODAYNAP];
          this.remarks= this.responseGET[i][this.LABELTODAYREMARKS];
      }
      //this.sync('save');
      //this.firstLoad();
  }

  private selectTodaysRegisterKO() {
      this.commonFunction.write('badResponseGET', '');
  }

  public getMealStudentGroup(typeMeal: number, idGroup: number, idStudent: number){
    let found: boolean= false;
    let meal: string= "";
    for(let i= 0; i< this.assignmentsArray.length && !found; i++){
        if (this.assignmentsArray[i][this.LABELENROLLMENTIDGROUP]===idGroup
            &&
            this.assignmentsArray[i][this.LABELENROLLMENTIDSTUDENT]===idStudent){
              found= true;
              switch(typeMeal){
                case this.LABELBREAKFAST:                  
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDBREAKFAST]);
                  break;
                case this.LABELSTARTER:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDSTARTER]);
                  break;
                case this.LABELMAIN:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDMAIN]);
                  break;
                case this.LABELDESSERT:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDDESSERT]);
                  break;
                case this.LABELSNACK:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDSNACK]);
                  break;
                default:
                  break;
              }              
        }
    }        
    if(meal.length>15){
      return meal.substr(0,15)+"..";
    } else {
      return meal;
    }
    
  }

  public getMealStudent(typeMeal: number){
    //this.commonFunction.write('getMealStudent', typeMeal + '_' + this.idStudent);
    let found: boolean= false;
    let meal: string= "";    
    for(let i= 0; i< this.assignmentsArray.length && !found; i++){      
        if (this.assignmentsArray[i][this.LABELENROLLMENTIDSTUDENT]===this.idStudent){
              found= true;
              switch(typeMeal){
                case this.LABELBREAKFAST:                  
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDBREAKFAST]);
                  break;
                case this.LABELSTARTER:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDSTARTER]);
                  break;
                case this.LABELMAIN:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDMAIN]);
                  break;
                case this.LABELDESSERT:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDDESSERT]);
                  break;
                case this.LABELSNACK:        
                  meal= this.searchNameDish(this.assignmentsArray[i][this.LABELIDSNACK]);
                  break;
                default:
                  break;
              }              
        }
    }        
    return meal;    
  }

 
    
    //TODO => FIND NAME DISH IN ARRAY FILLED BY 
    //selectDishes
/*
    if(this.commonFunction.getStorage('schoolDishes')==null){
      
    } else {

    }
*/
  


  private async selectDishes() {
    this.commonFunction.write('selectDish', '');        
    this.dishService.getDishesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
      console.log(response);          
      this.responseGET = response;
      this.selectDishesOK();
      this.commonFunction.write('selectDishes', 'ok');
    }, response => {
      this.selectDishesKO();
      this.commonFunction.write('selectDishes', 'ko');
    });
  }

  private selectDishesOK() {
    this.commonFunction.write('selectDishOK', '');
    for (let i = 0; i < this.responseGET.length; i++) {
      this.dishsArray.push({'id': this.responseGET[i][this.LABELID],
                          'name': this.responseGET[i][this.LABELNAME],
                          'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
    }
    //this.sync('save');
    this.firstLoad();
  }  

  private selectDishesKO() {
    this.commonFunction.write('badResponseGET', '');
  }


  public searchNameDish(idDish: number) {
    //this.commonFunction.write('searchNameDish', idDish.toString());         
    let found: boolean = false;
    let nameDish: string= '';
    for(let i= 0; i< this.dishsArray.length && !found; i++) {
      if(this.dishsArray[i][this.LABELENROLLMENTID] === idDish) {
        found= true;
        nameDish= this.dishsArray[i][this.LABELNAMEDISH];
      }
    }       
    return nameDish;
  }

  public assignmentInStudentInGroup(idGroup: number, idStudent: number){
    let found: boolean= false;
    for(let i= 0; i< this.assignmentsArray.length && !found; i++){
        if (this.assignmentsArray[i][this.LABELENROLLMENTIDGROUP]===idGroup
            &&
            this.assignmentsArray[i][this.LABELENROLLMENTIDSTUDENT]===idStudent){
              found= true;
        }
    }    
    return found;
  }

  public async selectTodaysMenu() {
    this.commonFunction.write('selectTodaysMenu', '');   
    console.log('idSchool: '+this.commonFunction.getStorage('userLogged')['idSchool'].toString());     
    this.menuService.selectTodayMenuService(this.commonFunction.getStorage('userLogged')['idSchool'].toString(), this.idStudent).subscribe((response: any) => {        
      console.log(response);          
      this.responseGET = response;
      this.selectTodaysMenuOK();
      this.commonFunction.write('selectTodaysMenuOK', 'ok');
    }, response => {
      this.selectTodaysMenuKO();
      this.commonFunction.write('selectTodaysMenuKO', 'ko');
    });
  }

  private selectTodaysMenuOK() {
      this.commonFunction.write('selectTodaysMenuOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {        
        this.assignmentsArray.push(new CAssignment(this.responseGET[i][this.LABELENROLLMENTIDGROUP],
                                                   this.responseGET[i][this.LABELIDSTUDENT],
                                                   this.responseGET[i][this.LABELIDBREAKFAST],
                                                   this.responseGET[i][this.LABELIDSTARTER],
                                                   this.responseGET[i][this.LABELIDMAIN],
                                                   this.responseGET[i][this.LABELIDDESSERT],
                                                   this.responseGET[i][this.LABELIDSNACK],
                                                   this.responseGET[i][this.LABELIDSCHOOL]
                                                  ));
      }
      //this.sync('save');
      //this.firstLoad();
  }

  private selectTodaysMenuKO() {
      this.commonFunction.write('badResponseGET', '');
  }

}