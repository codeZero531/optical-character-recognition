import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {User} from '../../models/User';
import {Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  newUser: User;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService

  ) { }

  ngOnInit() {

    this.registerForm = this.fb.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }
  getErrorMessage() {
    return this.formControls.email.hasError('required') ? 'You must enter a value' :
      this.formControls.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  get formControls() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.newUser = {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
    };

    this.authService.register(this.newUser)
      .then( res => {
        // console.log(res);
        this.flashMessage.show('Register successfully!', {
          cssClass: 'alert-success', timeout: 5000
        });
        this.router.navigate(['/login']);
      })
      .catch(err => {
        console.log(err.message);
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 5000
        });
      });

  }

}
