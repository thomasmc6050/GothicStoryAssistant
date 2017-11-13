import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: Observable<any[]>;
  constructor(
    public db: AngularFireDatabase,
    public navCtrl: NavController
    ){}

  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  goToList(): void {
    this.navCtrl.push("CharactersPage");
  }

}
