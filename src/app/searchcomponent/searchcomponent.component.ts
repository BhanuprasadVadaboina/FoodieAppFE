import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FavoriteService } from '../favorite.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-searchcomponent',
  templateUrl: './searchcomponent.component.html',
  styleUrls: ['./searchcomponent.component.css']
})
export class SearchcomponentComponent implements OnInit {

  searchcity:any;
  constructor(private route:ActivatedRoute,private resservice:RestaurantService,private router:Router,private favService:FavoriteService,private snackbar:MatSnackBar) {
    this.route.params.subscribe(param => {
      if (param['text']) {
        this.searchcity = param['text'];
        console.log(this.searchcity);
        this.searchbycity();
      }
    })
   }

  ngOnInit(): void {
  }
  res:any;
 searchbycity(){
  this.resservice.searchcity(this.searchcity).subscribe(
    response=>{
      this.res=response;
      console.log(this.res);
    },
    errr=>{
      this.router.navigateByUrl("/noresturant")
      alert("No resturant present");
    }
  )
 }

 restaurants:any;
  res_sNo:any;

  getAllRestaurant(){
    this.resservice.getRestaurant().subscribe(
      response=>{
        this.restaurants=response;
        console.log(this.restaurants);
        this.res_sNo=this.restaurants.length;
      }
    
    )
   
  }

  update(restaurant:any){
      console.log(restaurant);
  }

  delete(restid:any){
    console.log("deleted");
  }

 
 

  favoriteForm=new FormGroup({
    email:new FormControl(''),
    restaurantId:new FormControl('')
  })

  status:any=false;

  getfavrites:any;
  resId:any;
  addfav:any=true;

  
  getFavorite(){
    this.favService.getFavorites(localStorage.getItem('email')).subscribe(
      rspnse=>{
        this.getfavrites=rspnse;
        console.log(rspnse);
      }
     
    )
}
 

  favorite(restaurantId:any){
           this.addfav=true;
    
            this.favoriteForm.setValue({
              email:localStorage.getItem('email'),
              restaurantId:restaurantId
            })

            this.getFavorite();
  
            if(this.getfavrites!=undefined){
            for(let fv of this.getfavrites){
                if(fv.restaurantId==restaurantId){
                  this.favService.deleteFavorite(restaurantId).subscribe(
                    respnse=>{
                       this.status=false;  
                       this.snackbar.open("Restaurant removed from the favorite secton","",{
                        duration:2000
                       });
                    }
                  )
                 this.addfav=false;
                 this.getFavorite();
                }
            }
          }
         
            if(this.addfav==true){
                this.favService.saveFavorite(this.favoriteForm.value).subscribe(
                  response=>{
                       this.snackbar.open("Restaurant added in favorite section","",{
                        duration:2500
                       })
                       this.status=true;      
                       this.resId=restaurantId;
                       this.getFavorite();
                  },
                  errr=>{
                    alert("id exists");
                  }
                )
            }
  }

 


  items(restaurant:any){
    this.resservice.restaurant=restaurant;
  }



  

}
