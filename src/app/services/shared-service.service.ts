import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  isloggedIn:boolean=false;
  constructor() { }
  loggedin(){
    this.isloggedIn=true
  }
  loggedout(){
    this.isloggedIn=false
  }
  getname(){
    const value=sessionStorage.getItem('name');
    return value;
  }
  private userNameSubject = new BehaviorSubject<string>('');
  public get userName() {
    return this.userNameSubject.asObservable();
  }

  public setUserName(userName: string) {
    this.userNameSubject.next(userName);
  }
}
