import { Component, OnInit } from '@angular/core';
import { FormControl,  FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import jwt_decode from 'jwt-decode';
import { ToolbarComponent } from '../toolbar/toolbar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationservice:AuthenticationService,private router:Router,private toolbar:ToolbarComponent) { }

  ngOnInit(): void {
  }

  failed:Boolean=false;

  loginForm=new FormGroup({
    "emailId":new FormControl,
    "password": new FormControl
  })

  Otoken:any;

  decoded:any;

resp:any;
  onSubmit(){
    console.log(localStorage.getItem('jwt'));
    this.authenticationservice.authentication(this.loginForm.value).subscribe(
      response=>{
        console.log(response);
        this.resp= response;
       this.Otoken=this.resp.token;
        this.decoded=jwt_decode(this.Otoken);
        localStorage.setItem('email',this.decoded.userObject.emailId);
        localStorage.setItem('jwt',this.resp.token);
        console.log(this.decoded.userObject.role);
        localStorage.setItem('role',this.decoded.userObject.role);
        this.toolbar.getprofile();
        this.failed=false;
        this.loginForm.reset();
        this.toolbar.isLoggedIn=true;
        this.router.navigateByUrl("/restaurant");
      },
      err=>{
        this.failed=true;
      }
  
    );
   

  }
}
