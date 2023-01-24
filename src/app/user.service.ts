import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }


base_url:string="http://localhost:2233/user-service/v1"

registeruser(userobj:any){
  return this.httpClient.post(this.base_url+"/add-user",userobj);

}
getUser(){
  return this.httpClient.get(this.base_url+"/get-user/"+localStorage.getItem('email'));
}
updateUser(userObj:any){
  return this.httpClient.put(this.base_url+"/update-user/",userObj);
}


}
