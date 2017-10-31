import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthProvider {
  public userId: string = null;

	constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {this.userId = user.uid;}
    })
  }

  getUser(): firebase.User {
    return this.afAuth.auth.currentUser;
    }


	loginUser(email: string, password: string): Promise<any> {
		return this.afAuth.auth.signInWithEmailAndPassword(email, password);
	}

	signupUser(email: string, password: string): Promise<any> {
		return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(newUser => {
      this.afDatabase.object(`/userProfile/${newUser.uid}/`).set({
        admin: false,
        email
        });

//			firebase
//			.database()
//			.ref(`/userProfile/${newUser.uid}/email`)
//			.set(email);
		})
		.catch(error => console.error(error));
	}

	//resetPassword(email:string):firebase.Promise<void> {
	resetPassword(email:string):Promise<void> {
		return this.afAuth.auth.sendPasswordResetEmail(email);
	}

	//logoutUser(): firebase.Promise<void> {
	logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
	}

  isAdmin(): Promise<any> {
    return new Promise((resolve, reject) => {
      firebase
        .database()
        .ref(`userProfile/${this.userId}/admin`)
        .once('value', adminSnapshot => {
          resolve(adminSnapshot.val());
      });
    });
  }
}
