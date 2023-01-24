import { getCurrencySymbol } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient:HttpClient) { }
base_url:String="http://localhost:5555/restaurantApp/v1"
cart_url:String="http://localhost:5555/userCart/v1"

 resId:any;
 restaurant:any;
 itemid:any;
 previousRestrnt:any;

addRestaurant(resobj:any){
  console.log(this.base_url+"/addRestaurant",resobj);
return this.httpClient.post(this.base_url+"/addRestaurant",resobj);
}
getRestaurant(){
  return this.httpClient.get(this.base_url+"/getAllRes");
}
deleteRestaurant(resId:any){
  return this.httpClient.delete(this.base_url+"/delete-res/"+resId);
}
updateRestaurant(resobj:any){
  return this.httpClient.put(this.base_url+"/updateres",resobj);
}
addItems(itemobj:any){
  return this.httpClient.post(this.base_url+"/add_item/"+localStorage.getItem('restrntId'),itemobj);
}
add2cart(fooditm:any){
  return this.httpClient.post(this.cart_url+"/add-food-to-cart",fooditm);
}
removeFRMcart(foodId:any){
  return this.httpClient.delete(this.cart_url+"/delete-cartItem-cart/"+localStorage.getItem('email')+"/"+foodId)
}
OrderItems(){
  return this.httpClient.delete(this.cart_url+"/delete-UserCart/"+localStorage.getItem('email'));
}
getCARTitms(){
  return this.httpClient.get(this.cart_url+"/get-foodList-from-cart/"+localStorage.getItem('email'));
}
searchcity(City:any){
  return this.httpClient.get(this.base_url+"/get_restaurants_by_Location/"+City);
}
searchitem(id:any,fd:any){
  return this.httpClient.get(this.base_url+"/get-food-by-name/"+id+"/"+fd);
}


}
