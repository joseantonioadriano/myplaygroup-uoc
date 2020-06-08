import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CIntolerance from '../../classes/intolerance.class';
import Enrollment from '../../types/enrollment.type';
import CommonFunction from '../../common/common-functions';
import CParent from '../../classes/parent.class';
import CSchool from '../../classes/school.class';
import CGroup from '../../classes/group.class';
import { BaseComponent } from '../../module-base/views/base.component';
import { EnrollmentService } from '../../services/enrollment.service';
import { ParentService } from '../../services/parent.service';
import { SchoolService } from '../../services/school.service';
import { SessionService } from '../../services/session.service';
import { StudentService } from '../../services/student.service';
import { IntoleranceService } from '../../services/intolerance.service';
import { CourseService } from '../../services/course.service';
import { GroupService } from '../../services/group.service';
import CStudent from 'src/app/classes/student.class';

@Component({
    selector: 'app-enrollment',
    templateUrl: './enrollment.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class EnrollmentComponent extends BaseComponent {
    
    enrollmentsArray: Enrollment[] = [];
    intolerancesArray: CIntolerance[] = [];
    responsablesArray: CParent[] = [];
    schoolsArray: CSchool[] = [];
    intolerancesEnrollmentArray: CIntolerance[] = [];
    studentsArray: CStudent[] = [];
    studentsNoRolledArray: CStudent[] = [];
    groupsArray: CGroup[] = [];
  
    // ATTRIBUTES
    public idEnroll: number = 0;
    public idStudent: number = 0;
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
    
    public courseId:number = 0;
    public courseName:string = '';

    public nameGroup: string = '';
    public groupSelected: CGroup;

    public course: string;

    public nameStudent:string = '';
    public studentSelected: CStudent;
    public fee: string= '';
    public namePicture: string= 'boy.png';
    public idGroup: number= 0;
      
    //public selectingStudent: boolean= false;

    // CLASSES
    public labelClassDni: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassName: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';
    public labelClassSurname: string; //= !this.login || this.login === '' ? 'inputcomp__label' : 'inputcomp__label--activated';     
    
    public selectingResponsable1: boolean= false;
    public selectingResponsable2: boolean= false;
    public selectingSchool: boolean= false;
    public selectedIntolerance: CIntolerance;

    private intoleranceService: IntoleranceService;
    private studentService: StudentService;

    public selectingGroup: boolean= false;

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
    public inputSearchCourse: string = '';
    public inputSearchStudent: string = '';
    public inputSearchName: string = '';    
    
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

    private LABELIDENROLL: string = 'id';
    private LABELSTUDENTID: string = 'idStudent';
    private LABELSTUDENTDNI: string = 'dni';
    private LABELSTUDENTNAME: string = 'name';
    private LABELSTUDENTSURNAME: string = 'surname';
    private LABELSTUDENTIDRESPONSABLE1: string = 'idResponsable1';
    private LABELSTUDENTIDRESPONSABLE2: string = 'idResponsable2';
    private LABELSTUDENTIDSCHOOL: string = 'idSchool';

    private LABELCOURSEID: string = 'id';
    private LABELCOURSENAME: string = 'name';

    private LABELNAMEPICTURE: string = 'namePicture';
    private LABELFEE: string = 'fee';
    private LABELIDCOURSE: string = 'idCourse';
    private LABELIDSTUDENT: string = 'idStudent';
    private LABELIDGROUP: string = 'idGroup';

    private LABELGROUPID: string = 'id';
    private LABELGROUPNAME: string = 'name';
    private LABELIDTUTOR: string = 'idTutor';

    private enrollmentService: EnrollmentService;
    private parentService: ParentService;
    private schoolService: SchoolService;
    public sessionService: SessionService;
    private courseService: CourseService;
    private groupService: GroupService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor EnrollmentComponent', '');           
      this.sessionService= new SessionService();       
      this.intoleranceService= new IntoleranceService(http);
      this.studentService= new StudentService(http);
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.enrollmentService = new EnrollmentService(this.http);
        this.parentService = new ParentService(this.http);
        this.schoolService = new SchoolService(this.http);
        this.courseService = new CourseService(this.http);
        this.groupService = new GroupService(this.http);
        this.loadConf();
        this.selectEnrollment();
        this.selectResponsables();
        this.selectSchools();
        //this.selectIntolerance();
        this.selectStudents();
        this.selectStudentsNoEnrolled();
        this.selectCourses();
        this.selectGroups();
    }    

   

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELCOURSEID, i) && 
              this.showLineFilter(this.LABELSTUDENTID, i) && 
              this.showLineFilter(this.LABELFEE, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.enrollmentsArray[position][field]!=null){
        switch(field) {
          case this.LABELCOURSEID:
            return (this.enrollmentsArray[position][field].toUpperCase().search(this.inputSearchCourse.toUpperCase()) > -1);
            break;
          case this.LABELSTUDENTID:
            return (this.enrollmentsArray[position][field].toUpperCase().search(this.inputSearchStudent.toUpperCase()) > -1);
            break;
          case this.LABELFEE:
            return (this.enrollmentsArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
            break;
          default:
            return false;
            break;
        }
      }
     return true;
    }

    public filterList($event: any) {
      this.commonFunction.write('filterList', '');
      const searchValue = ($event.target.value.toString() ? $event.target.value.toString() : $event.which);
      this.commonFunction.write('filterList', 'this.inputSearchCourse:' + this.inputSearchCourse);
      this.commonFunction.write('filterList', 'this.inputSearchStudent:' + this.inputSearchStudent);
      this.commonFunction.write('filterList', 'this.inputSearchName:' + this.inputSearchName);
    }

    /* HTTPGET */
    
    public async selectStudentsNoEnrolled() {
      this.commonFunction.write('selectStudentsNoEnrolled', '');        
      this.studentService.getStudentsNoEnrolledService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectStudentsNoEnrolledOK();
        this.commonFunction.write('selectStudentsNoEnrolled', 'ok');
      }, response => {
        this.selectStudentsNoEnrolledKO();
        this.commonFunction.write('selectStudentsNoEnrolled', 'ko');
      });
    }

    private selectStudentsNoEnrolledOK() {
      this.commonFunction.write('selectStudentsOK', '');
      this.studentsNoRolledArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        //TODO
        this.studentsNoRolledArray.push(new CStudent(this.responseGET[i][this.LABELID], 
                                             this.responseGET[i][this.LABELSTUDENTDNI], 
                                             this.responseGET[i][this.LABELSTUDENTNAME], 
                                             this.responseGET[i][this.LABELSTUDENTSURNAME], 
                                             this.responseGET[i][this.LABELSTUDENTIDRESPONSABLE1], 
                                             this.responseGET[i][this.LABELSTUDENTIDRESPONSABLE2], 
                                             this.responseGET[i][this.LABELSTUDENTIDSCHOOL], 
                                             0,''))
      }   
      this.syncEnrollments('save');      
    }

    private selectStudentsNoEnrolledKO() {
      this.commonFunction.write('selectStudentsKO', '');
    }

    public async selectStudents() {
      this.commonFunction.write('selectStudents', '');        
      this.studentService.getStudentsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectStudentsOK();
        this.commonFunction.write('selectStudents', 'ok');
      }, response => {
        this.selectStudentsKO();
        this.commonFunction.write('selectStudents', 'ko');
      });
    }    

    private selectStudentsOK() {
      this.commonFunction.write('selectStudentsOK', '');
      this.studentsArray= [];
      for (let i = 0; i < this.responseGET.length; i++) {
        //TODO
        this.studentsArray.push(new CStudent(this.responseGET[i][this.LABELID], 
                                             this.responseGET[i][this.LABELSTUDENTDNI], 
                                             this.responseGET[i][this.LABELSTUDENTNAME], 
                                             this.responseGET[i][this.LABELSTUDENTSURNAME], 
                                             this.responseGET[i][this.LABELSTUDENTIDRESPONSABLE1], 
                                             this.responseGET[i][this.LABELSTUDENTIDRESPONSABLE2], 
                                             this.responseGET[i][this.LABELSTUDENTIDSCHOOL],
                                             0, ''))
      }   
      this.syncEnrollments('save');      
    }
    
    private selectStudentsKO() {
      this.commonFunction.write('selectStudentsKO', '');
    }



    public async selectCourses() {
      this.commonFunction.write('selectCourses', '');        
      this.courseService.getCourseActiveToSchool(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectCoursesOK();
        this.commonFunction.write('selectCourses', 'ok');
      }, response => {
        this.selectCoursesKO();
        this.commonFunction.write('selectCourses', 'ko');
      });
    }    

    private selectCoursesOK() {
      this.commonFunction.write('selectCoursesOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.courseId = this.responseGET[i][this.LABELCOURSEID];
        this.courseName = this.responseGET[i][this.LABELCOURSENAME];
      }   
      this.syncEnrollments('save');      
    }
    
    private selectCoursesKO() {
      this.commonFunction.write('selectCoursesKO', '');
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
      for (let i = 0; i < this.responseGET.length; i++) {
        this.groupsArray.push(new CGroup(
                                this.responseGET[i][this.LABELGROUPID],
                                this.responseGET[i][this.LABELGROUPNAME],
                                this.responseGET[i][this.LABELIDSCHOOL],
                                this.responseGET[i][this.LABELIDTUTOR]));
      }   
      this.syncEnrollments('save');      
    }
    
    private selectGroupKO() {
      this.commonFunction.write('selectGroupKO', '');
    }

    private async selectEnrollment() {
      this.commonFunction.write('selectEnrollment', '');        
      this.enrollmentService.getEnrollmentsService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectEnrollmentOK();
        this.commonFunction.write('getEnrollments', 'ok');
      }, response => {
        this.selectEnrollmentKO();
        this.commonFunction.write('getEnrollments', 'ko');
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
      this.syncEnrollments('save');      
    }

    private selectSchoolsKO() {
      this.commonFunction.write('selectSchoolsKO', '');
    }


    private updateEnrollment(index: number) {
      this.commonFunction.write('updateEnrollment', 'index:' + index.toString()  + ',idStudent: ' 
        + this.idStudent + ', courseId: ' 
        + this.courseId + ', idSchool: ' 
        + this.idSchool + ', namePicture: ' 
        + this.namePicture + ', idGroup: ' 
        + this.groupSelected.getId() );
      this.enrollmentService.updateEnrollmentService(this.idEnroll, this.fee, this.namePicture, this.groupSelected.getId()).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateEnrollmentOK(index);
      }, response => {
        this.updateEnrollmentKO();
      });
    }

    public deleteEnrollment(index: number) {
      this.commonFunction.write('deleteEnrollment', index.toString() + ' with id: ' + this.enrollmentsArray[index][this.LABELID]);
      this.enrollmentService.deleteEnrollmentService(this.enrollmentsArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteEnrollmentOK(index);
      }, response => {
        this.deleteEnrollmentKO();
      });
    }

    private insertEnrollment(enrollment: Enrollment) {
      const index: number = enrollment.id;
      this.commonFunction.write('insertEnrollment', 'index:' + index.toString() + ',idStudent: ' 
      + this.enrollmentsArray[index][this.LABELIDSTUDENT].toString() + ', courseId: ' 
      + this.enrollmentsArray[index][this.LABELCOURSEID].toString() + ', idSchool: ' 
      + this.enrollmentsArray[index][this.LABELIDSCHOOL].toString() + ', namePicture: ' 
      + this.enrollmentsArray[index][this.LABELNAMEPICTURE].toString() + ', idGroup: ' 
      + this.enrollmentsArray[index][this.LABELIDGROUP].toString());
      let stringIdFromArray: string = this.getStringIdFromArray();
      this.enrollmentService.insertEnrollmentService(this.idStudent, this.courseId, this.idSchool, this.fee, 
                                                     this.namePicture, this.groupSelected.getId()).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertEnrollment', 'Register created with id: ' + response.newId);
        this.enrollmentsArray[index][this.LABELID] = response.newId;
        //this.saveintolerancesToEnrollment(this.index, response.newId, this.getStringIdFromArray());
        this.insertEnrollmentOK(this.enrollmentsArray[index][this.LABELID]);
      }, response => {
        this.selectEnrollmentKO();
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

    private selectEnrollmentOK() {
      this.commonFunction.write('selectEnrollmentOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.enrollmentsArray.push({'id': this.responseGET[i][this.LABELID],
                                 'idStudent': this.responseGET[i][this.LABELIDSTUDENT],
                                 'idCourse': this.responseGET[i][this.LABELIDCOURSE],
                                 'idSchool': this.responseGET[i][this.LABELIDSCHOOL],
                                 'fee': this.responseGET[i][this.LABELFEE],
                                 'namePicture': this.responseGET[i][this.LABELNAMEPICTURE],
                                 'idGroup': this.responseGET[i][this.LABELIDGROUP]});
      }
      this.syncEnrollments('save');
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

    private updateEnrollmentOK(index: number) {
      this.commonFunction.write('updateEnrollmentOK', index.toString());
      this.setUpdating(false);
      this.selectStudentsNoEnrolled();
      this.syncEnrollments('save');
    }

    private deleteEnrollmentOK(index: number) {
      this.commonFunction.write('deleteEnrollmentOK', 'Enrollment deleted from DB, deleting from array now..');
      this.enrollmentsArray.splice(index, 1);
      this.selectStudentsNoEnrolled();
      this.syncEnrollments('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertEnrollmentOK(index: number) {
      this.commonFunction.write('insertEnrollmentOK', index.toString());
      this.selectStudentsNoEnrolled();
      this.syncEnrollments('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectEnrollmentKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateEnrollmentKO() {
      this.commonFunction.write('updateEnrollmentKO', 'Error updating enrollment in DB');
      this.setUpdating(false);
    }

    private deleteEnrollmentKO() {
      this.commonFunction.write('deleteEnrollmentKO', 'Error deleting enrollment from DB');
    }

    private insertEnrollmentKO() {
      this.commonFunction.write('insertEnrollmentKO', 'Error inserting enrollment in DB');
    }

    /* LOADS */

    private loadEnrollments() {
      this.commonFunction.write('loadEnrollments', '');
      this.selectEnrollment();
    }


    private loadArrayEnrollments() {
      this.commonFunction.write('loadArrayEnrollments', '');
      /* TODO
      for (var i= 0; i<enrollmentModule.enrollmentsArray.length; i++) {
        this.enrollmentsArray.push(enrollmentModule.enrollmentsArray[i]);
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
      this.idEnroll = 0;
      this.dni = '';
      this.name = '';
      this.surname = '';
      this.idResponsable1= 0;
      this.idResponsable2= 0;
      this.idSchool = 0;
      this.nameResponsable1= '';
      this.nameResponsable2= '';
      this.responsable1Selected= null;
      this.responsable2Selected= null;
      this.selectingResponsable1= false;
      this.selectingResponsable2= false;
      this.nameSchool = '';
      this.schoolSelected= null;
      this.selectingSchool= false;      
      this.nameStudent = '';
      this.studentSelected = null;
      this.groupSelected= null;
      this.fee = '';      
      this.idGroup= 0;
      this.selectingGroup= false;
    }

    protected resetExtra(){      
      this.commonFunction.write('resetExtra', '');
      this.selectingResponsable1= false;
      this.selectingResponsable2= false;
      this.responsable1Selected= null;
      this.responsable2Selected= null;
      this.schoolSelected= null;
      this.selectingSchool= false;
      this.selectedIntolerance = null;   
      this.selectingGroup= false; 
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
      this.commonFunction.write('logData', 'id: ' + this.idEnroll);
      this.commonFunction.write('logData', 'index: ' + this.index);
      this.commonFunction.write('logData', 'dni: ' + this.dni);
      this.commonFunction.write('logData', 'name: ' + this.name);
      this.commonFunction.write('logData', 'surname: ' + this.surname);
      this.commonFunction.write('logData', 'idResponsable1: ' + this.idResponsable1);
      this.commonFunction.write('logData', 'idResponsable2: ' + this.idResponsable2);
      this.commonFunction.write('logData', 'nameResponsable1: ' + this.nameResponsable1);
      this.commonFunction.write('logData', 'nameResponsable2: ' + this.nameResponsable2);
      this.commonFunction.write('logData', 'idSchool: ' + this.idSchool);
      this.commonFunction.write('logData', 'nameSchool: ' + this.nameSchool);
      this.commonFunction.write('logData', 'fee: ' + this.fee);
      this.commonFunction.write('logData', 'idGroup: ' + this.idGroup);
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
      this.commonFunction.write('getNumEntity', this.enrollmentsArray.length.toString());
      return this.enrollmentsArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewEnrollment() {
      this.commonFunction.write('addNewEnrollment', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncEnrollments(option: string) {
      this.commonFunction.write('syncEnrollments', option);
      if (option === 'save') {
        // TODO
        // enrollmentModule.setenrollmentsArray(this.enrollmentsArray);
      } else if (option === 'load') {
        this.loadArrayEnrollments();
        this.maxId = this.enrollmentsArray.length;
      }
      this.commonFunction.write('syncEnrollments', option + ' finished');
    }

    public addEnrollment() {
      this.commonFunction.write('addEnrollment', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addEnrollment', 'validateEnrollment === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addEnrollment', 'isUpdating === true');
          this.enrollmentsArray[this.index][this.LABELIDENROLL] = this.idEnroll;
          this.enrollmentsArray[this.index][this.LABELIDSTUDENT] = this.idStudent;
          this.enrollmentsArray[this.index][this.LABELCOURSEID] = this.courseId;
          this.enrollmentsArray[this.index][this.LABELIDSCHOOL] = this.idSchool;
          this.enrollmentsArray[this.index][this.LABELFEE] = this.fee;
          this.enrollmentsArray[this.index][this.LABELNAMEPICTURE] = this.namePicture;
          this.enrollmentsArray[this.index][this.LABELIDGROUP] = this.groupSelected.getId();
                    
          this.updateEnrollment(this.index);
          this.saveIntolerancesToEnrollment(this.index, this.idEnroll, this.getStringIdFromArray());
        } else {
          this.commonFunction.write('addEnrollment', 'isUpdating === false');
          this.maxId++;
          //this.idResponsable1 = this.responsable1Selected.getId();          
          //this.idResponsable2 = this.responsable2Selected.getId();    
          (this.schoolSelected==null) ?
            this.idSchool= this.commonFunction.getStorage('userLogged')['idSchool'].toString() :
            this.idSchool= this.schoolSelected.getId();      
          const enrollment: Enrollment = { id: this.enrollmentsArray.length,
            idStudent: this.idStudent, idCourse: this.courseId, idSchool: this.idSchool, fee: this.fee, namePicture: this.namePicture, 
                                                idGroup: this.groupSelected.getId() };
          this.enrollmentsArray.push(enrollment);
          this.logData();
          this.insertEnrollment(enrollment);
        }
        this.resetForm();
        this.resetArrayIntolerancesEnrollment();
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


    private getIndexFromStudent(indexEnroll: number){
      this.commonFunction.write('getIndexFromStudent', indexEnroll.toString());
      let indexFound: number= 0;      
      for(let i= 0; i< this.studentsArray.length; i++){
          if (this.studentsArray[i][this.LABELID]===this.enrollmentsArray[indexEnroll][this.LABELIDSTUDENT]){
            indexFound = i;
          }
      }
      return indexFound;
    }

    public modifyEnrollment(index: number) {
      this.commonFunction.write('modifyEnrollment', index.toString());
      this.setUpdating(true);
      this.logData();            
      this.index = index;      
      this.idEnroll = this.enrollmentsArray[index][this.LABELID];            
      this.idSchool= this.enrollmentsArray[index][this.LABELIDSCHOOL];
      let indexStudent: number= this.getIndexFromStudent(this.index);
      this.idStudent= this.studentsArray[indexStudent][this.LABELID];  
      this.studentSelected= new CStudent(this.studentsArray[indexStudent][this.LABELID],
                                         this.studentsArray[indexStudent][this.LABELSTUDENTDNI],
                                         this.studentsArray[indexStudent][this.LABELSTUDENTNAME],
                                         this.studentsArray[indexStudent][this.LABELSTUDENTSURNAME],
                                         this.studentsArray[indexStudent][this.LABELSTUDENTIDRESPONSABLE1],
                                         this.studentsArray[indexStudent][this.LABELSTUDENTIDRESPONSABLE2],
                                         this.studentsArray[indexStudent][this.LABELIDSCHOOL], 
                                         0, '');
      /*
      this.groupSelected= new CGroup(this.groupsArray[index][this.LABELGROUPID],
                                     this.groupsArray[index][this.LABELGROUPNAME],
                                     this.groupsArray[index][this.LABELIDSCHOOL],
                                     this.groupsArray[index][this.LABELIDTUTOR]);   
      */
      this.reloadStudents();
      this.nameStudent= this.studentsArray[indexStudent][this.LABELSTUDENTNAME] + ' ' + this.studentsArray[indexStudent][this.LABELSTUDENTSURNAME];
      this.fee= this.enrollmentsArray[index][this.LABELFEE];   
      this.idGroup= this.enrollmentsArray[index][this.LABELIDGROUP];             
      //this.nameGroup= this.enrollmentsArray[index][this.LABELIDGROUP];             
      //this.enrollmentsArray[index][this.LABELGROUPNAME];             
      this.searchNameSchool(this.idSchool);
      this.searchNameGroup(this.idGroup);
      this.logData();
      this.activateMode('form');
      this.resetErrors();
      this.getIntolerancesEnrollment(this.idEnroll);
    }    

    public searchNameGroup(idGroup: number){
      this.commonFunction.write('searchNameGroup', idGroup.toString());
      for(let i= 0; i< this.groupsArray.length; i++){
          if(this.groupsArray[i][this.LABELID] === idGroup) {
            this.nameGroup=this.groupsArray[i][this.LABELGROUPNAME];
          }
      }
    }

    public selectGroup(){
      (this.isSelectingGroup() === true) ? this.selectingGroup = false: this.selectingGroup = true;
    }

    public isSelectingGroup(){
      return this.selectingGroup;
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

    public selectStudent(){
      //(this.isSelectingStudent() === true) ? this.selectingStudent = false: this.selectingStudent = true;
      this.reloadStudents();
   }

   public reloadStudents(){
    this.commonFunction.write('reloadStudents', '');
    //this.idEnroll= 
    this.idStudent= this.studentSelected.getId();
    //console.log("this.idStudent:"+this.idStudent);
    this.dni=this.getInfoFromStudent('dni', this.studentSelected.getId());    
    this.name=this.getInfoFromStudent('name', this.studentSelected.getId()); 
    this.surname=this.getInfoFromStudent('surname', this.studentSelected.getId()); 
    this.idResponsable1=this.getInfoFromStudent('idResponsable1', this.studentSelected.getId()); 
    this.idResponsable2=this.getInfoFromStudent('idResponsable2', this.studentSelected.getId());       
    (this.studentSelected.getGenre()===2) ? this.namePicture= 'girl.png' : this.namePicture= 'boy.png';
    //this.idGroup= this.groupSelected.getId();
    this.searchNameResponsable(1, this.idResponsable1);   
    this.searchNameResponsable(2, this.idResponsable2); 
  }

  public getInfoFromStudent(field: string, idStudent: number){
    let found: boolean = false;
    let positionFound: number = 0;
    for(let i= 0; i< this.studentsArray.length && !found; i++){
      //console.log("this.studentsArray[i][this.LABELID]= "+this.studentsArray[i][this.LABELID]);
      //console.log("studentSelected= "+this.studentSelected.getId());
      if(this.studentsArray[i][this.LABELID] == idStudent){
        found = true;        
        positionFound = i;
      }
    }    
    if(found===true) {
      return this.getInfoFromStudentPosition(positionFound, field);
    } else {
      return "";
    }
  }

  private getInfoFromStudentPosition(positionFound: number, field: string){
    switch(field){
      case 'dni': 
        return this.studentsArray[positionFound][this.LABELSTUDENTDNI];
        break;
      case 'name': 
        return this.studentsArray[positionFound][this.LABELSTUDENTNAME];
        break;
      case 'surname': 
        return this.studentsArray[positionFound][this.LABELSTUDENTSURNAME];
        break;
      case 'idResponsable1': 
        return this.studentsArray[positionFound][this.LABELSTUDENTIDRESPONSABLE1];
        break;
      case 'idResponsable2': 
        return this.studentsArray[positionFound][this.LABELSTUDENTIDRESPONSABLE2];
        break;
      default:
        break;
    }      
  }


   //public isSelectingStudent(){
     //return this.selectingStudent;
   //}


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
      this.syncEnrollments('save');      
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
      this.resetArrayIntolerancesEnrollment();
    }

    public getStringIdFromArray(){      
      let i= 0;            
      let stringList: string= "";
      while(i< this.intolerancesEnrollmentArray.length){
        stringList+= this.intolerancesEnrollmentArray[i].getId() +"@";
        i++;
      }
      return stringList.slice(0, stringList.length-1);
    }

    public addIntoleranceEnrollment() {
      this.commonFunction.write('addIntoleranceEnrollment', '');
      if (this.isUpdating() === true) {        
        this.commonFunction.write('addIntoleranceEnrollment', 'isUpdating === true');                
      } else {
        this.commonFunction.write('addIntoleranceEnrollment', 'isUpdating === false');                
      }
      if(this.intoleranceSelected() && !this.intoleranceAddedBefore()){
        this.commonFunction.write('addIntoleranceEnrollment', 'adding '+this.selectedIntolerance.getId()+' to the intolerances');                
        this.intolerancesEnrollmentArray.push(this.selectedIntolerance);                  
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
          while(!present && i< this.intolerancesEnrollmentArray.length){
            this.intolerancesEnrollmentArray[i].getId() == this.selectedIntolerance.getId() ? present= true : null;
            i++;
          }
      return present;
    }

    public saveIntolerancesToEnrollment(index: number, id: number, intolerancesEnrollment: string){
      this.commonFunction.write('saveIntolerancesToEnrollment', 'index:' + index.toString() + ', id: '
      + id + ', intolerancesEnrollment: ' + intolerancesEnrollment);
      /*this.intoleranceService.addintolerancesToStudent(id, intolerancesEnrollment).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.saveIntoleracesToEnrollmentOK(index);
      }, response => {
        this.saveIntoleracesToEnrollmentKO();
      });*/
    }

    private saveIntoleracesToEnrollmentOK(index: number) {
      this.commonFunction.write('saveIntoleracesToEnrollmentOK', 'index: '+index);
    }

    private saveIntoleracesToEnrollmentKO() {
      this.commonFunction.write('saveIntoleracesToEnrollmentKO', '');
    }

    public resetArrayIntolerancesEnrollment(){
      this.commonFunction.write('resetArrayIntolerancesEnrollment', '');
      delete this.intolerancesEnrollmentArray;
      this.intolerancesEnrollmentArray= new Array();
    }

    public getIntolerancesEnrollment(id: number){
      this.commonFunction.write('getIntolerancesEnrollment', '');     
      /*this.intoleranceService.getIntolerancesByStudentService(id).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.getIntolerancesEnrollmentOK();              
        this.commonFunction.write('getintolerancesEnrollment', 'ok');
      }, response => {
        this.getIntolerancesEnrollmentKO();
        this.commonFunction.write('getintolerancesEnrollment', 'ko');
      });*/
    }

    private getintolerancesEnrollmentOK() {
      this.commonFunction.write('getintolerancesEnrollmentOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {        
        this.intolerancesEnrollmentArray.push(new CIntolerance(this.responseGET[i][this.LABELID], this.responseGET[i][this.LABELNAME], this.responseGET[i][this.LABELIDSCHOOL]));
      }
    }

    private getintolerancesEnrollmentKO() {
      this.commonFunction.write('getintolerancesEnrollmentKO', '');    
    } 

    public deleteIntoleranceEnrollment(id: number){
      this.commonFunction.write('deleteIntoleranceEnrollment', id.toString());    
      let posIntoleranceEnrollment= this.intoleranceInEnrollmentArray(id);      
      if (posIntoleranceEnrollment > -1){
        this.intolerancesEnrollmentArray.splice(posIntoleranceEnrollment, 1);
      }
      //this.showintolerancesEnrollmentsArrayrray();
    }

    public intoleranceInEnrollmentArray(id: number){
      this.commonFunction.write('intoleranceInEnrollmentArray', id.toString());    
      let i= 0;
      let pos= -1;
      while(i< this.intolerancesEnrollmentArray.length && pos===-1){        
        this.intolerancesEnrollmentArray[i].getId()===id ? pos = i : null;
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
      /*this.intoleranceService.getIntolerancesService(this.commonFunction.getStorage('userLogged')['idSchool'].toString()).subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectIntoleranceOK();
        this.commonFunction.write('getintolerances', 'ok');
      }, response => {
        this.selectIntoleranceKO();
        this.commonFunction.write('getintolerances', 'ko');
      });*/
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