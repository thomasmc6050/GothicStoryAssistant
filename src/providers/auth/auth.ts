import { Injectable } from '@angular/core';
import firebase from 'firebase';
//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class AuthProvider {
	constructor() {}

	loginUser(email: string, password: string): Promise<any> {
		return firebase.auth().signInWithEmailAndPassword(email, password);
	}

	signupUser(email: string, password: string): Promise<any> {
		return firebase
		.auth()
		.createUserWithEmailAndPassword(email, password)
		.then(newUser => {
			firebase
			.database()
			.ref(`/userProfile/${newUser.uid}/email`)
			.set(email);
		})
		.catch(error => console.error(error));
	}

	//resetPassword(email:string):firebase.Promise<void> {
	resetPassword(email:string):Promise<void> {
		return firebase.auth().sendPasswordResetEmail(email);
	}

	//logoutUser(): firebase.Promise<void> {
	logoutUser(): Promise<void> {
		const userId: string = firebase.auth().currentUser.uid;
		firebase
			.database()
			.ref(`/userProfile/${userId}`)
			.off();
		return firebase.auth().signOut();
	}

}