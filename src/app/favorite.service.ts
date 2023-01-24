import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  constructor(private httpclient:HttpClient) { }
  base_url:String="http://localhost:5555/favourite/v1"

  saveFavorite(restaurant:any){
    console.log(restaurant);
    return this.httpclient.post(this.base_url+"/add-restaurant",restaurant);
  }

  getFavorites(email:any){
    console.log(this.base_url+"/get-All-FavRestaurants/"+email);
    return this.httpclient.get(this.base_url+"/get-All-FavRestaurants/"+email);
  }

  deleteFavorite(restId:any){
    return this.httpclient.delete(this.base_url+"/deletefavresturant/"+localStorage.getItem('email')+"/"+restId);
  }
}
