import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient: HttpClient) { }

  base_url:string= "http://localhost:5555/authentication-app/v1"

  // isLoggedIn:boolean=false;
  authentication(userobj:any){
  
    // this.isLoggedIn=true;

    return this.httpClient.post(this.base_url+"/authenticate",userobj);
  }

  resetPassword(details:any){
    console.log(details);
    console.log(this.base_url+"/resetpassword",details);
    return this.httpClient.post(this.base_url+"/resetpassword",details);
  }
}
