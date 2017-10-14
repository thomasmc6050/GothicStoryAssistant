import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterCreatePage } from './character-create';

@NgModule({
  declarations: [
    CharacterCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterCreatePage),
  ],
})
export class CharacterCreatePageModule {}
