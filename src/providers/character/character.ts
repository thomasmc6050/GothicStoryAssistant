import { NavController } from 'ionic-angular';
import { Injectable, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class CharacterProvider {
  public characterListRef: firebase.database.Reference;
  public characterList: AngularFireList<any>;
  public activeCharacter: AngularFireList<any>;
  public userId: string;
  constructor(
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    public navCtrl: NavController
  ) {
/*    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.characterListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/characterList`);
      }
    });
*/
    this.afAuth.authState.subscribe(user => {
      this.userId = user.uid;
      this.activeCharacter = this.afDatabase.list('/userProfile/${user.uid}/activeCharacter');
    });
  }

  getCharacterList(): AngularFireList<any> {
    return this.characterList;
  }

  getCharacter(characterId: string): AngularFireObject<any> {
    return this.afDatabase.object(`/characterList/${characterId}`);
    //.characterList.child(characterId);
  }


  getMyCharacter(myCharacterId: string): AngularFireObject<any> {
    return this.afDatabase.object(`/characterList/${myCharacterId}`);
    //.update(characterId, {isActive: false});
    // log this
  }


  createCharacter(
    firstName: string,
    middleName: string = null,
    lastName: string,
    characterType: string,
    playerName: string = null,
    playerId: string = null,
    enteredPlayOnDate: string = null,
    isActive: boolean = true
  ): Promise<any> {
    const newCharacterRef: firebase.database.ThenableReference = this.characterList.push({});
    return newCharacterRef.set({
      firstName,
      middleName,
      lastName,
      characterType,
      playerName,
      playerId,
      enteredPlayOnDate,
      isActive,
      characterId: newCharacterRef.key
    });
    // log this
  }

  retireCharacter(characterId: string): Promise<any> {

    // Validate user is Admin or Player

    return this.characterList.update(characterId, {isActive: false})
    .then( retiredCharacter => {

        this.navCtrl.pop();
        console.log('Character Retired');
    });

    // log this to characterAudit
  }

  addGuest(
    guestName: string,
    characterId: string,
    characterPrice: number,
    guestPicture: string = null
  ): PromiseLike<any> {
    return this.characterListRef
      .child(`${characterId}/guestList`)
      .push({ guestName })
      .then(newGuest => {
        this.characterListRef.child(characterId).transaction(character => {
          character.revenue += characterPrice;
          return character;
        });
        if (guestPicture != null) {
          firebase
            .storage()
            .ref(`/guestProfile/${newGuest.key}/profilePicture.png`)
            .putString(guestPicture, 'base64', { contentType: 'image/png' })
            .then(savedPicture => {
              this.characterListRef
                .child(`${characterId}/guestList/${newGuest.key}/profilePicture`)
                .set(savedPicture.downloadURL);
            });
        }
      });
  }
}
