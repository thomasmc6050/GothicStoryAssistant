import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DowntimeListPage } from './downtime-list';

@NgModule({
  declarations: [
    DowntimeListPage,
  ],
  imports: [
    IonicPageModule.forChild(DowntimeListPage),
  ],
})
export class DowntimeListPageModule {}
