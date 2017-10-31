//import { Observable } from 'rxjs/Observable';
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CharacterProvider } from "../../providers/character/character";
import { AngularFireObject } from 'angularfire2/database';

@IonicPage({
  segment: "character-summary/:characterId"
})
@Component({
  selector: "page-character-summary",
  templateUrl: "character-summary.html"
})
export class CharacterSummaryPage {
  public character: AngularFireObject<any>;
  public characterId: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public characterProvider: CharacterProvider,
  ) {}

  ionViewDidEnter() {
    this.characterId = this.navParams.get('characterId');
    this.character = this.characterProvider.getCharacter(this.characterId);
  }
}
