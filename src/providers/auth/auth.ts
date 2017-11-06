import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  public userId: string = null;
  public userObject: AngularFireObject<any>;
  public userRef: firebase.database.Reference;
  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.userObject = af.object(`/userProfile/${user.uid}/`);
      }
    });
  }

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
  }

  getUserObject(): AngularFireObject<any> {
    return this.userObject;
  }

  getUserRef(): firebase.database.Reference {
    return this.af.database.ref('/userProfile/${user.uid}');
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signupUser(email: string, password: string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(newUser => {
        this.af.object(`/userProfile/${newUser.uid}/`).set({
          admin: false,
          email
        });
      })
      .catch(error => console.error(error));
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  isAdmin(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`userProfile/${this.userId}/admin`)
        .once("value", adminSnapshot => {
          resolve(adminSnapshot.val());
        });
    });
  }
}
