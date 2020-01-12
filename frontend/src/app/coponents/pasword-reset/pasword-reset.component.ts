import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-pasword-reset',
  templateUrl: './pasword-reset.component.html',
  styleUrls: ['./pasword-reset.component.css']
})
export class PaswordResetComponent implements OnInit {

  passwordResetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.passwordResetForm = this.fb.group({
      email: [''],
    });
  }

  get formControls() {
    return this.passwordResetForm.controls;
  }

  onSubmit() {
    this.authService.passwordReset(this.passwordResetForm.get('email').value);
  }

}
