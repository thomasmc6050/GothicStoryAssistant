import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DowntimeDetailPage } from './downtime-detail';

@NgModule({
  declarations: [
    DowntimeDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(DowntimeDetailPage),
  ],
})
export class DowntimeDetailPageModule {}
