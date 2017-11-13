//import { ActionSheetOptions } from '@ionic-native/action-sheet';
//import { ActionSheet } from '@ionic-native/action-sheet';
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
  ) //    private actionSheet: ActionSheet

  {
    this.newCharacterForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      middleName: ["", Validators.required],
      lastName: ["", Validators.required],
      characterType: ["", Validators.required],
      enteredPlayOnDate: ["", Validators.required]
    });
  }
  /*
 -- EXAMPLE OF NATIVE ACTIONSHEET
  async showActionSheet(buttonLabels: string[]){
    try {
          //    let buttonLabels = ["Share via Facebook", "Share via Twitter"];

          const options: ActionSheetOptions = { title: "What do you want with this image?", subtitle: "Choose an action", buttonLabels: buttonLabels, addCancelButtonWithLabel: "Cancel", addDestructiveButtonWithLabel: "Delete", androidTheme: this.actionSheet.ANDROID_THEMES.THEME_HOLO_DARK, destructiveButtonLast: true };

          const selectedButtonIndex = await this.actionSheet.show(options);
          console.log('The user selected: ${selectedButtonIndex}');

          switch (selectedButtonIndex) {
            case 1:
              break;

            default:
              break;
          }


          this.actionSheet.show(options).then((buttonIndex: number) => {
            console.log("Button pressed: " + buttonIndex);
          });
        } catch (error) {
            console.error(error);
    }
  }
*/

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
