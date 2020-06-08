import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
  selector: 'app-kindergarten',
  templateUrl: '../module-base/views/base.component.html',
  styleUrls: ['../module-base/views/base.component.scss']
})
export class SessionService {  

  protected commonFunction: CommonFunction;
  
  private nameEntity: String = 'session';
  private params: String = '';

  baseURLBack = 'http://localhost/chat-back-php';  
  
  public USERSUPERADMIN: String = '1';
  public USERADMINISTRATOR: String = '2';
  public USERTEACHER: String = '3';
  public USERPSYCHOLOGIST: String = '4';
  public USERRESPONSABLE: String = '5';
  public USERDEMO: String = '99';

  constructor() {
    this.commonFunction= new CommonFunction(); 
    this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
  }

  public isUserSuperadmin(){    
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['idType'].toString()===this.USERSUPERADMIN) : false;        
  }

  public isUserAdministator(){    
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['idType'].toString()===this.USERADMINISTRATOR) : false;        
  }

  public isUserTeacher(){    
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['idType'].toString()===this.USERTEACHER) : false;        
  }

  public isUserPsycologist(){    
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['idType'].toString()===this.USERPSYCHOLOGIST) : false;        
  }

  public isUserResponsable(){    
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['idType'].toString()===this.USERRESPONSABLE) : false;        
  }

  public isUserDemo(){    
    return (this.commonFunction.getStorage('userLogged')!=null) ? (this.commonFunction.getStorage('userLogged')['idType'].toString()===this.USERDEMO) : false;        
  }

  public isUserLogged(){    
    return !(this.commonFunction.getStorage('userLogged') === null);
  }

}