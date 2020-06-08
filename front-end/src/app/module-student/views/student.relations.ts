import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import CStudent from '../../classes/student.class';
import CommonFunction from '../../common/common-functions';
import { BaseComponent } from '../../module-base/views/base.component';
import { ParentService } from '../../services/parent.service';
import { StudentService } from '../../services/student.service';

@Component({
    selector: 'app-student',
    templateUrl: '../../module-base/views/base.component.html',
    styleUrls: ['../../module-base/views/base.component.scss']
  })
  export class StudentRelationsComponent extends BaseComponent {

    responsable1Array: CStudent[] = [];
    responsable1StudentArray: CStudent[] = [];
    
    responsable2Array: CStudent[] = [];
    responsable2StudentArray: CStudent[] = [];

    studentElem: CStudent;

    // LABELS
    public LABELID: string = 'id';
    public LABELNAME: string = 'name';
    public LABELSURNAME: string = 'surname';
    public LABELDNI: string = 'dni';
    public LABELRESPONSABLE1: string = 'idResponsable1';
    public LABELRESPONSABLE2: string = 'idResponsable2';

    public selectedResponsable1: CStudent;
    public selectedResponsable2: CStudent;

    private studentService: StudentService;
    private responsableService: ParentService;

    constructor(private http: HttpClient){
      super();
      this.commonFunction= new CommonFunction(); 
      this.commonFunction.write('constructor StudentComponent', '');
      this.studentService= new StudentService(http);
      this.responsableService= new ParentService(http);
    }

    ngOnInit() {       
        this.commonFunction.write('ngOnInit', '');        
        this.studentService = new StudentService(this.http);        
    }      

    public getResponsable1(){
      return this.selectedResponsable1;
    }

    public getResponsable2(){
      return this.selectedResponsable2;
    }

      public loadArrayResponsables1() {
        this.commonFunction.write('loadArrayResponsables1', '');
        /* TODO
        for (var i= 0; i<studentModule.responsable1Array.length; i++) {
          this.responsable1Array.push(studentModule.responsable1Array[i]);
        }
        */
      }

      public loadArrayResponsables2() {
        this.commonFunction.write('loadArrayResponsables2', '');
        /* TODO
        for (var i= 0; i<studentModule.responsable1Array.length; i++) {
          this.responsable1Array.push(studentModule.responsable1Array[i]);
        }
        */
      }


      public syncResponsables1(option: string) {
        this.commonFunction.write('syncResponsables1', option);
        if (option === 'save') {
          // TODO
          // studentModule.setresponsable1Array(this.responsable1Array);
        } else if (option === 'load') {
          this.loadArrayResponsables1();
          this.maxId = this.responsable1Array.length;
        }
        this.commonFunction.write('syncResponsables1', option + ' finished');
      }

      public syncResponsables2(option: string) {
        this.commonFunction.write('syncResponsables2', option);
        if (option === 'save') {
          // TODO
          // studentModule.setresponsable1Array(this.responsable1Array);
        } else if (option === 'load') {
          this.loadArrayResponsables2();
          this.maxId = this.responsable2Array.length;
        }
        this.commonFunction.write('syncResponsables2', option + ' finished');
      }

      private selectResponsable1OK() {
        this.commonFunction.write('selectResponsable1OK', '');        
        for (let i = 0; i < this.responseGET.length; i++) {        
          this.responsable1Array.push(new CStudent(
                                          this.responseGET[i][this.LABELID], 
                                          this.responseGET[i][this.LABELDNI],
                                          this.responseGET[i][this.LABELNAME], 
                                          this.responseGET[i][this.LABELSURNAME],
                                          this.responseGET[i][this.LABELRESPONSABLE1],
                                          this.responseGET[i][this.LABELRESPONSABLE2]));
        }
        //this.showArray();
        this.syncResponsables1('save');
        this.firstLoad();
      }


      private selectResponsable2OK() {
        this.commonFunction.write('selectResponsable1OK', '');        
        for (let i = 0; i < this.responseGET.length; i++) {        
          this.responsable2Array.push(new CStudent(
                                          this.responseGET[i][this.LABELID], 
                                          this.responseGET[i][this.LABELDNI],
                                          this.responseGET[i][this.LABELNAME], 
                                          this.responseGET[i][this.LABELSURNAME],
                                          this.responseGET[i][this.LABELRESPONSABLE1],
                                          this.responseGET[i][this.LABELRESPONSABLE2]));
        }
        //this.showArray();
        this.syncResponsables2('save');
        this.firstLoad();
      }

      public showArray(){
        this.commonFunction.write('showArray', '');        
        for(let i= 0; i< this.responsable1Array.length; i++){
          console.log(this.responsable1Array[i][this.LABELRESPONSABLE1]);
        }
      }

      public async selectResponsable1() {
        this.commonFunction.write('selectResponsable1', '');        
        this.responsableService.getParentsService().subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.selectResponsable1OK();
          this.commonFunction.write('selectResponsable1', 'ok');
        }, response => {
          this.selectResponsable1KO();
          this.commonFunction.write('selectResponsable1', 'ko');
        });
      }

      public async selectResponsable2() {
        this.commonFunction.write('selectResponsable2', '');        
        this.responsableService.getParentsService().subscribe((response: any) => {        
          console.log(response);          
          this.responseGET = response;
          this.selectResponsable2OK();
          this.commonFunction.write('selectResponsable2', 'ok');
        }, response => {
          this.selectResponsable2KO();
          this.commonFunction.write('selectResponsable2', 'ko');
        });
      }

      private selectResponsable1KO() {
        this.commonFunction.write('badResponseGET', '');
      }

      private selectResponsable2KO() {
        this.commonFunction.write('badResponseGET', '');
      }
    
  
      public deleteResponsable1Student(id: number){
        this.commonFunction.write('deleteResponsable1Student', id.toString());    
        let posResponsableStudent= this.responsableInResponsable1Array(id);      
        if (posResponsableStudent > -1){
          this.responsable1Array.splice(posResponsableStudent, 1);
        }
        //this.showResponsablesStudentsArray();
      }
    
      public deleteResponsable2Student(id: number){
        this.commonFunction.write('deleteResponsable1Student', id.toString());    
        let posResponsableStudent= this.responsableInResponsable2Array(id);      
        if (posResponsableStudent > -1){
          this.responsable2Array.splice(posResponsableStudent, 1);
        }
        //this.showResponsablesStudentsArray();
      }

      private showResponsablesStudentsArray(){
        let i= 0;
        while(i< this.responsable1Array.length){
          console.log(this.responsable1Array[i].getId() + ":" + this.responsable1Array[i].getName());
          i++;
        }
        while(i< this.responsable2Array.length){
          console.log(this.responsable2Array[i].getId() + ":" + this.responsable2Array[i].getName());
          i++;
        }
      }
  
      public responsableInResponsable1Array(id: number){
        this.commonFunction.write('responsableInResponsable1Array', id.toString());    
        let i= 0;
        let pos= -1;
        while(i< this.responsable1Array.length && pos===-1){        
          this.responsable1Array[i].getId()===id ? pos = i : null;
          i++;
        }
        return pos;
      }
  
      public responsableInResponsable2Array(id: number){
        this.commonFunction.write('responsableInResponsable2Array', id.toString());    
        let i= 0;
        let pos= -1;
        while(i< this.responsable2Array.length && pos===-1){        
          this.responsable2Array[i].getId()===id ? pos = i : null;
          i++;
        }
        return pos;
      }
  
      public getStringIdFromArray(){      
        let i= 0;            
        let stringList: string= "";
        while(i< this.responsable1Array.length){
          stringList+= this.responsable1Array[i].getId() +"@";
          i++;
        }
        return stringList.slice(0, stringList.length-1);
      }
  

  }
 