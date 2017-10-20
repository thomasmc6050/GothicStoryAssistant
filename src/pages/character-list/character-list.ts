import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CharacterProvider } from '../../providers/character/character';

@IonicPage()
@Component({
  selector: 'page-character-list',
  templateUrl: 'character-list.html'
})
export class CharacterListPage {
  public characterList: Array<any>;

  constructor(
    public navCtrl: NavController,
    public characterProvider: CharacterProvider
  ) {}

  ionViewDidLoad() {
    this.characterProvider.getCharacterList().on('value', characterListSnapshot => {
      this.characterList = [];
      characterListSnapshot.forEach(snap => {
        this.characterList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
        return false;
      });
    });
  }

  goToCharacterSummary(characterId): void {
    this.navCtrl.push('CharacterSummaryPage', { characterId: characterId });
  }
}
