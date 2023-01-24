import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-add-restaurant',
  templateUrl: './add-restaurant.component.html',
  styleUrls: ['./add-restaurant.component.css']
})
export class AddRestaurantComponent implements OnInit {

  constructor( private resService:RestaurantService,private router:Router,private snackbar:MatSnackBar) {this.getpreviousdata(); }

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

  restaurantForm=new FormGroup({
    restaurantId:new FormControl(''),
    restaurantName: new FormControl(''),
  address:new FormGroup({
      city: new FormControl(''),
    state: new FormControl(''),
    area: new FormControl(''),
    pinCode: new FormControl('', [Validators.required,Validators.maxLength(6)]),
    }),
    image: new FormControl(null),
    // items:new FormControl(''),
    rating:new FormControl(''),
    foodType: new FormControl(''),
  
  });

  
  myImage!:Observable<any>;
  base64code!:any;
  changeImage(e:any){
    this.image!.setValue(e.target.value, {
      onlySelf: true
     })
  }
  get image(){
    return this.restaurantForm.get('image');
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
  console.log(filereader.result);
  subscriber.next(filereader.result);
  subscriber.complete();
}
filereader.onerror=() =>{
  subscriber.error();
  subscriber.complete();
}
}

restaurant:any;

save() {
  // this.restaurantForm.patchValue({ image: this.url });
  this.resService.addRestaurant(this.restaurantForm.value).subscribe(
    response => {
      this.snackbar.open("restaurant registered successfully....","",{
        duration:2500
       });
      console.log(response);
      this.restaurant=response;
      this.restaurantForm.reset();
      this.router.navigateByUrl('/items');
        console.log(this.restaurant.restaurantId);
      localStorage.setItem('restrntId',this.restaurant.restaurantId);
    }
  )
}

next(){
  this.router.navigateByUrl('/items');
}

rsspnse:any;

getpreviousdata(){
 console.log(localStorage.getItem('triggered'));
  if(localStorage.getItem('triggered')=='true'){
 this.rsspnse=this.resService.previousRestrnt;
 this.restaurantForm.setValue(this.rsspnse);
 console.log(this.restaurantForm.value);
 console.log(this.rsspnse.items);
 localStorage.setItem('triggered','false');
  }
}


}
interface City {
  value: string;
  viewValue: string;
}
