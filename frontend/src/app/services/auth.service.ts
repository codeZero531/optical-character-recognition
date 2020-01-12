import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../models/User';
import {AngularFirestore} from '@angular/fire/firestore';
import {FlashMessagesService} from "angular2-flash-messages";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private flashMessage: FlashMessagesService
  ) {
  }

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

  register(user) {
    return new Promise((resolve, reject) => {
      this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
        .then(
          userData => {
            resolve(userData);
            this.newUser = user;
            userData.user.updateProfile({displayName: user.name});
            this.insertUserData(userData);
          },
          err => reject(err)
        );
    });
  }

  insertUserData(userCredential: firebase.auth.UserCredential) {
    return this.db.doc(`Users/${userCredential.user.uid}`).set({
      email: this.newUser.email,
      name: this.newUser.name,
      password: this.newUser.password
    });
  }

  logOut() {
    this.afAuth.auth.signOut().then();
    this.router.navigate(['/login'])
      .then(() => {
        window.location.reload();
      });

  }

  passwordReset(email: string): Promise<any> {
    return this.afAuth.auth.sendPasswordResetEmail(email)
      .then( res => {
        this.flashMessage.show('please check your inbox', {
          cssClass: 'alert-success', timeout: 4000
        });
      })
      .catch(err => {
        this.flashMessage.show(err.message, {
          cssClass: 'alert-danger', timeout: 4000
        });
      });
  }
}
