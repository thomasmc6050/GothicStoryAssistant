import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { CharacterProvider } from "../../providers/character/character";

@IonicPage()
@Component({
  selector: "page-character-create",
  templateUrl: "character-create.html"
})
export class CharacterCreatePage {
  constructor(
    public navCtrl: NavController,
    public characterProvider: CharacterProvider
  ) {}

  createCharacter(
    characterName: string,
    characterDate: string,
    characterPrice: number,
    characterCost: number
  ): void {
    this.characterProvider
      .createCharacter(characterName, characterDate, characterPrice, characterCost)
      .then(newCharacter => {
        this.navCtrl.pop();
      });
  }
}
