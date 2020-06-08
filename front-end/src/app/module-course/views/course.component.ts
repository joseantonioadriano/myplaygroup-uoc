import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import Course from '../../types/course.type';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { CourseService } from '../../services/course.service';

@Component({
    selector: 'app-course',
    templateUrl: './course.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class CourseComponent extends BaseComponent  {

    coursesArray: Course[] = [];
  
    // ATTRIBUTES
    public id: number = 0;
    public name:string = '';
      
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

    private courseService: CourseService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor CourseComponent', '');
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');
        this.courseService = new CourseService(this.http);
        this.loadConf();
        this.selectCourse();
    }      

    /* SEARCHS */

    public showLineFilters(i: number) {
      //this.commonFunction.write('showLineFilters', '');
      return (this.showLineFilter(this.LABELNAME, i));
    }

    private showLineFilter(field: string, position: number) {
      //this.commonFunction.write('showLineFilter', 'field: ' + field + ' position: ' + position);
      if(this.coursesArray[position][field]!=null){
        switch(field) {
          case this.LABELNAME:
            return (this.coursesArray[position][field].toUpperCase().search(this.inputSearchName.toUpperCase()) > -1);
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
    
    public async selectCourse() {
      this.commonFunction.write('selectCourse', '');        
      this.courseService.getCoursesService().subscribe((response: any) => {        
        console.log(response);          
        this.responseGET = response;
        this.selectCourseOK();
        this.commonFunction.write('getCourses', 'ok');
      }, response => {
        this.selectCourseKO();
        this.commonFunction.write('getCourses', 'ko');
      });
    }

    public updateCourse(index: number) {
      this.commonFunction.write('updateCourse', 'index:' + index.toString() + ', id: '
      + this.coursesArray[index][this.LABELID].toString() + ', login: ' 
      + this.coursesArray[index][this.LABELNAME].toString() );
      this.courseService.updateCourseService(this.id, this.name).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.updateCourseOK(index);
      }, response => {
        this.updateCourseKO();
      });
    }

    public deleteCourse(index: number) {
      this.commonFunction.write('deleteCourse', index.toString() + ' with id: ' + this.coursesArray[index][this.LABELID]);
      this.courseService.deleteCourseService(this.coursesArray[index][this.LABELID]).subscribe((response: any) => {
        console.log(response);
        this.responseGET = response;
        this.deleteCourseOK(index);
      }, response => {
        this.deleteCourseKO();
      });
    }

    public insertCourse(course: Course) {
      const index: number = course.id;
      this.commonFunction.write('insertCourse', 'index:' + index.toString() 
      + this.coursesArray[index][this.LABELNAME].toString());
      this.courseService.insertCourseService(this.name).subscribe((response: any) => {
        console.log(response);
        this.commonFunction.write('insertCourse', 'Register created with id: ' + response.newId);
        this.coursesArray[index][this.LABELID] = response.newId;
        this.insertCourseOK(this.coursesArray[index][this.LABELID]);
      }, response => {
        this.selectCourseKO();
      });
    }  


    /* HTTPGET REPONSE OK */

    private selectCourseOK() {
      this.commonFunction.write('selectCourseOK', '');
      for (let i = 0; i < this.responseGET.length; i++) {
        this.coursesArray.push({'id': this.responseGET[i][this.LABELID],
                                   'name': this.responseGET[i][this.LABELNAME]});
      }
      this.syncCourses('save');
      this.firstLoad();
    }

    private updateCourseOK(index: number) {
      this.commonFunction.write('updateCourseOK', index.toString());
      this.setUpdating(false);
      this.syncCourses('save');
    }

    private deleteCourseOK(index: number) {
      this.commonFunction.write('deleteCourseOK', 'Course deleted from DB, deleting from array now..');
      this.coursesArray.splice(index, 1);
      this.syncCourses('save');
      this.loadPagination();
      this.activateMode('');
    }

    private insertCourseOK(index: number) {
      this.commonFunction.write('insertCourseOK', index.toString());
      this.syncCourses('save');
      this.loadPagination();
    }

    /* HTTPGET REPONSE KO */

    private selectCourseKO() {
      this.commonFunction.write('badResponseGET', '');
    }

    private updateCourseKO() {
      this.commonFunction.write('updateCourseKO', 'Error updating course in DB');
      this.setUpdating(false);
    }

    private deleteCourseKO() {
      this.commonFunction.write('deleteCourseKO', 'Error deleting course from DB');
    }

    private insertCourseKO() {
      this.commonFunction.write('insertCourseKO', 'Error inserting course in DB');
    }

    /* LOADS */

    private loadCourses() {
      this.commonFunction.write('loadCourses', '');
      this.selectCourse();
    }


    private loadArrayCourses() {
      this.commonFunction.write('loadArrayCourses', '');
      /* TODO
      for (var i= 0; i<courseModule.coursesArray.length; i++) {
        this.coursesArray.push(courseModule.coursesArray[i]);
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
      this.commonFunction.write('getNumEntity', this.coursesArray.length.toString());
      return this.coursesArray.length;
    }

    
    /* FUNCTIONALITIES */
   
    public addNewCourse() {
      this.commonFunction.write('addNewCourse', '');
      this.resetForm();
      this.activateMode('form');
    }

    private syncCourses(option: string) {
      this.commonFunction.write('syncCourses', option);
      if (option === 'save') {
        // TODO
        // courseModule.setcoursesArray(this.coursesArray);
      } else if (option === 'load') {
        this.loadArrayCourses();
        this.maxId = this.coursesArray.length;
      }
      this.commonFunction.write('syncCourses', option + ' finished');
    }

    public addCourse() {
      this.commonFunction.write('addCourse', '');
      if (this.validateEntity() === false) {
        this.commonFunction.write('addCourse', 'validateCourse === false');
        if (this.isUpdating() === true) {
          this.commonFunction.write('addCourse', 'isUpdating === true');
          this.coursesArray[this.index][this.LABELID] = this.id;
          this.coursesArray[this.index][this.LABELNAME] = this.name;
          this.updateCourse(this.index);
        } else {
          this.commonFunction.write('addCourse', 'isUpdating === false');
          this.maxId++;
          const course: Course = { id: this.coursesArray.length, name: this.name};
          this.coursesArray.push(course);
          this.insertCourse(course);
        }
        this.resetForm();
        this.activateMode('list');
      }
    }

    public modifyCourse(index: number) {
      this.commonFunction.write('modifyCourse', index.toString());
      this.setUpdating(true);
      this.index = index;
      this.id = this.coursesArray[index][this.LABELID];
      this.name = this.coursesArray[index][this.LABELNAME];
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
 