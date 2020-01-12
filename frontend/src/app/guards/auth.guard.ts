import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';
import {map} from 'rxjs/operators';
import {FlashMessagesService} from 'angular2-flash-messages';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private flashMessage: FlashMessagesService
  ) {
  }
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(map((auth) => {
      if (!auth) {
        this.router.navigate(['login']);
        this.flashMessage.show('Pleas login!', {
          cssClass: 'alert-danger' , timeout: 2000
        });
        return false;
      } else {
        return true;
      }
    }));
  }

}
