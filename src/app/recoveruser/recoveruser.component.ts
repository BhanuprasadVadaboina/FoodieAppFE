import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RecoverService } from '../recover.service';

@Component({
  selector: 'app-recoveruser',
  templateUrl: './recoveruser.component.html',
  styleUrls: ['./recoveruser.component.css']
})
export class RecoveruserComponent implements OnInit {

  constructor(private recoverservice:RecoverService,private authenticateservice:AuthenticationService,private snackbar:MatSnackBar,private router:Router) { }

  ngOnInit(): void {
  }

  recoverForm=new FormGroup({
    emailId:new FormControl('')
  })

  emaildetailsForm=new FormGroup({
    recipient:new FormControl(''),
    msgbody:new FormControl(''),
    subject:new FormControl(''),
    attachment:new FormControl('')
  })

  object:any;
  text:String="";
  sixteenCde:any=0;

  recover(){
        this.emaildetailsForm.patchValue({
          recipient:this.recoverForm.controls['emailId'].value
        })
        this.recoverservice.sendpswrdtomail(this.emaildetailsForm.value).subscribe(
          rspnse=>{
            this.snackbar.open('Otp sent to your mail succesfully','',{
              duration:2500
             })
            this.object=rspnse;
            this.text=this.object.text;
            const ary=this.text.split(" ");
            for(let st of ary){
              if(st.length==16){
                  this.sixteenCde=st;
              }
            }
            console.log(this.sixteenCde);
          }
        )
       
  }

  recoverpswrd=new FormGroup({
    emailId:new FormControl(''),
    otp:new FormControl(''),
    password:new FormControl('')
  })

  resetpswrd=new FormGroup({
    emailId:new FormControl(''),
    password:new FormControl('')
  })


  recvrpswrd(){
    var op=this.recoverpswrd.get('otp')?.value;
    console.log(op);
    if(op==this.sixteenCde){
      this.resetpswrd.patchValue({emailId:this.recoverpswrd.get('emailId')?.value,password:this.recoverpswrd.get('password')?.value})
      this.authenticateservice.resetPassword(this.resetpswrd.value).subscribe(
        repnse=>{
          console.log(repnse);
          this.snackbar.open('Password changed succesfully','',{
            duration:2500
           })
           this.recoverpswrd.reset();
           this.router.navigateByUrl('/login');

        }
      )
    }
    else{
      console.log("enter the correct otp");
    }
  }

}
