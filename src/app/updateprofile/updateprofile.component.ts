import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { UserService } from '../user.service';

@Component({
  selector: 'app-updateprofile',
  templateUrl: './updateprofile.component.html',
  styleUrls: ['./updateprofile.component.css']
})
export class UpdateprofileComponent implements OnInit {

  constructor(private userService:UserService,private toolbar:ToolbarComponent,private snackbar:MatSnackBar,private router:Router) {
    this.getprofile();
  }
  ngOnInit(): void {
  }
  pic:any;
  profilePic:any;
  name:any;
  getprofile() {
    this.userService.getUser().subscribe(
      response => {
       this.pic=response;
       console.log(this.pic);
       this.profilePic=this.pic.image;
       console.log(this.profilePic);
       this.name=this.pic.fullName;
       console.log(this.name);
       this.getData(this.pic);
      }
    )
  }
      updateForm = new FormGroup(
        {
          'fullName': new FormControl(null, [Validators.required]),
          'emailId': new FormControl(null, [Validators.required ]),
          // 'password': new FormControl(null, [Validators.required ]),
          'mobileNo': new FormControl(null, [Validators.required]),
          address:new FormGroup({
          'houseNo': new FormControl(null, [Validators.required]),
          'street': new FormControl(null, [Validators.required]),
          'pinCode': new FormControl(null, [Validators.required]),
          'city': new FormControl(null, [Validators.required]),
          'state': new FormControl(null, [Validators.required]),
        }),
        // fileSource: new FormControl('', [Validators.required])
        'image': new FormControl('', [Validators.required]),
        }
      )
      enable:boolean=false;
      getData(p:any){
        this.enable=true;
        this.updateForm.setValue(p);
        console.log(this.updateForm.value);
      }
      updateuser(){
        this.userService.updateUser(this.updateForm.value).subscribe(
          response=>{
            // this.getAllDetails();
            this.updateForm.reset();
            this.snackbar.open("profile updated successfully","",{
              duration:2500
             });
             this.router.navigateByUrl('/restaurant');
      }
        )
      }
      myImage!:Observable<any>;
      base64code!:any;
      changeImage(e:any){
        this.image!.setValue(e.target.value, {
          onlySelf: true
         })
      }
      get image(){
        return this.updateForm.get('image');
       }
      onChange($event:Event,e:any) {
        const target=$event.target as HTMLInputElement;
        const file:File=(target.files as FileList)[0];
        console.log(file);
        this.convertToBase64(file);
           }
           convertToBase64(file :File){
            const observable=new Observable ((subscriber:Subscriber<any>)=>{
              this.readFile(file,subscriber);
            })
            observable.subscribe((d)=>{
              //setting value of image here
              this.image!.setValue(d);
               console.log ("key "+ d);
              }
           )
        }
  readFile(file:File,subscriber:Subscriber<any>){
    const filereader=new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload=() =>{
      subscriber.next(filereader.result);
      subscriber.complete();
    }
    filereader.onerror=() =>{
      subscriber.error();
      subscriber.complete();
    }
}
}