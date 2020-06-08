import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import CommonFunction from '../common/common-functions';

@Component({
  selector: 'app-kindergarten',
  templateUrl: '../module-base/views/base.component.html',
  styleUrls: ['../module-base/views/base.component.scss']
})
export class LoginService {  

  protected commonFunction: CommonFunction;
  
  private nameEntity: String = 'login';
  private params: String = '';

  baseURLBack = 'http://localhost/chat-back-php';  

  constructor(private http: HttpClient) {
    this.commonFunction= new CommonFunction(); 
    this.commonFunction.write('constructor '+this.nameEntity+'Service', '');
  }

  public tryLoginService(username:string, password:string) {   
    this.params = 'username=' + username + '&password=' + password;
    this.commonFunction.write('try' + this.nameEntity + 'Service', this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/login.php?'+ this.params);     
    return this.http.get(this.commonFunction.getBaseURL() + '/' + this.nameEntity + '/login.php?' + this.params);
  } 

}