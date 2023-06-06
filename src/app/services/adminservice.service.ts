import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminserviceService  implements OnInit{

  constructor(private http:HttpClient) { }
 
  ngOnInit(): void {
  }
  getAllUsers(pagenumber:number,pagesize:number,searchtext:string): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + sessionStorage.getItem("admintoken")?.toString()
      })
    };
    return this.http.get<any>(environment.apiURL + '/users/getAllUsers?page='+pagenumber+'&size='+pagesize+'&searchText='+searchtext,httpOptions).pipe(
        map((data) => {
          return data;
        })
      );
  }
  submitScreens(data:any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + sessionStorage.getItem("admintoken")?.toString()
      })
    };
    return this.http.post<any>(environment.apiURL + '/users/addScreens', data,httpOptions).pipe(
      map((response) => {
        return response;
      })
    );
  }
  getAllScreens(employeeId:any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + sessionStorage.getItem("admintoken")?.toString()
      })
    };
    return this.http.get<any>(environment.apiURL + '/users/getAllScreens?employeeID='+employeeId,httpOptions).pipe(
        map((data) => {
          return data;
        })
      );
  }
  UsergetAllScreens(employeeId:any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + sessionStorage.getItem("token")?.toString()
      })
    };
    return this.http.get<any>(environment.apiURL + '/users/getAllScreens?employeeID='+employeeId,httpOptions).pipe(
        map((data) => {
          return data;
        })
      );
  }

  statusToggle(data:any): Observable<string> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': "Bearer " + sessionStorage.getItem("admintoken")?.toString()
      })
    };
    return this.http.post<any>(environment.apiURL + '/users/activate/deactivateEmployee',data,httpOptions).pipe(
        map((data) => {
          return data;
        })
      );
  }
  // statusToggle(employeeId:any,activestatus:boolean): Observable<string> {
  //   const httpOptions = {
  //     headers: new HttpHeaders({
  //       'Authorization': "Bearer " + sessionStorage.getItem("admintoken")?.toString()
  //     })
  //   };
  //   debugger
  //   return this.http.put<any>(environment.apiURL + '/users/activate/deactivateEmployee?employeeID='+employeeId+'&status='+activestatus,httpOptions).pipe(
  //     map((data) => {
  //       return data;
  //     })
  //   );
  // }
}
