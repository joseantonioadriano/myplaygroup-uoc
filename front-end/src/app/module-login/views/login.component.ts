import { Router } from '@angular/router';
import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

//import Login from '../../types/login.type';
import CUser from '../../classes/user.class';
import CInfoStudent from '../../classes/infoStudent.class';
import CStudent from '../../classes/student.class';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-chat',
  templateUrl: './login.component.html',
  styleUrls: ['../../module-base/views/base.component.scss']
})
export class LoginComponent extends BaseComponent { 

  // ATTRIBUTES
  private id: number = 0;
  public username: string = '';
  public password: string = '';
  private name: string = '';
  private surname: string = '';
  private type: number = 0;
  private idSchool: number = 0;
  private nameSchool: string = '';
  private favouriteLang: number= 1;
  private activated: boolean = false;
  private lastConnection: Date = new Date();
  private studentsArray: CStudent [] = [];
  private schoolsArray: CSchool [] = [];
  private infoStudentsArray: CInfoStudent [] = [];

  // LABELS
  private LABELID: string = 'id';
  private LABELUSERNAME: string = 'username';
  private LABELPASSWORD: string = 'password';
  private LABELNAME: string = 'name';
  private LABELSURNAME: string = 'surname';
  private LABELtype: string = 'type';
  private LABELACTIVATED: string = 'activated';
  private LABELLASTCONNECTION: string = 'lastConnection';
  private LABELSTUDENTS: string = 'studentsArray';
  private LABELSCHOOLS: string = 'schoolsArray';
  private LABELFAVOURITELANGUAGE: string= 'favouriteLang';
  private LABELIDSCHOOL: string= 'idSchool';
  private LABELNAMESCHOOL: string= 'nameSchool';
  private LABELINFOSTUDENTS: string= 'infoStudentsArray';


  private loginFailed: boolean = false;

  protected commonFunction: CommonFunction;

  public usernameCorrect: boolean = false;

  private loginService: LoginService;  

  public labelClassUsername: string = 'inputcomp__label--activated';

    
  //LOGIN ATTRIBUTES
  public userLogged: boolean = false;
  public userType: number = 0;
  public userActivated: boolean = false;
  
  constructor(private http: HttpClient, private router : Router){
    super();
    this.commonFunction= new CommonFunction(); 
    this.commonFunction.write('constructor LoginComponent', '');    
  }

  ngOnInit() {       
    this.commonFunction.write('ngOnInit', '');
    this.loginService = new LoginService(this.http);
}    

  public login() {    
    this.commonFunction.write('logIn', 'username: ' + this.username + ' password: ' + this.password);    
    event.preventDefault(); // ==> Avoid default action for the submit button of the login form    
    this.loginService.tryLoginService(this.username, this.password).subscribe((response: any) => { // ==> Calls service to login user to the api rest
        console.log(response);            
        this.responseGET = response;    
        this.loginOK();
      }, error => {        
        console.error(error);        
        this.loginKO();        
      },
      () => this.loginFinished()
    );
  }

  private loginOK() {
    this.commonFunction.write('logInOK', '');       
    this.setLoginFailed(false);
    this.setUserLogged();
    this.setUserSession();
    this.setCurrentLanguage();
    this.logData();
    this.router.navigateByUrl('mainpane');
  }

  private setCurrentLanguage(){
    this.commonFunction.write('setCurrentLanguage', '');     
    this.commonFunction.setStorage('currentLanguage', this.favouriteLang);
  }

  private setUserLogged(){
    this.commonFunction.write('setUserLogged', '');     
    this.id= 0;
    this.username= this.responseGET[0][this.LABELUSERNAME];
    this.password= null;
    this.name= this.responseGET[0][this.LABELNAME];
    this.surname= this.responseGET[0][this.LABELSURNAME];
    this.type= this.responseGET[0][this.LABELtype];
    this.activated= this.responseGET[0][this.LABELACTIVATED];
    this.lastConnection= this.responseGET[0][this.LABELLASTCONNECTION];     
    this.favouriteLang= this.responseGET[0][this.LABELFAVOURITELANGUAGE];   
    this.idSchool= this.responseGET[0][this.LABELIDSCHOOL];   
    this.nameSchool= this.responseGET[0][this.LABELNAMESCHOOL];   
    (this.responseGET[0][this.LABELSTUDENTS]===null) ? null : this.copyStudents(this.responseGET[0][this.LABELSTUDENTS]);
    (this.responseGET[0][this.LABELSCHOOLS]===null) ? null : this.copySchools(this.responseGET[0][this.LABELSCHOOLS]);
    (this.responseGET[0][this.LABELINFOSTUDENTS]===null) ? null : this.copyInfoStudents(this.responseGET[0][this.LABELINFOSTUDENTS]);
  }

