import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ProfileProvider } from './../../providers/profile/profile';
import { CharacterProvider } from "../../providers/character/character";

@IonicPage()
@Component({
  selector: "page-character-create",
  templateUrl: "character-create.html"
})
export class CharacterCreatePage {
  public newCharacterForm : FormGroup

  constructor(
    public navCtrl: NavController,
    public characterProvider: CharacterProvider,
    private formBuilder: FormBuilder,
    private profileProvider: ProfileProvider
  ) {
    this.newCharacterForm = this.formBuilder.group({
//      title: ['', Validators.required],
//      description: [''],
    });
  }

  logForm(){
    console.log(this.newCharacterForm.value)
  }

  createCharacter(
    firstName: string,
    middleName: string = null,
    lastName: string,
    characterType: string,
    attestationDate: string = null,
    playerName: string = this.profileProvider.currentUser.displayName,
    playerId: string = this.profileProvider.currentUser.uid,
    enteredPlayOnDate: string = null,
    characterStatus: string = 'Active'
  ): void {
    this.characterProvider
      .createCharacter(
        firstName,
        middleName,
        lastName,
        characterType,
        playerName,
        playerId,
        enteredPlayOnDate,
        characterStatus
      )
      .then(newCharacter => {
        this.navCtrl.pop();
      });
  }
}
