import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }


  get formControls() {
    return this.loginForm.controls;
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  getErrorMessage() {
    return this.formControls.email.hasError('required') ? 'You must enter a value' :
      this.formControls.email.hasError('email') ? 'Not a valid email' :
        '';
  }

  onSubmit() {
    console.log(this.loginForm.get('email').value);
    this.authService.login(this.loginForm.value.email, this.loginForm.value.password)
      .then( res => {
        console.log('logged!');
        this.router.navigate(['/home']);
        this.flashMessage.show('Logging successfully!' ,{
          cssClass: 'alert-success', timeout: 4000
        });
      })
      .catch( err => {
        console.log(err.message);
        this.flashMessage.show(err.message ,{
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

}
