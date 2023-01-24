import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../favorite.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(private resservice:RestaurantService,private favservice:FavoriteService,private router:Router) {this.getFavorite();}

  ngOnInit(): void {
  }

  items(restaurant:any){
    this.resservice.restaurant=restaurant;
    this.router.navigateByUrl('/items');
  }

  getfavrites:any;
  getFavorite(){
    this.favservice.getFavorites(localStorage.getItem('email')).subscribe(
      rspnse=>{
        this.getfavrites=rspnse;
        console.log(rspnse);
        for(let fv of this.getfavrites){
          console.log(fv.restaurantId);
        }
      }
    )
  }
  delete(id:any){
    this.favservice.deleteFavorite(id).subscribe(
      rspnse=>{
        alert("Resturant deleted from favroite");
        this.getFavorite();
      }
    )
  }

}