  private copyInfoStudents(infoStudents: CInfoStudent[]){
      this.infoStudentsArray= [];
      for(let i= 0; i< infoStudents.length; i++){
          this.infoStudentsArray.push(infoStudents[i]);
      }
    }

  private copyStudents(students: CStudent []){        
    this.studentsArray= [];
    for(let i= 0; i< students.length; i++){
        this.studentsArray.push(students[i]);
    }
  }

  private copySchools(schools: CSchool []){            
      this.schoolsArray= [];
      for(let i= 0; i< schools.length; i++){
          this.schoolsArray.push(schools[i]);
      }
  }  

  private setUserSession(){
    this.commonFunction.write('setUserSession', 'id: ' + this.id +
      ', username: ' + this.username + ', password: ' + this.password + ', type: ' + this.type
      + ', activated: ' + this.activated + ', lastConnection: ' + this.lastConnection + ', idSchool: ' + this.idSchool );    
    this.commonFunction.setStorage('userLogged', new CUser(this.id, this.username, this.password, this.name, this.surname, this.type, this.activated, 
                                                           this.lastConnection, this.studentsArray, this.schoolsArray, this.favouriteLang, this.idSchool, this.nameSchool,
                                                           this.infoStudentsArray));
  }
    
  private loginKO() {
    this.commonFunction.write('logInKO', '');        
    this.setLoginFailed(true);
    this.commonFunction.navigate('login');
  }

  private loginFinished() {
    this.commonFunction.write('loginFinished', '');    
  }

  private setLoginFailed(status: boolean){
    this.commonFunction.write('setLoginFailed', ''+status);    
    this.loginFailed= status;
  }

  public errorLogin(){
    //this.commonFunction.write('errorLogin', ''+this.loginFailed);    
    return this.loginFailed;
  }

  /* UTILITIES */

  protected logData() {
    this.commonFunction.write('logData', '');
    this.commonFunction.write('logData', 'id: ' + this.id);
    this.commonFunction.write('logData', 'index: ' + this.index);
    this.commonFunction.write('logData', 'username: ' + this.username);
    this.commonFunction.write('logData', 'password: ' + this.password);
    this.commonFunction.write('logData', 'name: ' + this.name);
    this.commonFunction.write('logData', 'surname: ' + this.surname);
    this.commonFunction.write('logData', 'idSchool: ' + this.idSchool);
    this.commonFunction.write('logData', 'nameSchool: ' + this.nameSchool);
    this.commonFunction.write('logData', 'type: ' + this.type.toString());
    this.commonFunction.write('logData', 'activated: ' + this.activated.toString());
    this.commonFunction.write('logData', 'lastConnection: ' + this.lastConnection.toString());
    this.commonFunction.write('logData', 'studentsArray: ' + this.studentsArray.toString());
    this.commonFunction.write('logData', 'schoolsArray: ' + this.schoolsArray.toString());
    this.commonFunction.write('logData', 'infoStudentsArray: ' + this.infoStudentsArray.toString());
    this.commonFunction.write('logData', 'maxId: ' + this.maxId);
  }  

  /* ONFOCUS ONCLICK */
    
  public showLabel(field: string) {
    this.commonFunction.write('showLabel', field);
    switch(field) {
      case this.LABELUSERNAME:
      this.labelClassUsername = 'inputcomp__label--activated';
      // TODO (this.$refs.password as HTMLElement).focus();
      this.usernameCorrect = false;
      break;       
      default:
      break;
    }
  }

  /* ONBLUR */

  public blurLabel(field: string) {
    this.commonFunction.write('blurLabel', field);
    switch (field) {
      case this.LABELUSERNAME:
      if (!this.username || this.username === '') {
        this.labelClassUsername = 'inputcomp__label';
      }
      if (this.commonFunction.validationChars(this.username ? this.username : '') &&
        !this.validationEmpty(this.username ? this.username : '')) {
        this.usernameCorrect = true;
      }
      this.validateField(this.LABELUSERNAME);
      break;
      default:
      break;
    }
  }



}