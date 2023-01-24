import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-searchitem',
  templateUrl: './searchitem.component.html',
  styleUrls: ['./searchitem.component.css']
})
export class SearchitemComponent implements OnInit {

  searchitem:any;
  resturantid:any;
  constructor(private route:ActivatedRoute,private resservice:RestaurantService,private snackbar:MatSnackBar) {
    this.route.params.subscribe(param => {
      if (param['text']) {
        this.searchitem = param['text'];
        console.log(this.searchitem);
        this.resturantid=this.resservice.itemid;
        console.log(this.resturantid);
        this.searchitems();
      }
    })
  }
  ngOnInit(): void {
  }
  resturantdata:any=this.resservice.restaurant;
  res:any;
 searchitems(){
  this.resservice.searchitem(this.resturantid,this.searchitem).subscribe(
    response=>{
      this.res=response;
      console.log(this.res);
    },
  )
 }

  
 cart= new FormGroup({
  emailId: new FormControl(''),
  foodList: new FormControl('') 
})

add2crt(fd:any){
  this.cart.setValue({emailId:localStorage.getItem('email'),foodList:fd});
  this.resservice.add2cart(this.cart.value).subscribe(
    rspnse=>{
      this.snackbar.open('Added to cart','',{
        duration:3000
      })
      
      this.getCartItms(fd.foodName);
    },
    err=>{
      this.snackbar.open('something went wrong !!','',
      {
        duration:4000
      });
    }
  )
  
}

remove(food:any){
  
  this.resservice.removeFRMcart(food.foodId).subscribe(
    rspnse=>{
       this.snackbar.open('removed from cart','',{
        duration:1500
       })
       this.getCartItms(food.foodName);
    },
    err=>{
      this.snackbar.open('something went wrong  !!','',{
        duration:4000
      })
    }
  )
}

cartItms:any;


foodname:any;
count:any=0;

getCartItms(fdName:any){
  this.count=0;
    this.resservice.getCARTitms().subscribe(
      response=>{
          this.cartItms=response;
          for(let fd of this.cartItms){
            if(fd.foodName==fdName){
              this.count++;
              this.foodname=fd.foodName;
            }
          }
      }
    )
   
   
}
 


}
class Item{
itemId:any;
itemName:any;
foodList:Array<any>=[];
}

