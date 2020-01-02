import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;

  constructor(
    private fb: FormBuilder
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
  }

}
