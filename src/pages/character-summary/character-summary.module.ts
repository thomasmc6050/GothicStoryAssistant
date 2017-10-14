import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CharacterSummaryPage } from './character-summary';

@NgModule({
  declarations: [
    CharacterSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(CharacterSummaryPage),
  ],
})
export class CharacterSummaryPageModule {}
