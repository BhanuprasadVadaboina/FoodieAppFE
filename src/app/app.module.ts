import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { ItemComponent } from './item/item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {  MatSnackBarModule } from '@angular/material/snack-bar';
import { RecoveruserComponent } from './recoveruser/recoveruser.component';
import {MatSelectModule} from '@angular/material/select';
import { CartComponent } from './cart/cart.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { AddRestaurantComponent } from './add-restaurant/add-restaurant.component';
import { SearchcomponentComponent } from './searchcomponent/searchcomponent.component';
import { SearchitemComponent } from './searchitem/searchitem.component';
import { FavouriteComponent } from './favourite/favourite.component';
import { EditRestaurantComponent } from './edit-restaurant/edit-restaurant.component';
import {MatPaginatorModule} from '@angular/material/paginator';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    RestaurantComponent,
    ItemComponent,
    ToolbarComponent,
    RecoveruserComponent,
    CartComponent,
    UpdateprofileComponent,
    AddRestaurantComponent,
    SearchcomponentComponent,
    SearchitemComponent,
    FavouriteComponent,
    EditRestaurantComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatCardModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule,
    MatSelectModule,
    MatPaginatorModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
