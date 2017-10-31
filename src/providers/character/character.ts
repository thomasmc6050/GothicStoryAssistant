import { Observable } from 'rxjs/Observable';
import { NavController } from 'ionic-angular';
//import { NavParams } from 'ionic-angular';
import { Injectable } from '@angular/core';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList
} from 'angularfire2/database';
import * as firebase from 'firebase/app';


@Injectable()
export class CharacterProvider {
  public charactersRef: firebase.database.Reference;
  public characters: AngularFireList<any>;
  public activeCharacter: AngularFireList<any>;
  public navCtrl: NavController;
  constructor(
    public afDatabase: AngularFireDatabase

  ) {
/*    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.charactersRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/characters`);
      }
    });
*/
  }

  ionViewDidEnter(){
    this.characters = this.afDatabase.list(
      'characters', ref => ref.orderByChild('lastName'+'firstName'+'middleName')
    );
  }

  getCharacters(): AngularFireList<any> {
    return this.characters = this.afDatabase.list(
      'characters', ref => ref.orderByChild('lastName'+'firstName'+'middleName')
    );
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


  createCharacter(
    firstName: string,
    middleName: string = null,
    lastName: string,
    fullName: string = firstName+" "+middleName+" "+lastName,
    characterType: string,
    playerName: string = null,
    playerId: string = null,
    enteredPlayOnDate: string = null,
    characterStatus: string = 'Active',
    characterPicture: string = null
  ): Promise<any> {
    const newCharacterRef: firebase.database.ThenableReference = this.characters.push({});
    return newCharacterRef.set({
      firstName,
      middleName,
      lastName,
      fullName,
      characterType,
      playerName,
      playerId,
      enteredPlayOnDate,
      characterStatus,
      characterPicture,
      characterId: newCharacterRef.key
    });
  }

    // log this

  retireCharacter(characterId: string, characterStatus: string): Promise<any> {

    // Validate user is Admin or Player
    // Works for both retired and temporarily shelved characters

    return this.characters.update(characterId, characterStatus)
    .then( retiredCharacter => {
        this.navCtrl.pop();
        console.log('Character '+characterStatus+', Id: '+characterId);
    });

    // log this to characterAudit
  }
}
