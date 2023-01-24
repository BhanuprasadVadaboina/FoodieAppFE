import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { CartComponent } from './cart/cart.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { ItemComponent } from './item/item.component';
import { LoginComponent } from './login/login.component';
import { RecoveruserComponent } from './recoveruser/recoveruser.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { SearchcomponentComponent } from './searchcomponent/searchcomponent.component';
import { SearchitemComponent } from './searchitem/searchitem.component';
import { SignupComponent } from './signup/signup.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';

const routes: Routes = [
  {path:'toolbar',component:ToolbarComponent},
  { path:'login',component:LoginComponent},
  { path:'register',component:SignupComponent},
  {path:'restaurant',component:RestaurantComponent},
  {path:'items',component:ItemComponent},
  {path:'recoverPswrd',component:RecoveruserComponent},
  {path:'cart',component:CartComponent},
  { path:'search/:text',component:SearchcomponentComponent},
  { path:'searchitem/:text',component:SearchitemComponent},
  {path:'add-restaurant',component:AddRestaurantComponent},
  {path:'favourite',component:FavouriteComponent},
{path:'profile',component:UpdateprofileComponent},
{path:'edit-restaurant',component:EditRestaurantComponent},
  { path:"**",component:RestaurantComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
