import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './module-user/views/user.component';
import { TeacherComponent } from './module-teacher/views/teacher.component';
import { ParentComponent } from './module-parent/views/parent.component';
import { StudentComponent } from './module-student/views/student.component';
import { IntoleranceComponent } from './module-intolerance/views/intolerance.component';
import { DishComponent } from './module-dish/views/dish.component';
import { MenuComponent } from './module-menu/views/menu.component';
import { GroupComponent } from './module-group/views/group.component';
import { PsychologistComponent } from './module-psychologist/views/psychologist.component';
import { StaffComponent } from './module-staff/views/staff.component';
import { KindergartenComponent } from './module-kindergarten/views/kindergarten.component';
import { SchoolComponent } from './module-school/views/school.component';
import { MainpaneComponent } from './module-mainpane/views/mainpane.component';
import { CourseComponent } from './module-course/views/course.component';
import { ActivityComponent } from './module-activity/views/activity.component';
import { HomeworkComponent } from './module-homework/views/homework.component';
import { LoginComponent } from './module-login/views/login.component';
import { EnrollmentComponent } from './module-enrollment/views/enrollment.component';
import { FileComponent } from './module-file/views/file.component';
import { AssignmentComponent } from './module-assignment/views/assignment.component';

const appRoutes: Routes = [  
  { path: 'user', component: UserComponent }, 
  { path: 'teacher', component: TeacherComponent }, 
  { path: 'parent', component: ParentComponent }, 
  { path: 'psychologist', component: PsychologistComponent }, 
  { path: 'student', component: StudentComponent }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'intolerance', component: IntoleranceComponent },
  { path: 'kindergarten', component: KindergartenComponent },
  { path: 'mainpane', component: MainpaneComponent },
  { path: 'school', component: SchoolComponent },
  { path: 'dish', component: DishComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'group', component: GroupComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'activity', component: ActivityComponent },
  { path: 'course', component: CourseComponent },
  { path: 'homework', component: HomeworkComponent },
  { path: 'enrollment', component: EnrollmentComponent },
  { path: 'file', component: FileComponent },
  { path: 'assignment', component: AssignmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(
      appRoutes
      //,{ enableTracing: true } // <-- debugging purposes only
      )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
