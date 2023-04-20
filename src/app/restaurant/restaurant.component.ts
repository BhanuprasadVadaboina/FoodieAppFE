import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FavoriteService } from '../favorite.service';
import { RestaurantService } from '../restaurant.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  constructor(private resService:RestaurantService,private favService:FavoriteService,private router:Router,private snackbar:MatSnackBar) {
    this.getAllRestaurant();
    this.getFavorite();
   }

   

 
  ngOnInit(): void {
  }
  imageData: any;
  file:any;
  url:string="";
  role:any=localStorage.getItem('role');
  
  

  restaurantForm=new FormGroup({
    restaurantName: new FormControl(''),
   
  address:new FormGroup({
      city: new FormControl(''),
    state: new FormControl(''),
    area: new FormControl(''),
    pinCode: new FormControl(''),
    }),
    image: new FormControl(''),
    foodType:new FormControl(''),
    rating:new FormControl('')
    
  
  });

  imge:any=this.restaurantForm.get('image');
  save(form: FormGroup){

    console.log(typeof this.url);
    this.restaurantForm.patchValue({image:this.url});
    console.log(this.restaurantForm.value);
this.resService.addRestaurant(this.restaurantForm.value).subscribe(
  response=>{
    alert('data added successfully');
    console.log(response);
    this.restaurantForm.reset();
    
  }
)    

  }
 
  onFileSelect(e: any) {
    if (e.target.files) {
      //  var file = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      console.log(e.target.files[0]);
      reader.onload = (event: any) => {
        this.url = event.target.result;
        console.log(this.url);
   
      }
    }

  }

  hover:boolean=true;



  

  restaurants:any;
  res_sNo:any=0;
  cnt:any=0;

  getAllRestaurant(){
   
    try{
    this.resService.getRestaurant().subscribe(
      response=>{
        this.restaurants=response;
        console.log(this.restaurants);
        // this.res_sNo=this.restaurants.length;
        for(let no of this.restaurants){
          this.cnt++;
          this.restaurants.sno=this.cnt;
      }
      console.log(this.restaurants.sno)
      
      }
    
    )
        
    console.log(localStorage.getItem('role'));
    }
    catch(error)
    {
      console.log(error);
    }
   
  }

  update(restaurant:any){
    this.resService.previousRestrnt=restaurant;
    localStorage.setItem('triggered','true');
    console.log(localStorage.getItem('triggered'));

    this.router.navigateByUrl('/edit-restaurant');
   
      console.log(restaurant);
  }

  delete(restid:any){
    this.resService.deleteRestaurant(restid).subscribe(
      respnse=>{
        this.snackbar.open("Restaurant deleted successfully","",{
          duration:2500
         });
         this.getAllRestaurant();
      },
      errr=>{
        this.snackbar.open("something went wrong !!","",{
          duration:2000
         });
      }
    )
  }

 
 

  favoriteForm=new FormGroup({
    email:new FormControl(''),
    restaurantId:new FormControl('')
  })

  adminRes(){
    this.router.navigateByUrl('/add-restaurant');
  }

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
    if(localStorage.getItem('jwt')==null){
      this.snackbar.open('sign in to continue....','',{
        duration:2500
      })
      this.router.navigateByUrl('/login');
      return;
    }
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
                  }
                )
            }
  }

 


  items(restaurant:any){
    this.resService.restaurant=restaurant;
  }

  searchingItems(text:string)
  {
  if (text.length == 0) {
    return;
  }
  console.log(text);
  this.router.navigate(['/search', text])
  }
  

}
class restaurants{
  sno:any;
}
