import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import User from '../../types/user.type';
import CPsychologist from '../../classes/psychologist.class';
import CTeacher from '../../classes/teacher.class';
import CParent from '../../classes/parent.class';
import CSchool from '../../classes/school.class';
import CommonFunction from '../../common/common-functions';
import { TeacherService } from '../../services/teacher.service';
import { BaseComponent } from '../../module-base/views/base.component';
import { UserService } from '../../services/user.service';
import { PsychologistService } from '../../services/psychologist.service';
import { SchoolService } from '../../services/school.service';
import { ParentService } from '../../services/parent.service';
import { SessionService } from '../../services/session.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class UserComponent extends BaseComponent {
    
    usersArray: User[] = [];
    teachersArray: CTeacher[] = [];    
    psychologistsArray: CPsychologist[] = [];    
    parentsArray: CParent[] = [];  
    schoolsArray: CSchool[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public username:string = '';    
    public password:string = '';    
    public idType: number= 0;
    public nameType:string = '';
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;    
    public idTutor: number = 0;
    public nameTutor:string = '';
    public idPsychologist: number = 0;
    public namePsychologist:string = '';
    public idParent: number = 0;
    public nameParent:string = '';
      
    public typeSelected: number= 0;
    public selectingType: boolean= false;
    public selectingSchool: boolean= false;

    // CLASSES
    public labelClassUsername: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';     
    
    // BOOLEANS FOR ERROR CONTROLS    
    // DNI
    public dniEmptyError: boolean = false;
    public dniCorrect: boolean = false;
    public dniNotCharError: boolean = false;
    // NAME
    public usernameEmptyError: boolean = false;
    public usernameCorrect: boolean = false;
    public usernameNotCharError: boolean = false;
      
    // MESSAGE    
    public errorMSGLogin: string = 'Please introduce a value';
    public errorMSGDni: string = 'Please introduce a dni';
    public errorMSGName: string = 'Please introduce a name';
      
    // SEARCHS
    public inputSearchLogin: string = '';
    public inputSearchDni: string = '';
    public inputSearchUsername: string = '';
    public inputSearchSurname: string = '';    
    
    // LABELS
    private LABELID: string = 'id';    
    private LABELUSERNAME: string = 'username';    
    private LABELPASSWORD: string = 'password';
    private LABELIDSCHOOL: string = 'idSchool';
    private LABELNAMESCHOOL: string = 'name';
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELIDTYPE: string = 'idType';    
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';

    private LABELTEACHERID: string = 'id';
    private LABELTEACHERNAME: string = 'name';
    private LABELTEACHERSURNAME: string = 'surname';
    private LABELTEACHERIDSCHOOL: string = 'idSchool';
    private LABELIDTUTOR: string = 'idTutor';     
    private LABELNAMETUTOR: string = 'name';
    private LABELSURNAMETUTOR: string = 'surname';
    private LABELTYPEID: string = 'type';

    private userService: UserService;
    private schoolService: SchoolService;
    public sessionService: SessionService;
    private teacherService: TeacherService;
    private parentService: ParentService;
    private psychologistService: PsychologistService;

    public selectingTutor: boolean= false;    
    public selectingParent: boolean= false;    
    public selectingPsychologist: boolean= false;    

    //password
    private passwordSize: number=	9; 
    private charGet: number=	0;
    private temporaryChar: string=	'';    
    private arrayChars =	new Array();            
    private finalPassword: string	=	'';
    private minLetMin: number=	1;			
    private minLetCap: number=	1;			
    private minNum: number=	1;
    private minSym: number=	1;
    private lettersMinGet: number=0;
    private	lettersCapGet: number= 0;
    private	numbersGet: number= 0;
    private	symbolsGet: number= 0;

    public tutorSelected: CTeacher;
    public psychologistSelected: CPsychologist;
    public parentSelected: CParent;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor UserComponent', '');
      this.sessionService= new SessionService();
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.userService = new UserService(this.http);
        this.teacherService = new TeacherService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.psychologistService= new PsychologistService(this.http);
        this.parentService= new ParentService(this.http);
        this.loadConf();
        this.selectUser();
        this.selectTeachers();
        this.selectPsychologists();
        this.selectParents();
        this.initializeArray();                  
    }    

    private initializeArray(){
      for(var i = 0; i < this.passwordSize; i++){		
        this.arrayChars[i]	=	null;
      }
    }   

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELUSERNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.usersArray[position][field]!=null){
        switch(field) {
            case this.LABELUSERNAME:
              return (this.usersArray[position][field].toUpperCase().search(this.inputSearchUsername.toUpperCase()) > -1);
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
      this.commonFunction.write('filterList', 'this.inputSearchName:' + this.inputSearchUsername);
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
    
    private async selectUser() {
      this.commonFunction.write('selectUser', '');        
      this.userService.getUsersService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectUserOK();
        this.commonFunction.write('getUsers', 'ok');
      }, response => {
        this.selectUserKO();
        this.commonFunction.write('getUsers', 'ko');
      });
    }

    private updateUser(index: number) {
      this.commonFunction.write('updateUser', 'index:' + index.toString() + ', id: '
      + this.usersArray[index][this.LABELID].toString() + ', username: '
      + this.usersArray[index][this.LABELUSERNAME].toString() + ', password: '
      + this.usersArray[index][this.LABELPASSWORD].toString() + ', type: '  
      + this.usersArray[index][this.LABELIDTYPE].toString() + ', idSchool: ' 
      + this.usersArray[index][this.LABELIDSCHOOL].toString());
      this.userService.updateUserService(this.id, this.username).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateUserOK(index);
      }, response => {
        this.updateUserKO();
      });
    }

    public deleteUser(index: number) {
      this.commonFunction.write('deleteUser', index.toString() + ' with id: ' + this.usersArray[index][this.LABELID]);
      this.userService.deleteUserService(this.usersArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteUserOK(index);
      }, response => {
        this.deleteUserKO();
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
      this.syncUsers('save');      
    }

    private insertUser(user: User) {
      const index: number = user.id;
      this.commonFunction.write('insertUser', 'index:' + index.toString() + ', dni: '
      + this.usersArray[index][this.LABELUSERNAME].toString() + ', password: '
      + this.usersArray[index][this.LABELPASSWORD].toString() +  + ', type: '  
      + this.usersArray[index][this.LABELIDTYPE].toString() + ', idSchool'
      + this.usersArray[index][this.LABELIDSCHOOL].toString()
      );
      let idElement: number= 0;      
      if(this.selectingTutor==true) {
        idElement= this.tutorSelected.getId();
      }
      if(this.selectingPsychologist==true) {
        idElement= this.psychologistSelected.getId();
      }
      if(this.selectingParent==true) {
        idElement= this.parentSelected.getId();
      }
      this.userService.insertUserService(this.username, this.password, this.idType, this.idSchool, idElement).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertUser', 'Register created with id: ' + response.newId);
        this.usersArray[index][this.LABELID] = response.newId;
        this.insertUserOK(this.usersArray[index][this.LABELID]);
      }, response => {
        this.selectUserKO();
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

    private selectUserOK() {
      this.commonFunction.write('selectUserOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.usersArray.push({'id': this.responseGET[i][this.LABELID],
                                'username': this.responseGET[i][this.LABELUSERNAME],
                                'password': this.responseGET[i][this.LABELPASSWORD],
                                'idType':     this.responseGET[i][this.LABELIDTYPE],
                                'idSchool': this.responseGET[i][this.LABELIDSCHOOL]});
      }
      this.syncUsers('save');
      this.firstLoad();
    }

    private updateUserOK(index: number) {
      this.commonFunction.write('updateUserOK', index.toString());
      this.setUpdating(false);
      this.syncUsers('save');
    }

    private deleteUserOK(index: number) {
      this.commonFunction.write('deleteUserOK', 'User deleted from DB, deleting from array now..');
      this.usersArray.splice(index, 1);
      this.syncUsers('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertUserOK(index: number) {
      this.commonFunction.write('insertUserOK', index.toString());
      this.syncUsers('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectUserKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateUserKO() {
      this.commonFunction.write('updateUserKO', 'Error updating user in DB');
      this.setUpdating(false);
    }

    private deleteUserKO() {
      this.commonFunction.write('deleteUserKO', 'Error deleting user from DB');
    }

    private insertUserKO() {
      this.commonFunction.write('insertUserKO', 'Error inserting user in DB');
    }

    /* LOADS */

    private loadUsers() {
      this.commonFunction.write('loadUsers', '');
      this.selectUser();
    }


    private loadArrayUsers() {
      this.commonFunction.write('loadArrayUsers', '');
      /* TODO
      for (var i= 0; i<userModule.usersArray.length; i++) {
        this.usersArray.push(userModule.usersArray[i]);
      }
      */
    }

    protected loadFieldsValidate() {
      this.commonFunction.write('loadFieldsValidate', '');
      this.loadFieldValidate(this.LABELUSERNAME);
    }   

    /* RESETS */    

    protected resetFormFields(){
      this.commonFunction.write('resetFormFields', '');
      this.id = 0;
      this.username = '';
      this.password = '';
      this.idType= 0;
      this.idSchool = 0;
      this.nameType= '';
      this.typeSelected= null;
      this.selectingType= false;
      this.schoolSelected= null;
      this.selectingSchool= false;
      this.parentSelected= null;
      this.selectingParent= false;
      this.tutorSelected= null;
      this.selectingTutor= false;
      this.psychologistSelected= null;
      this.selectingPsychologist= false;
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
      this.commonFunction.write('logData', 'username: ' + this.username);
      this.commonFunction.write('logData', 'password: ' + this.password);
      this.commonFunction.write('logData', 'idSchool: ' + this.idSchool);
      this.commonFunction.write('logData', 'idType: ' + this.idType);
      this.commonFunction.write('logData', 'maxId: ' + this.maxId);
    }


    /* VALIDATIONS */
    
    protected validateField(field: string) {
      this.commonFunction.write('validateField', field);
      switch(field) {
        case this.LABELUSERNAME:
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
          case this.LABELUSERNAME:
            if (this.validationEmpty(this.username ? this.username : '')) {
              this.errorEnrity(false);
              this.setFieldEmpty(this.LABELUSERNAME, false);
            } else {
              this.deleteFieldEspaces(this.LABELUSERNAME);
              this.setFieldEmpty(this.LABELUSERNAME, true);
            }
            break;            
        default:
          break;
      }
    }

    protected validateFieldChars(field: string) {
      this.commonFunction.write('validateFieldChars', field);
      switch(field) {
          case this.LABELUSERNAME:
            if (!this.commonFunction.validationChars(this.username ? this.username : '')) {
              this.errorEnrity(true);
              this.setFieldChar(this.LABELUSERNAME, false);
            } else {
                this.setFieldChar(this.LABELUSERNAME, true);
            }
            break;
        default:
          break;
      }
    }

    protected deleteFieldEspaces(field: string) {
      this.commonFunction.write('deleteFieldEspaces', field);
      switch (field) {
          case this.LABELUSERNAME:
            if (this.username !== undefined) {
              this.username = this.username.trim();
              this.username = this.username.replace(/ +/g, ' ');
            }
            break;
        default:
          break;
      }
    }

    protected deleteEspaces() {
      this.commonFunction.write('deleteAllEspaces', '');
    }
       
    protected getNumEntity() {
      this.commonFunction.write('getNumEntity', this.usersArray.length.toString());
      return this.usersArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewUser() {
      this.commonFunction.write('addNewUser', '');
      this.resetForm();
      this.activateMode('form');
      this.generatePassword();
    }

    private syncUsers(option: string) {
      this.commonFunction.write('syncUsers', option);
      if (option === 'save') {
        // TODO
        // userModule.setusersArray(this.usersArray);        
      } else if (option === 'load') {
        this.loadArrayUsers();
        this.maxId = this.usersArray.length;
      }
      this.commonFunction.write('syncUsers', option + ' finished');
    }

    public addUser() {
      this.commonFunction.write('addUser', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addUser', 'validateUser === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addUser', 'isUpdating === true');
          this.usersArray[this.index][this.LABELID] = this.id;
          this.usersArray[this.index][this.LABELUSERNAME] = this.username;
          this.usersArray[this.index][this.LABELPASSWORD] = this.password;
          
          this.isSelectingType()=== true ? 
            this.idType = this.typeSelected : null;
          this.usersArray[this.index][this.LABELIDTYPE] = this.idType;      
          
          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.usersArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          

          this.updateUser(this.index);
        } else {
          this.commonFunction.write('addUser', 'isUpdating === false');
          this.maxId++;
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();
          this.idType = this.typeSelected;          
          const user: User = { id: this.usersArray.length,
            username: this.username, password: this.password, idType: this.idType, idSchool: this.idSchool};
          this.usersArray.push(user);
          this.insertUser(user);
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


    public modifyUser(index: number) {
      this.commonFunction.write('modifyUser', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.usersArray[index][this.LABELID];
      this.username = this.usersArray[index][this.LABELUSERNAME];
      this.password = this.usersArray[index][this.LABELPASSWORD];
      this.idType = this.usersArray[index][this.LABELIDTYPE];                  
      this.idSchool= this.usersArray[index][this.LABELIDSCHOOL];      
      this.nameType =this.searchNameType(this.idType);
      this.searchNameTutor(this.idTutor);
      this.searchNameSchool(this.idSchool);      
      this.logData();
      this.activateMode('form');
      this.resetErrors();
    }       

    private searchNameType(idType: number) {
      this.commonFunction.write('searchNameType', idType.toString());
      switch(idType.toString())
      {
        case '2':
          return 'Admin';
          break;          
        case '3':
          return 'Teacher';
          break;
        case '4':
          return 'Psychologist';
          break;
        case '5':
          return 'Responsable';
          break;
        default:                   
          break;
      }      
    }

    /* SET BOOLEANS VALIDATIONS */

    private setFieldChar(field: string, valide: boolean) {
    this.commonFunction.write('setFieldChar', field + ' ' + valide.toString());
    switch (field) {
      case this.LABELUSERNAME:
      if (valide === false) {
        this.usernameCorrect = false;
        this.usernameNotCharError = true;
      } else {
        this.usernameCorrect = true;
        this.usernameNotCharError = false;
      }
      break;
      default:
      break;
    }
    }

    private setFieldEmpty(field: string, valide: boolean) {
    this.commonFunction.write('setFieldEmpty', field + ' ' + valide.toString());
    switch(field) {
      case this.LABELUSERNAME:
      if (valide === false) {
        this.usernameCorrect = false;
        this.usernameEmptyError = true;
      } else {
        this.usernameCorrect = true;
        this.usernameEmptyError = false;
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
        case this.LABELUSERNAME:
        this.labelClassUsername = 'inputcomp__label--activated';
        // TODO (this.$refs.dni as HTMLElement).focus();
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
          this.dniCorrect = true;
        }
        this.validateField(this.LABELUSERNAME);
        break;
        default:
        break;
      }
    }

			private generateRandom(infNumber, supNumber) {
        //this.commonFunction.write('generateRandom', infNumber + '-' + supNumber);
			    let randomNumber  =   Math.floor((Math.random() * (supNumber - infNumber + 1)) + infNumber);
			    return  randomNumber;
			}

      private generateChar(charType){
        //this.commonFunction.write('generateChar', charType);
				let charList	=	'$+=?@_23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
				let charGenerated	=	'';
				let infVal		=	0;
				let supVal		=	0;
 
				switch (charType){
					case 'minuscule':
						infVal	=	38;
						supVal	=	61;
						break;
					case 'capital':
						infVal	=	14;
						supVal	=	37;
						break;
					case 'number':
						infVal	=	6;
						supVal	=	13;
						break;
					case 'symbol':	
						infVal	=	0;
						supVal	=	5;
						break;
					case 'random':
						infVal	=	0;
						supVal	=	61;
 
				}
 
				charGenerated	=	charList.charAt(this.generateRandom(infVal, supVal));
				return charGenerated;
			}

      private saveCharRandomPos(charPassedByParms){
        //this.commonFunction.write('saveCharRandomPos', charPassedByParms);
				let savedEmptyPosition: boolean	=	false;
				let positionInArray			=	0;
 
				while(savedEmptyPosition	!=	true){
					positionInArray	=	this.generateRandom(0, this.passwordSize-1);

          if(this.arrayChars[positionInArray] == null){
						this.arrayChars[positionInArray]	=	charPassedByParms;
						savedEmptyPosition=	true;
					}
				}
			}
 
			private generatePassword(){ 
        //this.commonFunction.write('generatePassword', '');
        this.finalPassword= '';
        this.lettersMinGet= 0;
        this.lettersCapGet= 0;
        this.numbersGet= 0;
        this.symbolsGet= 0;
        this.charGet= 0;
        this.arrayChars= [];

				while (this.lettersMinGet < this.minLetMin){
					this.temporaryChar	=	this.generateChar('minuscule');
					this.saveCharRandomPos(this.temporaryChar);
					this.lettersMinGet++;
					this.charGet++;
				}
 
				while (this.lettersCapGet < this.minLetCap){
					this.temporaryChar	=	this.generateChar('capital');
					this.saveCharRandomPos(this.temporaryChar);
					this.lettersCapGet++;
					this.charGet++;
				}
 
				while (this.numbersGet < this.minNum){
					this.temporaryChar	=	this.generateChar('number');
					this.saveCharRandomPos(this.temporaryChar);
					this.numbersGet++;
					this.charGet++;
				}
 
				while (this.symbolsGet < this.minSym){
					this.temporaryChar	=	this.generateChar('symbol');
					this.saveCharRandomPos(this.temporaryChar);
					this.symbolsGet++;
					this.charGet++;
				}

				while (this.charGet < this.passwordSize){
					this.temporaryChar	= this.generateChar('random');
					this.saveCharRandomPos(this.temporaryChar);
					this.charGet++;
				}
 
				for(var i=0; i < this.arrayChars.length; i++){
					this.finalPassword	=	this.finalPassword + this.arrayChars[i];
				}
 
        this.password= this.finalPassword;
      }
      
      public isSuperadmin(){
        return this.sessionService.isUserSuperadmin();
      }

      public reloadTeachers(){
        this.commonFunction.write('reloadTeachers', '');
        (this.selectingSchool === true) ? this.idSchool = this.schoolSelected.getId() : null;
        //this.selectTeachersBySchool();
        this.selectingTutor= true;
      }

      public reloadParents(){
        this.commonFunction.write('reloadParents', '');
        (this.selectingParent === true) ? this.idSchool = this.schoolSelected.getId() : null;
        //this.selectTeachersBySchool();
        this.selectingParent= true;
      }

      public reloadPsychologists(){
        this.commonFunction.write('reloadPsychologists', '');
        (this.selectingSchool === true) ? this.idSchool = this.schoolSelected.getId() : null;
        //this.selectTeachersBySchool();
        this.selectingTutor= true;
      }   

     public selectTutor(){
        (this.isSelectingTutor() === true) ? this.selectingTutor = false: this.selectingTutor = true;
        this.reloadTeachers();
     }
 
     public isSelectingTutor(){
       return this.selectingTutor;
     }

     public selectPsychologist(){
      (this.isSelectingPsychologist() === true) ? this.selectingPsychologist = false: this.selectingPsychologist = true;
      this.reloadPsychologists();
      }

      public isSelectingPsychologist(){
        return this.selectingPsychologist;
      }

      public selectParent(){
        (this.isSelectingParent() === true) ? this.selectingParent = false: this.selectingParent = true;
        this.reloadParents();
     }
 
     public isSelectingParent(){
       return this.selectingParent;
     }

     public async selectTeachers() {
      this.commonFunction.write('selectTeachers', '');        
      this.teacherService.getTeachersNoUserService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectTeacherOK();
        this.commonFunction.write('selectTeachers', 'ok');
      }, response => {
        this.selectTeacherKO();
        this.commonFunction.write('selectTeachers', 'ko');
      });
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
      this.syncUsers('save');      
    }
    
    private selectTeacherKO() {
      this.commonFunction.write('selectTeacherKO', '');
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

    
    private searchNameTutorOK() {
      this.commonFunction.write('searchNameTutorOK', '');
      this.nameTutor= this.responseGET[0][this.LABELSURNAMETUTOR] + ', ' + this.responseGET[0][this.LABELNAMETUTOR];
    }

    private searchNameTutorKO() {
      this.commonFunction.write('searchNameTutorKO', '');
    }


    public async selectPsychologists() {
      this.commonFunction.write('selectPsychologists', '');        
      this.psychologistService.getPsychologistsNoUserService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectPsychologistsOK();
        this.commonFunction.write('selectPsychologists', 'ok');
      }, response => {
        this.selectPsychologistsKO();
        this.commonFunction.write('selectPsychologists', 'ko');
      });
    }    

    private selectPsychologistsOK() {
      this.commonFunction.write('selectPsychologistsOK', '');
      this.psychologistsArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.psychologistsArray.push(new CPsychologist(
                                             this.responseGET[i][this.LABELTEACHERID], 
                                             this.responseGET[i][this.LABELTEACHERSURNAME] + ', ' + this.responseGET[i][this.LABELTEACHERNAME], 
                                             this.responseGET[i][this.LABELTEACHERSURNAME],
                                             this.responseGET[i][this.LABELTEACHERIDSCHOOL]))
      }   
      this.syncUsers('save');      
    }

    
    private selectPsychologistsKO() {
      this.commonFunction.write('selectPsychologistsKO', '');
    }


    public async searchNamePsychologist(idTutor: number) {
      this.commonFunction.write('searchNamePsychologist', '');        
      this.psychologistService.getPsychologistByIdService(idTutor).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNamePsychologistOK();
        this.commonFunction.write('searchNamePsychologist', 'ok');
      }, response => {
        this.searchNamePsychologistKO();
        this.commonFunction.write('searchNamePsychologist', 'ko');
      });
    }

    
    private searchNamePsychologistOK() {
      this.commonFunction.write('searchNamePsychologistOK', '');
      this.nameTutor= this.responseGET[0][this.LABELSURNAMETUTOR] + ', ' + this.responseGET[0][this.LABELNAMETUTOR];
    }

    private searchNamePsychologistKO() {
      this.commonFunction.write('searchNamePsychologistKO', '');
    }



    public async selectParents() {
      this.commonFunction.write('selectParents', '');        
      this.parentService.getParentsNoUserService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectParentsOK();
        this.commonFunction.write('selectParents', 'ok');
      }, response => {
        this.selectParentsKO();
        this.commonFunction.write('selectParents', 'ko');
      });
    }    

    private selectParentsOK() {
      this.commonFunction.write('selectParentsOK', '');
      this.parentsArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.parentsArray.push(new CParent(this.responseGET[i][this.LABELTEACHERID], 
                                           this.responseGET[i][this.LABELTEACHERSURNAME] + ', ' + this.responseGET[i][this.LABELTEACHERNAME], 
                                           this.responseGET[i][this.LABELTEACHERSURNAME],
                                           this.responseGET[i][this.LABELTYPEID], 
                                           this.responseGET[i][this.LABELTEACHERIDSCHOOL]))
      }   
      this.syncUsers('save');      
    }

    
    private selectParentsKO() {
      this.commonFunction.write('selectParentsKO', '');
    }


    public async searchNameParent(idTutor: number) {
      this.commonFunction.write('searchNameParent', '');        
      this.parentService.getParentByIdService(idTutor).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNameParentOK();
        this.commonFunction.write('searchNameParent', 'ok');
      }, response => {
        this.searchNameParentKO();
        this.commonFunction.write('searchNameParent', 'ko');
      });
    }

    
    private searchNameParentOK() {
      this.commonFunction.write('searchNameParentOK', '');
      this.nameTutor= this.responseGET[0][this.LABELSURNAMETUTOR] + ', ' + this.responseGET[0][this.LABELNAMETUTOR];
    }

    private searchNameParentKO() {
      this.commonFunction.write('searchNameParentKO', '');
    }

    public changeTypeSelecting(){
      switch(this.typeSelected){
        case 3: 
          this.selectingTutor= true;
          this.selectingPsychologist= false;
          this.selectingParent= false;
          break;
        case 4: 
          this.selectingTutor= false;
          this.selectingPsychologist= true;
          this.selectingParent= false;
          break;
        case 5: 
          this.selectingTutor= false;
          this.selectingPsychologist= false;
          this.selectingParent= true;
          break;
      }
    }

  }