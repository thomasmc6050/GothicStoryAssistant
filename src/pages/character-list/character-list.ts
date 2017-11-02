import { Observable } from 'rxjs/Observable';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { CharacterProvider } from '../../providers/character/character';

@IonicPage()
@Component({
  selector: 'page-character-list',
  templateUrl: 'character-list.html'
})
export class CharactersPage {
  public characters: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public characterProvider: CharacterProvider
  ) {}

  ionViewDidLoad() {
    this.characters =
      this.characterProvider.getCharacters().valueChanges();
  }

  createCharacter(): void {
    this.navCtrl.push('CharacterCreatePage');
    }

  goToCharacterSummary(characterId:string): void {
    console.log(characterId);
    this.navCtrl.push('CharacterSummaryPage', { characterId: characterId });
  }

}
