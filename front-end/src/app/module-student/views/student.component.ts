import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CIntolerance from '../../classes/intolerance.class';
import Student from '../../types/student.type';
import CommonFunction from '../../common/common-functions';
import CParent from '../../classes/parent.class';
import CSchool from '../../classes/school.class';
import { BaseComponent } from '../../module-base/views/base.component';
import { StudentService } from '../../services/student.service';
import { ParentService } from '../../services/parent.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';
import { IntoleranceService } from '../../services/intolerance.service';

@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class StudentComponent extends BaseComponent {
    
    studentsArray: Student[] = [];
    intolerancesArray: CIntolerance[] = [];
    responsablesArray: CParent[] = [];
    schoolsArray: CSchool[] = [];
    intolerancesStudentArray: CIntolerance[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public dni:string = '';
    public name:string = '';
    public surname:string = '';    
    public idResponsable1: number = 0;
    public nameResponsable1:string = '';
    public responsable1Selected: CParent;
    public idResponsable2: number = 0;
    public nameResponsable2:string = '';
    public responsable2Selected: CParent;
    public idSchool: number = 0;
    public nameSchool:string = '';
    public schoolSelected: CSchool;

    public daySelected: number= 0;
    public monthSelected: number= 0;
    public yearSelected: number= 0;
    public genreSelected: number= 0;
    public dateBirth: string= '';
    public genreName: string= '';
      
    // CLASSES
    public labelClassDni: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassSurname: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';     
    
    public selectingResponsable1: boolean= false;
    public selectingResponsable2: boolean= false;
    public selectingDateBirth: boolean= false;
    public selectingSchool: boolean= false;
    public selectingGenre: boolean= false;
    public selectedIntolerance: CIntolerance;

    private intoleranceService: IntoleranceService;
    
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
    private LABELIDRESPONSABLE1: string = 'idResponsable1';
    private LABELNAMERESPONSABLE1: string = 'name';
    private LABELSURNAMERESPONSABLE1: string = 'surname';  
    private LABELIDSCHOOL: string = 'idSchool';  
    private LABELNAMESCHOOL: string = 'name';    
    private LABELNAMEKINDERGARTEN: string = 'nameKindergarten';
    private LABELRESPONSABLEID: string = 'id';
    private LABELRESPONSABLENAME: string = 'name';
    private LABELRESPONSABLESURNAME: string = 'surname';
    private LABELRESPONSABLETYPE: string = 'idType';
    private LABELIDRESPONSABLE2: string = 'idResponsable2';
    private LABELNAMERESPONSABLE2: string = 'name';
    private LABELSURNAMERESPONSABLE2: string = 'surname';    
    private LABELSCHOOLID: string = 'id';
    private LABELSCHOOLNAME: string = 'name';
    private LABELSCHOOLKINDERGARTENNAME: string = 'nameKindergarten';
    private LABELGENRE: string = 'genre';
    private LABELDATEBIRTH: string = 'dateBirth';

    private studentService: StudentService;
    private parentService: ParentService;
    private schoolService: SchoolService;
    public sessionService: SessionService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor StudentComponent', '');           
      this.sessionService= new SessionService();       
      this.intoleranceService= new IntoleranceService(http);
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.studentService = new StudentService(this.http);
        this.parentService = new ParentService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.loadConf();
        this.selectStudent();
        this.selectResponsables();
        this.selectSchools();
        this.selectIntolerance();
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
      if(this.studentsArray[position][field]!=null){
        switch(field) {
          case this.LABELDNI:
            return (this.studentsArray[position][field].toUpperCase().search(this.inputSearchDni.toUpperCase()) > -1);
            break;
            case this.LABELNAME:
              return (this.studentsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
              break;
              case this.LABELSURNAME:
                return (this.studentsArray[position][field].toUpperCase().search(this.inputSearchSurname.toUpperCase()) > -1);
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
    
    private async selectStudent() {
      this.commonFunction.write('selectStudent', '');        
      this.studentService.getStudentsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectStudentOK();
        this.commonFunction.write('getStudents', 'ok');
      }, response => {
        this.selectStudentKO();
        this.commonFunction.write('getStudents', 'ko');
      });
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
      this.syncStudents('save');      
    }

    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }


    private updateStudent(index: number) {
      this.commonFunction.write('updateStudent', 'index:' + index.toString() + ', id: '
      + this.studentsArray[index][this.LABELID].toString() + ', dni: '
      + this.studentsArray[index][this.LABELDNI].toString() + ', name: '
      + this.studentsArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.studentsArray[index][this.LABELSURNAME].toString() + ', idResponsable1: ' 
      + this.studentsArray[index][this.LABELIDRESPONSABLE1].toString() + ', idResponsable2: ' 
      + this.studentsArray[index][this.LABELIDRESPONSABLE2].toString() + ', idSchool: ' 
      + this.studentsArray[index][this.LABELIDSCHOOL].toString());
      this.studentService.updateStudentService(this.id, this.dni, this.name, this.surname, this.idResponsable1, this.idResponsable2, this.idSchool, 
                                               this.genreSelected, this.daySelected + '/' + this.monthSelected + '/' + this.yearSelected).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateStudentOK(index);
      }, response => {
        this.updateStudentKO();
      });
    }

    public deleteStudent(index: number) {
      this.commonFunction.write('deleteStudent', index.toString() + ' with id: ' + this.studentsArray[index][this.LABELID]);
      this.studentService.deleteStudentService(this.studentsArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteStudentOK(index);
      }, response => {
        this.deleteStudentKO();
      });
    }

    private insertStudent(student: Student) {
      const index: number = student.id;
      this.commonFunction.write('insertStudent', 'index:' + index.toString() + ', dni: '
      + this.studentsArray[index][this.LABELDNI].toString() + ', name: '
      + this.studentsArray[index][this.LABELNAME].toString() + ', surname: '  
      + this.studentsArray[index][this.LABELSURNAME].toString() + ', idResponsable1: ' 
      + this.studentsArray[index][this.LABELIDRESPONSABLE1].toString() + ', idResponsable2: ' 
      + this.studentsArray[index][this.LABELIDRESPONSABLE2].toString() + ', idSchool: '
      + this.studentsArray[index][this.LABELIDSCHOOL].toString());
      let stringIdFromArray: string = this.getStringIdFromArray();
      this.studentService.insertStudentService(this.dni, this.name, this.surname, this.idResponsable1, this.idResponsable2, this.idSchool, stringIdFromArray, 
                                               this.genreSelected, this.daySelected + '/' + this.monthSelected + '/' + this.yearSelected).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertStudent', 'Register created with id: ' + response.newId);
        this.studentsArray[index][this.LABELID] = response.newId;
        //this.saveintolerancesToStudent(this.index, response.newId, this.getStringIdFromArray());
        this.insertStudentOK(this.studentsArray[index][this.LABELID]);
      }, response => {
        this.selectStudentKO();
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

    private selectStudentOK() {
      this.commonFunction.write('selectStudentOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.studentsArray.push({'id': this.responseGET[i][this.LABELID],
                                'dni': this.responseGET[i][this.LABELDNI],
                                'name': this.responseGET[i][this.LABELNAME],
                                'surname': this.responseGET[i][this.LABELSURNAME],
                                'idResponsable1': this.responseGET[i][this.LABELIDRESPONSABLE1],
                                'idResponsable2': this.responseGET[i][this.LABELIDRESPONSABLE2],
                                'idSchool': this.responseGET[i][this.LABELIDSCHOOL],
                                'genre': this.responseGET[i][this.LABELGENRE],
                                'dateBirth': this.responseGET[i][this.LABELDATEBIRTH]});
      }
      this.syncStudents('save');
      this.firstLoad();
    }


    public async searchNameResponsable(idType: number, idResponsable: number) {
      this.commonFunction.write('searchNameTutorOK', '');        
      this.parentService.getParentByIdService(idResponsable).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.searchNameResponsableOK(idType);
        this.commonFunction.write('getGroups', 'ok');
      }, response => {
        this.searchNameResponsableKO();
        this.commonFunction.write('getGroups', 'ko');
      });
    }

    private searchNameResponsableOK(idType: number) {
      this.commonFunction.write('searchNameTutorOK', '');
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
      this.commonFunction.write('searchNameTutorKO', '');
    }

    private updateStudentOK(index: number) {
      this.commonFunction.write('updateStudentOK', index.toString());
      this.setUpdating(false);
      this.syncStudents('save');
    }

    private deleteStudentOK(index: number) {
      this.commonFunction.write('deleteStudentOK', 'Student deleted from DB, deleting from array now..');
      this.studentsArray.splice(index, 1);
      this.syncStudents('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertStudentOK(index: number) {
      this.commonFunction.write('insertStudentOK', index.toString());
      this.syncStudents('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectStudentKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateStudentKO() {
      this.commonFunction.write('updateStudentKO', 'Error updating student in DB');
      this.setUpdating(false);
    }

    private deleteStudentKO() {
      this.commonFunction.write('deleteStudentKO', 'Error deleting student from DB');
    }

    private insertStudentKO() {
      this.commonFunction.write('insertStudentKO', 'Error inserting student in DB');
    }

    /* LOADS */

    private loadStudents() {
      this.commonFunction.write('loadStudents', '');
      this.selectStudent();
    }


    private loadArrayStudents() {
      this.commonFunction.write('loadArrayStudents', '');
      /* TODO
      for (var i= 0; i<studentModule.studentsArray.length; i++) {
        this.studentsArray.push(studentModule.studentsArray[i]);
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
      this.idResponsable1= 0;
      this.idResponsable2= 0;
      this.idSchool = 0;
      this.nameResponsable1= '';
      this.nameResponsable2= '';
      this.yearSelected= 0;
      this.monthSelected= 0;
      this.daySelected= 0;
      this.genreSelected= 0;
      this.genreName= '';
      this.responsable1Selected= null;
      this.responsable2Selected= null;
      this.selectingResponsable1= false;
      this.selectingResponsable2= false;
      this.selectingDateBirth= false;
      this.selectingGenre= false;
      this.nameSchool = '';
      this.schoolSelected= null;
      this.selectingSchool= false;
    }

    protected resetExtra(){      
      this.commonFunction.write('resetExtra', '');
      this.selectingResponsable1= false;
      this.selectingResponsable2= false;
      this.responsable1Selected= null;
      this.responsable2Selected= null;
      this.selectingDateBirth= false;
      this.selectingGenre= false;
      this.schoolSelected= null;
      this.selectingSchool= false;
      this.selectedIntolerance = null;    
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
      this.commonFunction.write('logData', 'idResponsable1: ' + this.idResponsable1);
      this.commonFunction.write('logData', 'idResponsable2: ' + this.idResponsable2);
      this.commonFunction.write('logData', 'nameResponsable1: ' + this.nameResponsable1);
      this.commonFunction.write('logData', 'nameResponsable2: ' + this.nameResponsable2);
      this.commonFunction.write('logData', 'DateBirth: ' + this.daySelected + '/' + this.monthSelected + '/' + this.yearSelected);
      this.commonFunction.write('logData', 'GenreSelected: ' + this.genreSelected);
      this.commonFunction.write('logData', 'GenreName: ' + this.genreName);
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
      this.commonFunction.write('getNumEntity', this.studentsArray.length.toString());
      return this.studentsArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewStudent() {
      this.commonFunction.write('addNewStudent', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncStudents(option: string) {
      this.commonFunction.write('syncStudents', option);
      if (option === 'save') {
        // TODO
        // studentModule.setstudentsArray(this.studentsArray);
      } else if (option === 'load') {
        this.loadArrayStudents();
        this.maxId = this.studentsArray.length;
      }
      this.commonFunction.write('syncStudents', option + ' finished');
    }

    public addStudent() {
      this.commonFunction.write('addStudent', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addStudent', 'validateStudent === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addStudent', 'isUpdating === true');
          this.studentsArray[this.index][this.LABELID] = this.id;
          this.studentsArray[this.index][this.LABELDNI] = this.dni;
          this.studentsArray[this.index][this.LABELNAME] = this.name;
          this.studentsArray[this.index][this.LABELSURNAME] = this.surname;
          
          this.isSelectingResponsable1()=== true ? 
            this.idResponsable1 = this.responsable1Selected.getId() : null;
          this.studentsArray[this.index][this.LABELIDRESPONSABLE1] = this.idResponsable1;
          
          this.isSelectingResponsable2()=== true ? 
            this.idResponsable2 = this.responsable2Selected.getId() : null;          
          this.studentsArray[this.index][this.LABELIDRESPONSABLE2] = this.idResponsable2;

          this.isSelectingSchool()=== true ? 
            this.idSchool = this.schoolSelected.getId() : null;
          this.studentsArray[this.index][this.LABELIDSCHOOL] = this.idSchool;          

          this.studentsArray[this.index][this.LABELGENRE] = this.genreSelected;          
          this.studentsArray[this.index][this.LABELDATEBIRTH] = this.daySelected + '/' + this.monthSelected + '/' + this.yearSelected + '/';

          this.updateStudent(this.index);
          this.saveintolerancesToStudent(this.index, this.id, this.getStringIdFromArray());
        } else {
          this.commonFunction.write('addStudent', 'isUpdating === false');
          this.maxId++;
          this.idResponsable1 = this.responsable1Selected.getId();          
          this.idResponsable2 = this.responsable2Selected.getId();    
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();      
          const student: Student = { id: this.studentsArray.length,
            dni: this.dni, name: this.name, surname: this.surname, idResponsable1: this.idResponsable1, idResponsable2: this.idResponsable2, idSchool: this.idSchool,
            genre: this.genreSelected, dateBirth: this.daySelected + '/' + this.monthSelected + '/' + this.yearSelected + '/'};
          this.studentsArray.push(student);
          this.insertStudent(student);
        }
        this.resetForm();
        this.resetArrayintolerancesStudent();
        this.activateMode('list');
      }
    }

    public isSelectingSchool(){
      return this.selectingSchool;
    }

    public showArray(){
      this.commonFunction.write('showArray', 'responsablesArray');        
      for(let i= 0; i< this.responsablesArray.length; i++){
        console.log(
          this.responsablesArray[i][this.LABELID]+'_'+
          this.responsablesArray[i][this.LABELNAME]+'_');
      }
    }    


    public selectDateBirth(){
      (this.isSelectingDateBirth() === true) ? this.selectingDateBirth = false: this.selectingDateBirth = true;
    }

    public isSelectingDateBirth(){
      return this.selectingDateBirth;
    }



    public selectResponsable1(){
       (this.isSelectingResponsable1() === true) ? this.selectingResponsable1 = false: this.selectingResponsable1 = true;
    }

    public isSelectingResponsable1(){
      return this.selectingResponsable1;
    }

    public selectResponsable2(){
      (this.isSelectingResponsable2() === true) ? this.selectingResponsable2 = false: this.selectingResponsable2 = true;
   }

   public isSelectingResponsable2(){
     return this.selectingResponsable2;
   }

     public selectGenre(){
    (this.isSelectingGenre() === true) ? this.selectingGenre = false: this.selectingGenre = true;
    }

      public isSelectingGenre(){
        return this.selectingGenre;
      }



    public modifyStudent(index: number) {
      this.commonFunction.write('modifyStudent', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.studentsArray[index][this.LABELID];
      this.dni = this.studentsArray[index][this.LABELDNI];
      this.name = this.studentsArray[index][this.LABELNAME];
      this.surname = this.studentsArray[index][this.LABELSURNAME];
      this.idResponsable1 = this.studentsArray[index][this.LABELIDRESPONSABLE1];
      this.idResponsable2 = this.studentsArray[index][this.LABELIDRESPONSABLE2];
      this.idSchool= this.studentsArray[index][this.LABELIDSCHOOL];
      this.genreSelected= this.studentsArray[index][this.LABELGENRE];
      this.genreName="";
      if (this.genreSelected==1){
        this.genreName= "Masculino";
      } else if (this.genreSelected==2){
        this.genreName= "Femenino"
      }      
      this.daySelected= this.studentsArray[index][this.LABELDATEBIRTH].split("/")[0];
      this.monthSelected= this.studentsArray[index][this.LABELDATEBIRTH].split("/")[1];
      this.yearSelected= this.studentsArray[index][this.LABELDATEBIRTH].split("/")[2];
      this.dateBirth= this.studentsArray[index][this.LABELDATEBIRTH];
      this.searchNameResponsable(1, this.idResponsable1);
      this.searchNameResponsable(2, this.idResponsable2);      
      this.searchNameSchool(this.idSchool);
      this.logData();
      this.activateMode('form');
      this.resetErrors();
      this.getintolerancesStudent(this.id);
    }    

    public async selectResponsables() {
      this.commonFunction.write('selectResponsables', '');        
      this.parentService.getParentsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectResponsablesOK();
        this.commonFunction.write('selectResponsables', 'ok');
      }, response => {
        this.selectResponsablesKO();
        this.commonFunction.write('selectResponsables', 'ko');
      });
    }    

    public selectSchool(){
      (this.isSelectingSchool() === true) ? this.selectingSchool = false: this.selectingSchool = true;
    }

    /* HTTPGET REPONSE OK */

    private selectResponsablesOK() {
      this.commonFunction.write('selectResponsablesOK', '');
      this.responsablesArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        this.responsablesArray.push(new CParent(this.responseGET[i][this.LABELRESPONSABLEID], 
                                                this.responseGET[i][this.LABELRESPONSABLESURNAME] + ', ' + 
                                                this.responseGET[i][this.LABELRESPONSABLENAME],
                                                this.responseGET[i][this.LABELRESPONSABLESURNAME],
                                                this.responseGET[i][this.LABELRESPONSABLETYPE],
                                                this.responseGET[i][this.LABELIDSCHOOL]))
      }   
      this.syncStudents('save');      
    }

    private selectResponsablesKO() {
      this.commonFunction.write('selectTeacherKO', '');
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







    public resetArray(){      
      this.resetArrayintolerancesStudent();
    }

    public getStringIdFromArray(){      
      let i= 0;            
      let stringList: string= "";
      while(i< this.intolerancesStudentArray.length){
        stringList+= this.intolerancesStudentArray[i].getId() +"@";
        i++;
      }
      return stringList.slice(0, stringList.length-1);
    }

    public addIntoleranceStudent() {
      this.commonFunction.write('addIntoleranceStudent', '');
      if (this.isUpdating() === true) {        
        this.commonFunction.write('addIntoleranceStudent', 'isUpdating === true');                
      } else {
        this.commonFunction.write('addIntoleranceStudent', 'isUpdating === false');                
      }
      if(this.intoleranceSelected() && !this.intoleranceAddedBefore()){
        this.commonFunction.write('addIntoleranceStudent', 'adding '+this.selectedIntolerance.getId()+' to the intolerances');                
        this.intolerancesStudentArray.push(this.selectedIntolerance);                  
      }
    }

    public intoleranceSelected(){
      this.commonFunction.write('intoleranceSelected', '');        
      return (!(this.selectedIntolerance===undefined) && !(this.selectedIntolerance===null));
    }

    public getSelectedIntolerance(){
      return this.selectedIntolerance;
    }

    public intoleranceAddedBefore(){
      this.commonFunction.write('intoleranceAddedBefore', this.selectedIntolerance.getId().toString() + ":" + this.selectedIntolerance.getName().toString());
          let present: boolean= false;            
          let i= 0;
          while(!present && i< this.intolerancesStudentArray.length){
            this.intolerancesStudentArray[i].getId() == this.selectedIntolerance.getId() ? present= true : null;
            i++;
          }
      return present;
    }

    public saveintolerancesToStudent(index: number, id: number, intolerancesStudent: string){
      this.commonFunction.write('saveintolerancesToStudent', 'index:' + index.toString() + ', id: '
      + id + ', intolerancesStudent: ' + intolerancesStudent);
      this.intoleranceService.addIntolerancesToStudent(id, intolerancesStudent).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.saveIntoleracesToStudentOK(index);
      }, response => {
        this.saveIntoleracesToStudentKO();
      });
    }

    private saveIntoleracesToStudentOK(index: number) {
      this.commonFunction.write('saveIntoleracesToStudentOK', 'index: '+index);
    }

    private saveIntoleracesToStudentKO() {
      this.commonFunction.write('saveIntoleracesToStudentKO', '');
    }

    public resetArrayintolerancesStudent(){
      this.commonFunction.write('resetArrayintolerancesStudent', '');
      delete this.intolerancesStudentArray;
      this.intolerancesStudentArray= new Array();
    }

    public getintolerancesStudent(id: number){
      this.commonFunction.write('getintolerancesStudent', '');     
      this.intoleranceService.getIntolerancesByStudentService(id).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.getintolerancesStudentOK();              
        this.commonFunction.write('getintolerancesStudent', 'ok');
      }, response => {
        this.getintolerancesStudentKO();
        this.commonFunction.write('getintolerancesStudent', 'ko');
      });
    }

    private getintolerancesStudentOK() {
      this.commonFunction.write('getintolerancesStudentOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {        
        this.intolerancesStudentArray.push(new CIntolerance(this.responseGET[i][this.LABELID], this.responseGET[i][this.LABELNAME], this.responseGET[i][this.LABELIDSCHOOL]));
      }
    }

    private getintolerancesStudentKO() {
      this.commonFunction.write('getintolerancesStudentKO', '');    
    } 

    public deleteIntoleranceStudent(id: number){
      this.commonFunction.write('deleteIntoleranceStudent', id.toString());    
      let posIntoleranceStudent= this.intoleranceInStudentArray(id);      
      if (posIntoleranceStudent > -1){
        this.intolerancesStudentArray.splice(posIntoleranceStudent, 1);
      }
      //this.showintolerancesStudentsArrayrray();
    }

    public intoleranceInStudentArray(id: number){
      this.commonFunction.write('intoleranceInStudentArray', id.toString());    
      let i= 0;
      let pos= -1;
      while(i< this.intolerancesStudentArray.length && pos===-1){        
        this.intolerancesStudentArray[i].getId()===id ? pos = i : null;
        i++;
      }
      return pos;
    }

    private selectIntoleranceOK() {
      this.commonFunction.write('selectIntoleranceOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {        
        this.intolerancesArray.push(new CIntolerance(this.responseGET[i][this.LABELID], this.responseGET[i][this.LABELNAME], this.responseGET[i][this.LABELIDSCHOOL]));
      }
      this.syncintolerances('save');
      this.firstLoad();
    }

    public async selectIntolerance() {
      this.commonFunction.write('selectIntolerance', '');        
      this.intoleranceService.getIntolerancesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
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

    public syncintolerances(option: string) {
      this.commonFunction.write('syncintolerances', option);
      if (option === 'save') {
        // TODO
        // intoleranceModule.setintolerancesArray(this.intolerancesArray);
      } else if (option === 'load') {
        this.loadArrayintolerances();
        this.maxId = this.intolerancesArray.length;
      }
      this.commonFunction.write('syncintolerances', option + ' finished');
    }


    public loadArrayintolerances() {
      this.commonFunction.write('loadArrayintolerances', '');
      /* TODO
      for (var i= 0; i<intoleranceModule.intolerancesArray.length; i++) {
        this.intolerancesArray.push(intoleranceModule.intolerancesArray[i]);
      }
      */
    }






  }