import { AngularFireAuth } from 'angularfire2/auth';
//import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class CharacterProvider {
  //  public charactersRef: firebase.database.Reference;
  public characters: AngularFireList<any>;
  public activeCharacter: AngularFireList<any>;
  private navCtrl: NavController;
  public userId: string;
//  public userName: string;
//  public profileRef: firebase.database.Reference;
  constructor(
    public afDatabase: AngularFireDatabase,
    public afAuth: AngularFireAuth
  ) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
        /*
        this.characters = this.afDatabase.list("characters", ref =>
          ref.orderByChild("lastName" + "firstName" + "middleName")
        );
        this.profileRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}`);
        this.userName = this.profileRef.child('firstName').toString;
        */
      }
    });

    //this.afDatabase.database().ref('\userProfile\${user.uid}')
  }

  ionViewDidEnter() {
    this.characters = this.afDatabase.list("characters", ref =>
      ref.orderByChild("lastName" + "firstName" + "middleName")
    );
  }

  getCharacters(): AngularFireList<any> {
    return (this.characters = this.afDatabase.list("characters", ref =>
      ref.orderByChild("lastName" + "firstName" + "middleName")
    ));
    //this.characters;
  }

  getCharacter(characterId: string): AngularFireObject<any> {
    return this.afDatabase.object(`/characters/${characterId}`);
    //.characters.child(characterId);
  }

  getMyCharacter(myCharacterId: string): AngularFireObject<any> {
    return this.afDatabase.object(`/characters/${myCharacterId}`);
    //.update(characterId, {isActive: false});
    // log this
  }
  /*
          this.newCharacterForm.value.firstName,
          this.newCharacterForm.value.middleName,
          this.newCharacterForm.value.lastName,
          this.newCharacterForm.value.characterType,
          this.newCharacterForm.value.enteredPlayOnDate
*/
  createCharacter(
    firstName: string,
    middleName: string = null,
    lastName: string,
    characterType: string,
    enteredPlayOnDate: string = null
  ): Promise<any> {
    const newCharacterRef: firebase.database.ThenableReference = this.characters.push(
      {}
    );
    console.log(firstName, middleName, lastName, characterType, enteredPlayOnDate);
    return newCharacterRef.set({
      firstName,
      middleName,
      lastName,
      characterName: firstName + " " + lastName,
      characterType,
      enteredPlayOnDate,
      playerId: this.userId,
      playerName: null,
      characterStatus: "Active",
      characterId: newCharacterRef.key
    });
  }

  // log this

  retireCharacter(characterId: string, characterStatus: string): Promise<any> {
    // Validate user is Admin or Player
    // Works for both retired and temporarily shelved characters

    return this.characters
      .update(characterId, characterStatus)
      .then(retiredCharacter => {
        this.navCtrl.pop();
        console.log("Character " + characterStatus + ", Id: " + characterId);
      });

    // log this to characterAudit
  }
}
