//import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Component
//       , ViewChild
       } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  NavController,
  NavParams
} from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
//import { CharacterProvider } from '../../providers/character/character';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile: any;
  public activeCharacterId: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    public profileProvider: ProfileProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage ');
    this.profileProvider.getUserRef().on('value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
//      this.activeCharacterId = userProfileSnapshot.val().activeCharaterId;
    });
  }

  logOut(): void {
    this.authProvider.logoutUser().then(() => {
      this.navCtrl.setRoot('LoginPage');
    });
  }


  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: 'Your first name & last name',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Your first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Your last name',
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Your new email'
        },
        {
          name: 'password',
          placeholder: 'Your password',
          type: 'password'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider
              .updateEmail(data.newEmail, data.password)
              .then(() => {
                console.log('Email Changed Successfully');
              })
              .catch(error => {
                console.log('ERROR: ' + error.message);
              });
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        {
          name: 'newPassword',
          placeholder: 'Your new password',
          type: 'password'
        },
        {
          name: 'oldPassword',
          placeholder: 'Your old password',
          type: 'password'
        }
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }

}
