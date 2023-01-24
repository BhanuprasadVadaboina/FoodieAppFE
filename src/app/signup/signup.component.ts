import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { UserService } from '../user.service';
import { vldtefrstnme } from './validation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  constructor(private authenticateService:UserService,private router:Router,private snackbar:MatSnackBar) {
  }
  ngOnInit(): void {
  }

  selectedValue: any;
  cities: City[] = [
    {value: 'Andhra Pradesh', viewValue: 'Andhra Pradesh'},
    {value: 'Gujarat ', viewValue: 'Gujarat '},
    {value:'Maharashtra', viewValue:'Maharashtra'},
    {value:'Odisha', viewValue:'Odisha'},
    {value: 'Madhya Pradesh', viewValue: 'Madhya Pradesh'},
    {value: 'Uttar Pradesh', viewValue: 'Uttar Pradesh'},
    {value:'West Bengal', viewValue:'West Bengal'},
  ];
  // file!: File;
  // fieldRequired: string = "This field is required"
  // url = "./assets/profileInitial.jpg";
  registerForm = new FormGroup(
    {
      'fullName': new FormControl('',vldtefrstnme()),
      'emailId': new FormControl('', [Validators.required,Validators.email]),
      'password': new FormControl('', [Validators.required ]),
      'mobileNo': new FormControl('', [Validators.required,Validators.maxLength(10),Validators.minLength(10)]),
      address:new FormGroup({
      'houseNo': new FormControl('', [Validators.required]),
      'street': new FormControl('', [Validators.required]),
      'pinCode': new FormControl('', [Validators.required,Validators.maxLength(6)]),
      'city': new FormControl('', [Validators.required]),
      'state': new FormControl('', [Validators.required]),
    }),
    // fileSource: new FormControl('', [Validators.required])
    'image': new FormControl('', [Validators.required]),
    }
  )
  myImage!:Observable<any>;
  base64code!:any;
  changeImage(e:any){
    this.image!.setValue(e.target.value, {
      onlySelf: true
     })
  }
  get image(){
    return this.registerForm.get('image');
   }
  onSubmit(){
    this.authenticateService.registeruser(this.registerForm.value).subscribe(
        response=>{
          console.log(response)
          // alert('user register sucessfully');
          this.snackbar.open("registered successfully","",{
            duration:3000
           });
          this.registerForm.reset();
          this.router.navigateByUrl('login')
        },
        (error) => {
          console.log(error);
        }
      );
      }
      //  imageUrl: any;
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
  get mobileNo(){
    return this.registerForm.controls['mobileNo'];
   }
   get houseNo(){
    return this.registerForm.get('address.houseNo');
   }
   get street(){
    return this.registerForm.get('address.street');
   }
   get pinCode(){
    return this.registerForm.get('address.pinCode');
   }
   get city(){
    return this.registerForm.get('address.city');
   }
   get state(){
    return this.registerForm.get('address.state');
   }
   get password(){
    return this.registerForm.controls['password'];
   }
   get fullName(){
    return this.registerForm.controls['fullName']
   }
   get emailId(){
    return this.registerForm.controls['emailId']
   }
}
interface City {
  value: string;
  viewValue: string;
}
