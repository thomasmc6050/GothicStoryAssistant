import { Injectable } from '@angular/core';
import firebase from 'firebase';

@Injectable()
export class CharacterProvider {
  public characterListRef: firebase.database.Reference;

  constructor() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.characterListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/characterList`);
      }
    });
  }

  getCharacterList(): firebase.database.Reference {
    return this.characterListRef;
  }

  getCharacterSummary(characterId: string): firebase.database.Reference {
    return this.characterListRef.child(characterId);
  }

  createCharacter(
    characterName: string,
    characterDate: string,
    characterPrice: number,
    characterCost: number
  ): firebase.database.ThenableReference {
    return this.characterListRef.push({
      name: characterName,
      date: characterDate,
      price: characterPrice * 1,
      cost: characterCost * 1,
      revenue: characterCost * -1
    });
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
