import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: string;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.getUserState()
      .subscribe( user => {
          this.user = user.email;
      });
  }

  logOut(){
    this.authService.logOut();
  }

}
