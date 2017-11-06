import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from "../pages/home/home";
import { ListPage } from '../pages/list/list';
import { ProfilePage } from '../pages/profile/profile';

//import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

//import { FIREBASE_CREDENTIALS } from './credentials';


@Component({
  selector: "page-menu",
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

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
/*
    firebase.initializeApp(FIREBASE_CREDENTIALS);

  const unsubscribe = firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      this.rootPage ='LoginPage';
      unsubscribe();
    } else {
      this.rootPage = HomePage;
      unsubscribe();
    }
  });
*/
//    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Profile', component: ProfilePage }
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
