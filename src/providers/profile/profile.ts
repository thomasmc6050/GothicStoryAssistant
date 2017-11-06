import firebase from "firebase/app";
import { Injectable } from '@angular/core';
import { ToastController } from "ionic-angular";
import { AngularFireObject,
         AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class ProfileProvider {
  //  public afAuth: AngularFireAuth;
  //  public auth: AuthProvider;
  public user: firebase.User;
  public userObject: AngularFireObject<any>;
  public userRef: firebase.database.Reference;
  private userId: string = null;

  constructor(
    public afAuth: AngularFireAuth,
    public af: AngularFireDatabase,
    public toastCtrl: ToastController
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        this.user = afAuth.auth.currentUser;
        this.userRef = firebase.database().ref(`/userProfile/${user.uid}/`);
        this.userObject = af.object(`/userProfile/${user.uid}/`);
      }
    });
  }

  getUserRef(): firebase.database.Reference {
    return this.af.database.ref(`/userProfile/` + this.userId + `/`);
  }
  // No edits below

  updateName(
    firstName: string,
    lastName: string,
    playerName: string = null
  ): Promise<any> {
    playerName = firstName + " " + lastName;
    return this.userObject.update({ firstName, lastName, playerName });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      password
    );
    return this.user
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.user.updateEmail(newEmail).then(user => {
          this.userObject.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 4000,
          position: "middle",
          showCloseButton: true
        });
        toast.present();
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential = firebase.auth.EmailAuthProvider.credential(
      this.user.email,
      oldPassword
    );

    return this.user
      .reauthenticateWithCredential(credential)
      .then(user => {
        this.user.updatePassword(newPassword).then(user => {
          console.log("Password Changed");
        let toast = this.toastCtrl.create({
          message: 'Password Changed',
          duration: 2000,
          position: "middle",
          showCloseButton: true
        });
        toast.present();
        });
      })
      .catch(error => {
        console.error(error);
        let toast = this.toastCtrl.create({
          message: error.message,
          duration: 4000,
          position: "middle",
          showCloseButton: true
        });
        toast.present();
      });
  }
}
