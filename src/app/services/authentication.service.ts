import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor(private http:HttpClient) { }

  login(data :any): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/login', data).pipe(
      map((response: any) => {
        // this.setLocals(data.user, data.token, data.role);
        sessionStorage.setItem('userData', response)
        return response;
      })
    );
  }

  register(data:any): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/register', data).pipe(
      map((response) => {
        // this.setLocals(data.user, data.token, data.role);
        return response;
      })
    );
  }
  
  getotp(data:any): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/forgotPassword', data).pipe(
      map((response) => {
        return response;
      })
    );
  }
  reset(data:any): Observable<any> {
    return this.http.post<any>(environment.apiURL + '/resetPassword', data).pipe(
      map((response) => {
        return response;
      })
    );
  }
  

}
