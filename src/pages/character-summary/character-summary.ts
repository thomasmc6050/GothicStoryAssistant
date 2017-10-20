import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CharacterProvider } from "../../providers/character/character";
import { Camera } from "@ionic-native/camera";

@IonicPage({
  segment: "character-summary/:characterId"
})
@Component({
  selector: "page-character-summary",
  templateUrl: "character-summary.html"
})
export class CharacterSummaryPage {
  public currentCharacter: any = {};
  public guestName: string = "";
  public guestPicture: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public characterProvider: CharacterProvider,
    public cameraPlugin: Camera
  ) {}

  ionViewDidLoad() {
    this.characterProvider
      .getCharacterSummary(this.navParams.get("characterId"))
      .on("value", characterSnapshot => {
        this.currentCharacter = characterSnapshot.val();
        this.currentCharacter.id = characterSnapshot.key;
      });
  }

  addGuest(guestName: string): void {
    this.characterProvider
      .addGuest(
        guestName,
        this.currentCharacter.id,
        this.currentCharacter.price,
        this.guestPicture
      )
      .then(newGuest => {
        this.guestName = "";
        this.guestPicture = null;
      });
  }

  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        targetWidth: 500,
        targetHeight: 500,
        saveToPhotoAlbum: true
      })
      .then(
        imageData => {
          this.guestPicture = imageData;
        },
        error => {
          console.log("ERROR -> " + JSON.stringify(error));
        }
      );
  }
}
