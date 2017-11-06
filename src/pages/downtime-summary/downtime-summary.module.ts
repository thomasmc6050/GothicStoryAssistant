import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DowntimeSummaryPage } from './downtime-summary';

@NgModule({
  declarations: [
    DowntimeSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(DowntimeSummaryPage),
  ],
})
export class DowntimeSummaryPageModule {}
