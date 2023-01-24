import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { RestaurantService } from '../restaurant.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  constructor(private restService:RestaurantService,private snackbar:MatSnackBar,private router:Router) {
    this.next();
    // this.getpreviousdata();
   }

  ngOnInit(): void {
  }



  itemForm= new FormGroup({
    itemId: new FormControl(''),
    itemName: new FormControl(''),
  foodForm: new FormGroup({
    foodId: new FormControl(''),
   foodName: new FormControl(''),
   description: new FormControl(''),
    foodPrice: new FormControl(''),
    image: new FormControl(null)
  }),
  });

  res:any;
  items:any;
  restrnt:any=this.restService.restaurant;
  count:any=0;
  role:any=localStorage.getItem('role');
  

  
  
  cart= new FormGroup({
    emailId: new FormControl(''),
    foodList: new FormControl('') 
  })

  response:any;
  itemm:any;
  previousformdta:any[]=[];
  previous:any=false;
 
  getpreviousdata(){
    this.response=this.restService.previousRestrnt;
    this.itemm=this.response.items;
    for(let i of this.itemm){
       console.log(i.itemId);
    }
     for(let itm of this.itemm){
      this.itemForm.patchValue({itemId:itm.itemId,itemName:itm.itemName});
      for(let fud of itm.foodList){
        this.itemForm.patchValue({foodForm:{foodId:fud.foodId,foodName:fud.foodName,description:fud.description,foodPrice:fud.foodPrice,image:fud.image}}) 
      }
      console.log(this.itemForm.value);
      console.log("w");
      this.previousformdta.push(this.itemForm.value);
  }   
  for(let f of this.previousformdta){
    console.log(f);
  }          
    
    console.log(this.itemForm.value);
    // this.itemForm.setValue(this.response.items);
    console.log(this.NoofFood.length);
    this.previous=true;
   }
  
  

  NoofFood:any[]=[];
  countt:any=1;

   item=new Item();

  lstOFfoods:any;
  submitting:any=false;

  next(){
    if(this.submitting==false){
   this.count++;
   this.NoofFood.push(this.countt);}    
        if(this.count>1){
        this.item.itemName=this.itemForm.controls['itemName'].value;
        this.item.foodList.push(this.itemForm.controls['foodForm'].value);
        this.lstOFfoods=this.item;
      }
  }

  saveFood(){
   this.submitting=true;
   this.next();
   console.log(this.lstOFfoods);
    this.restService.addItems(this.lstOFfoods).subscribe(
      response=>{
        this.res=response;
        this.snackbar.open('cuisines added into restaurant successfully','',
        {
          duration:4000
        });
        this.itemForm.reset();
      }
    )
  }

 

  searchingItems(text:string)
  {
  if (text.length == 0) {
    return;
  }
  console.log(this.restrnt);
  this.restService.itemid=this.restrnt.restaurantId;
  console.log(this.restService.itemid);
  console.log(text);
  this.router.navigate(['/searchitem', text])
}

  add2crt(fd:any){
    if(localStorage.getItem('jwt')==null){
      this.snackbar.open('sign in to continue....','',{
        duration:2500
      })
      this.router.navigateByUrl('/login');
      
      return;
    }
    this.cart.setValue({emailId:localStorage.getItem('email'),foodList:fd});
    this.restService.add2cart(this.cart.value).subscribe(
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
    
    if(localStorage.getItem('jwt')==null){
      this.snackbar.open('sign in to continue....','',{
        duration:2500
      })
      this.router.navigateByUrl('/login');
     
      return;
    }
    this.restService.removeFRMcart(food.foodId).subscribe(
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

  getCartItms(fdName:any){
    this.count=0;
      this.restService.getCARTitms().subscribe(
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
