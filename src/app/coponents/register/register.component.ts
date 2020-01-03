import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
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

}
