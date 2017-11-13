import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from "../pages/home/home";
// import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';

//import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

//import { FIREBASE_CREDENTIALS } from './credentials';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string, iconOutline: string}>;

  constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      afAuth: AngularFireAuth
    ) {

      const authListener = afAuth.authState.subscribe(user => {
        if (user) {
          this.rootPage = HomePage;
          authListener.unsubscribe();
        } else {
          this.rootPage = 'LoginPage';
          authListener.unsubscribe();
        }
      });


    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Event', component: HomePage, icon: 'calendar', iconOutline: 'false'},
      { title: 'Downtime', component: 'DowntimePage', icon: 'walk', iconOutline: 'true'},
      { title: 'Item Transfer', component: '', icon: 'shirt', iconOutline: 'false'},
      { title: 'Troop Movement', component: '', icon: 'people', iconOutline: 'true'},
      { title: 'Profile', component: ProfilePage, icon: 'contact', iconOutline: 'true'}
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.splashScreen.show();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
