import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>;
  displayName;
  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController,
    private afAuth: AngularFireAuth
    ) {
        afAuth.authState.subscribe(user => {
          if (!user) {
            this.displayName = null;
            return;
          }
          this.displayName = user.displayName;
        });
    //this.items = db.list('cuisine').valueChanges();
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  goToCreate(): void {
    this.navCtrl.push("CharacterCreatePage");
  }

  goToList(): void {
    this.navCtrl.push("CharactersPage");
  }

}
