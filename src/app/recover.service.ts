import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecoverService {

  constructor(private httpclient:HttpClient) { }

  baseUrl:any="http://localhost:8080/email_notification/v1";

  sendpswrdtomail(details:any){
    console.log(details);
   return  this.httpclient.post(this.baseUrl+"/recoverpassword",details);
  }
}
