import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private restrntSrvce:RestaurantService,private router:Router,private snackbar:MatSnackBar) {
    this.getCARTitms();
   }

  ngOnInit(): void {
  }

  city:any=localStorage.getItem('city');
  state:any=localStorage.getItem('state');
  houseNo:any=localStorage.getItem('houseNo');
  pinCode:any=localStorage.getItem('pinCode');
  street:any=localStorage.getItem('street');
  phoneNo:any=localStorage.getItem('phoneNo');

  cartitms:any;
  count:any=0;
  foodNme:any;
  orders:any[]=[];
  fudId:any[]=[];
  total:any=0;
  seno:any=0;

  getCARTitms(){
     this.restrntSrvce.getCARTitms().subscribe(
      response=>{
         
        this.cartitms=response;
        const map=new Map<string,number>();
        const map2=new Map<string,number>();
        
        for(let itms of this.cartitms){
          if(map.has(itms.foodName)){
            let value: number=map.get(itms.foodName)!;
            map.set(itms.foodName,value+1);
            map2.set(itms.foodName,itms.foodPrice);
          }
          else{
            map.set(itms.foodName,1);
            map2.set(itms.foodName,itms.foodPrice);
          }
        }
        
        map.forEach((value:number,key:string)=>{
          this.seno++;
          const ordr=new Order();
           ordr.foodName=key;
          ordr.quantity=value;
          ordr.price=map2.get(key);
          ordr.totalPrice=ordr.quantity*ordr.price;
          this.total=this.total+ordr.totalPrice;
          ordr.sno=this.seno;
          this.orders.push(ordr);
          // console.log(`${key}:${value}`);
        })

        
        // for(let itms of this.cartitms){
        //   if(this.fudId.indexOf(itms.foodId)<0){
        //         for(let itm of this.cartitms){
        //           if(itms.foodId==itm.foodId){
        //               this.count++;
        //           }
        //         }
        //         this.seno++;
        //         this.fudId.push(itms.foodId);
        //         this.foodNme=itms.foodName;
        //         const ordr=new Order();
        //         ordr.foodId=itms.foodId;
        //         ordr.foodName=this.foodNme;
        //         ordr.quantity=this.count;
        //         ordr.price=itms.foodPrice;
        //         ordr.totalPrice=ordr.quantity*ordr.price;
        //         this.total=this.total+ordr.totalPrice;
        //         ordr.sno=this.seno;
        //         this.orders.push(ordr);
        //         this.count=0;
                
        //   }
        // }
      }
    )
  }
  done:Boolean=false;
  pay(){
    
    this.restrntSrvce.OrderItems().subscribe(
      rspnse=>{
        console.log("ordered");
        this.done=true;
      }
    )
      this.snackbar.open('Order Placed Successfully','',{
      duration:3500
     })
     window.location.reload();
  }

}
class Order{
  foodId:any;
  foodName:String="";
  quantity:any=0;
  price:any=0;
  totalPrice:any=0;
  sno:number=0;
}
