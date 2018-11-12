import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddCousePage } from './add-couse';

@NgModule({
  declarations: [
    AddCousePage,
  ],
  imports: [
    IonicPageModule.forChild(AddCousePage),
  ],
})
export class AddCousePageModule {}
