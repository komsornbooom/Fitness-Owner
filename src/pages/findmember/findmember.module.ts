import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FindmemberPage } from './findmember';

@NgModule({
  declarations: [
    FindmemberPage,
  ],
  imports: [
    IonicPageModule.forChild(FindmemberPage),
  ],
})
export class FindmemberPageModule {}
