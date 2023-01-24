import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-edit-restaurant',
  templateUrl: './edit-restaurant.component.html',
  styleUrls: ['./edit-restaurant.component.css']
})
export class EditRestaurantComponent implements OnInit {

  constructor(private resservice:RestaurantService,private router:Router,private snackbar:MatSnackBar) { this.getpreviousdata()}

  ngOnInit(): void {
  }

  restaurantForm=new FormGroup({
    restaurantId:new FormControl(''),
    restaurantName: new FormControl(''),
  address:new FormGroup({
      city: new FormControl(''),
    state: new FormControl(''),
    area: new FormControl(''),
    pinCode: new FormControl(''),
    }),
    image: new FormControl(null),
    items:new FormControl(''),
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
  this.resservice.updateRestaurant(this.restaurantForm.value).subscribe(
    response => {
      console.log(response);
      this.restaurant=response;
      this.restaurantForm.reset();
      // this.router.navigateByUrl('/items');
        console.log(this.restaurant.restaurantId);
      localStorage.setItem('restrntId',this.restaurant.restaurantId);
      this.snackbar.open("restaurant details updated successfully.....","",{
        duration:3000
       });
      
    }
  )
}

next(){
  this.router.navigateByUrl('/items');
}

rsspnse:any;

getpreviousdata(){
 console.log(localStorage.getItem('triggered'));
//  console.log(this.edit);
  if(localStorage.getItem('triggered')=='true'){
 this.rsspnse=this.resservice.previousRestrnt;
 this.restaurantForm.setValue(this.rsspnse);
 console.log(this.restaurantForm.value);
 console.log(this.rsspnse.items);
 localStorage.setItem('triggered','false');
  }
}
}
