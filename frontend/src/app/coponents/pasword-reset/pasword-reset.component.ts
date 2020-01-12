import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from '../../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Router} from "@angular/router";

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
    private flashMessage: FlashMessagesService,
    private router: Router
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
    this.authService.passwordReset(this.passwordResetForm.get('email').value)
      .then( res => {
        this.flashMessage.show('please check your inbox', {
          cssClass: 'alert-success', timeout: 4000
        });
        this.router.navigate(['/login']);
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }

}
