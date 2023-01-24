import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';


@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  constructor(private router:Router,private userService:UserService) {

    this.getprofile();
   }

  ngOnInit(): void {
  
  let logged:string|null = localStorage.getItem('email')
      if (logged == null) {
        this.isLoggedIn = false
      } else {
        this.isLoggedIn = true
      }
    }
    role:any=localStorage.getItem('role');
  isLoggedIn:boolean=false;

  logout(){
    
    localStorage.clear();
    this.isLoggedIn=false;
    alert('user sucessfully logout');
   
    this.router.navigateByUrl("/resturant")
    window.location.reload();
    }

  
  selectedValue: any;
  searchingItems(text:string)
  {
  if (text.length == 0) {
    return;
  }
  console.log(text);
  this.router.navigate(['/search', text])
}


profiledta:any;
profilePic:any;
name:any=localStorage.getItem('usrnme');
address:any;


getprofile() {
  this.userService.getUser().subscribe(
    response => {
     this.profiledta=response;
     console.log(this.profiledta);
     localStorage.setItem('usrnme',this.profiledta.fullName);
     this.address=this.profiledta.address;
     localStorage.setItem('city',this.address.city);
     localStorage.setItem('state',this.address.state);
     localStorage.setItem('houseNo',this.address.houseNo);
     localStorage.setItem('pinCode',this.address.pinCode);
     localStorage.setItem('street',this.address.street);
     localStorage.setItem('phoneNo',this.profiledta.mobileNo);
     console.log(this.profiledta.mobileNo);

     this.profilePic=this.profiledta.image;
     console.log(this.profilePic);
    //  this.name=localStorage.getItem('usrnme');
     console.log(this.name);
     
    }
  )
}
profile(){
  this.router.navigateByUrl('/profile');
  console.log('hii')
}
}
