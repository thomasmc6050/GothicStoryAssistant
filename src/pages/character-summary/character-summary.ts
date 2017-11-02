import { Observable } from 'rxjs/Observable';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CharacterProvider } from "../../providers/character/character";
//import { AngularFireObject } from 'angularfire2/database';

@IonicPage({
  segment: 'character/:characterId'
})
@Component({
  selector: 'page-character-summary',
  templateUrl: 'character-summary.html'
})
export class CharacterSummaryPage {
  public character: Observable<any>;
  public characterId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public characterProvider: CharacterProvider
  ) {}

  ionViewDidEnter() {
    console.log('summary view-did-enter');
    this.characterId = this.navParams.get('characterId');
    console.log("characterId:"+this.characterId);
    this.character = this.characterProvider.getCharacter(this.characterId).valueChanges();
  }
}
