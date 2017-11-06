import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DowntimeCharacterPage } from './downtime-character';

@NgModule({
  declarations: [
    DowntimeCharacterPage,
  ],
  imports: [
    IonicPageModule.forChild(DowntimeCharacterPage),
  ],
})
export class DowntimeCharacterPageModule {}
