import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CharacterProvider } from "../../providers/character/character";

@IonicPage()
@Component({
  selector: "page-character-create",
  templateUrl: "character-create.html"
})
export class CharacterCreatePage {
  public newCharacterForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public characterProvider: CharacterProvider,
    private formBuilder: FormBuilder

  ) {
    this.newCharacterForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      middleName: ["", Validators.required],
      lastName: ["", Validators.required],
      characterType: ["", Validators.required],
      enteredPlayOnDate: ["", Validators.required]
    });
  }

  logForm() {
    console.log(this.newCharacterForm.value);
  }

  createCharacter() {
    if (!this.newCharacterForm.valid) {
      this.logForm();
    } else {
      this.characterProvider
        .createCharacter(
          this.newCharacterForm.value.firstName,
          this.newCharacterForm.value.middleName,
          this.newCharacterForm.value.lastName,
          this.newCharacterForm.value.characterType,
          this.newCharacterForm.value.enteredPlayOnDate
        )
        .then(
          () => {
            this.navCtrl.pop();
          },
          error => {
            console.error(error);
          }
        );
    }
  }
}
