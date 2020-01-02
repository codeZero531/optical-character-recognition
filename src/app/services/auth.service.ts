import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import { Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  getUserState(): Observable<any> {
    return this.afAuth.authState;
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => {
          resolve(userData);

      }, err => reject(err));
    });
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.router.navigate(['/login']);

  }
}
