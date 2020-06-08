import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import CommonFunction from './common/common-functions';
import { LanguageService } from './services/language.service';
import { SessionService } from './services/session.service';
import CUser from './classes/user.class';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./module-base/views/base.component.scss']
})
export class AppComponent {
  public title = 'myplaygroup-front-angular'; 

  private showingMenu: boolean= false;

  protected commonFunction: CommonFunction;  

  public OPTUSERS: number= 1;
  public OPTSUPERADMINCONFIG: number= 2;
  public OPTKINDERGARTENS: number= 3;
  public OPTSCHOOLS: number= 4;
  public OPTCOURSES: number= 5;
  public OPTGROUPS: number= 6;
  public OPTTEACHERS: number= 7;
  public OPTSTAFF: number= 8;
  public OPTPSYCHOLOGISTS: number= 9;  
  public OPTMENUS: number= 10;  
  public OPTDISHES: number= 11;  
  public OPTINTOLERANCES: number= 12;  
  public OPTSTUDENTS: number= 13;  
  public OPTACTIVITIES: number= 14;  
  public OPTHOMEWORKS: number= 15;  
  public OPTPARENTS: number= 16;  
  public OPTPAYMENTS: number= 17;  
  public OPTCOURSESENROLLMENTS: number= 18;  
  public OPTSTAFFREGISTRATION: number= 19;  
  public OPTPSYCHOLOGISTSREGISTRATION: number= 20;  
  public OPTMENUASSIGNMENT: number= 21;  
  public OPTACTIVITIESINSCRIPTION: number= 22;  
  public OPTMYGROUP: number= 23;  
  public OPTCOURSEREGISTRATION: number= 24;  
  public OPTPARENTSCHAT: number= 25;  
  public OPTTUTORCHAT: number= 26;  
  public OPTUPLOADPICTURE: number= 27;  
  public OPTAPPOINMENTPSYCHOLOGIST: number= 28;  
  public OPTAPPOINMENTTUTOR: number= 29;  

  public LABELLANGENG: string= 'ENG';
  public LABELLANGSPA: string= 'SPA';

  private languageService: LanguageService;
  public sessionService: SessionService;

  constructor(private meta: Meta, private router : Router) {
    this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });        
    this.commonFunction= new CommonFunction(); 
    this.languageService= new LanguageService();
    this.sessionService= new SessionService();
  }

  ngOnInit() {       
    this.commonFunction.write('ngOnInit','appComponent');
    this.commonFunction.write('ngOnInit', this.router.toString());
    //console.log(this.router);
    //console.log(this.router.routerState.snapshot.url.toString());
    ( this.commonFunction.getStorage('userLogged') === null || this.commonFunction.getStorage('userLogged') === undefined ) ?
      this.router.navigateByUrl('login') : null;
  }

  ngOnChanges(){
    console.log(this.commonFunction.getStorage('userLogged'));
  }

  public getLabel(label: string){    
    return this.languageService.getWord(Number(this.commonFunction.getStorage('currentLanguage')), label);
  } 
  
  public changeLang(lang: string){
    this.commonFunction.write('changeLang', lang);
    this.commonFunction.setStorage('currentLanguage', this.setValueOfLang(lang).toString());                
    //TODO--call to a new service to register the new favourite language    
  }

  public getLangSelected(){
    this.commonFunction.write('getLangSelected', this.commonFunction.getStorage('userLogged')['favouriteLang']);
    switch(this.commonFunction.getStorage('userLogged')['favouriteLang'].toString()){
      case '1':
        this.commonFunction.write('getLangSelected', 'ENG');
        return 'ENG';
        break;
      case '2':
        this.commonFunction.write('getLangSelected', 'SPA');
        return 'SPA';
        break;
      default:
        this.commonFunction.write('getLangSelected', 'NADA');
        break;
    }
  }

  private setValueOfLang(lang: string){
    switch(lang){
      case 'ENG':
          return 1;
          break;
      case 'SPA':
          return 2;
          break;
      default:
          return -1;
          break;          
    }
  }  
 
  public logout(){
    this.commonFunction.write('logout', '');         
    this.commonFunction.remoteStorage('userLogged');
    this.commonFunction.remoteStorage('studentSelected');
    this.commonFunction.remoteStorage('currentLanguage');
    this.commonFunction.remoteStorage('menuCollapsed');
    this.router.navigateByUrl('login');
  }

  public getUserloggedname(){
    //return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['name'].toString()) : null;         
    if(this.commonFunction.getStorage('userLogged')!=null){
      switch(this.commonFunction.getStorage('userLogged')['idType'].toString()){
        case '2': 
          return this.commonFunction.getStorage('userLogged')['username'].toString();
          break;
        default: 
          return this.commonFunction.getStorage('userLogged')['name'].toString();
          break;
      }
    }
  }

  public getNameSchool(){
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['nameSchool'].toString()) : false;        
  }

  public isVisibleOptionMenu(idOption: number){
    switch(idOption) {
      case this.OPTUSERS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;
      case this.OPTSUPERADMINCONFIG:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true);
        break;
      case this.OPTKINDERGARTENS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true);
        break;
      case this.OPTSCHOOLS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true);
        break;     
      case this.OPTCOURSES:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true);
        break;
      case this.OPTGROUPS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;             
      case this.OPTTEACHERS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;
      case this.OPTSTAFF:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true) || this.sessionService.isUserAdministator()===true;
        break;       
      case this.OPTPSYCHOLOGISTS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;       
      case this.OPTMENUS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTDISHES:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTINTOLERANCES:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTSTUDENTS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;       
      case this.OPTACTIVITIES:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTHOMEWORKS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTPARENTS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;     
      case this.OPTPAYMENTS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserResponsable()===true);
        break;   
      case this.OPTCOURSESENROLLMENTS:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;     
      case this.OPTSTAFFREGISTRATION:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;        
      case this.OPTPSYCHOLOGISTSREGISTRATION:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true);
        break;       
      case this.OPTMENUASSIGNMENT:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTACTIVITIESINSCRIPTION:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserAdministator()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTMYGROUP:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserTeacher()===true);
        break;       
      case this.OPTCOURSEREGISTRATION:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true);
        break;       
      case this.OPTPARENTSCHAT:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserResponsable()===true);
        break;     
      case this.OPTTUTORCHAT:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserResponsable()===true || this.sessionService.isUserTeacher()===true);
        break;     
      case this.OPTUPLOADPICTURE:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserResponsable()===true || this.sessionService.isUserTeacher()===true);
        break;     
      case this.OPTAPPOINMENTPSYCHOLOGIST:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserResponsable()===true || this.sessionService.isUserPsycologist()===true);
        break;     
      case this.OPTAPPOINMENTTUTOR:
        return (this.sessionService.isUserSuperadmin()===true || this.sessionService.isUserDemo()===true || this.sessionService.isUserResponsable()===true || this.sessionService.isUserTeacher()===true);
        break;  
      default:
        return false;
        break;       
    }
  }

  public hideMenu() {    
    (this.commonFunction.getStorage('menuCollapsed')===true) ? 
      this.commonFunction.setStorage('menuCollapsed', false) : this.commonFunction.setStorage('menuCollapsed', true);
  }

  public isShowingMenu(){
    return this.commonFunction.getStorage('menuCollapsed');
  }

}
