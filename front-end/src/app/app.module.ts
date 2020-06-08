import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BaseComponent } from './module-base/views/base.component';
import { UserComponent } from './module-user/views/user.component';
import { TeacherComponent } from './module-teacher/views/teacher.component';
import { ParentComponent } from './module-parent/views/parent.component';
import { StudentComponent } from './module-student/views/student.component';
import { IntoleranceComponent } from './module-intolerance/views/intolerance.component';
import { DishComponent } from './module-dish/views/dish.component';
//import { DishRelationsComponent } from './module-dish/views/dish.relations';
import { MenuComponent } from './module-menu/views/menu.component';
import { GroupComponent } from './module-group/views/group.component';
//import { MenuRelationsComponent } from './module-menu/views/menu.relations';
//import { StudentRelationsComponent } from './module-student/views/student.relations';
import { PsychologistComponent } from './module-psychologist/views/psychologist.component';
import { KindergartenComponent } from './module-kindergarten/views/kindergarten.component';
import { SchoolComponent } from './module-school/views/school.component';
import { StaffComponent } from './module-staff/views/staff.component';
import { FileComponent } from './module-file/views/file.component';
import { MainpaneComponent } from './module-mainpane/views/mainpane.component';
import { AssignmentComponent } from './module-assignment/views/assignment.component';
import { CourseComponent } from './module-course/views/course.component';
import { ActivityComponent } from './module-activity/views/activity.component';
import { HomeworkComponent } from './module-homework/views/homework.component';
import { EnrollmentComponent } from './module-enrollment/views/enrollment.component';
import { LoginComponent } from './module-login/views/login.component';
import { UserService } from './services/user.service';
import { IntoleranceService } from './services/intolerance.service';
import { DishService } from './services/dish.service';
import { MenuService } from './services/menu.service';
import { SessionService } from './services/session.service';
import { GroupService } from './services/group.service';
import { HomeworkService } from './services/homework.service';
import { TeacherService } from './services/teacher.service';
import { ParentService } from './services/parent.service';
import { StudentService } from './services/student.service';
import { KindergartenService } from './services/kindergarten.service';
import { PsychologistService } from './services/psychologist.service';
import { StaffService } from './services/staff.service';
import { SchoolService } from './services/school.service';
import { CourseService } from './services/course.service';
import { LanguageService } from './services/language.service';
import { ActivityService } from './services/activity.service';
import { LoginService } from './services/login.service';
import { EnrollmentService } from './services/enrollment.service';

@NgModule({
  declarations: [
    AppComponent,
    BaseComponent,
    UserComponent,
    TeacherComponent,
    IntoleranceComponent,
    KindergartenComponent,
    DishComponent,
    MainpaneComponent,
    //DishRelationsComponent,
    SchoolComponent,
    EnrollmentComponent,
    FileComponent,
    PsychologistComponent,    
    LoginComponent,
    MenuComponent,
    ParentComponent,
    AssignmentComponent,
    StudentComponent,
    //StudentRelationsComponent,
    //MenuRelationsComponent,
    HomeworkComponent,
    CourseComponent,
    StaffComponent,
    GroupComponent,
    ActivityComponent,
    UserService,
    ParentService,
    StudentService,
    IntoleranceService,
    KindergartenService,
    LoginService,
    DishService,
    EnrollmentService,
    MenuService,
    SessionService,
    GroupService,
    TeacherService,
    HomeworkService,
    LanguageService,
    PsychologistService,
    StaffService,
    SchoolService,
    CourseService,
    ActivityService
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
