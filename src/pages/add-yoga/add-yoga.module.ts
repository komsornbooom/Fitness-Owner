import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddYogaPage } from './add-yoga';

@NgModule({
  declarations: [
    AddYogaPage,
  ],
  imports: [
    IonicPageModule.forChild(AddYogaPage),
  ],
})
export class AddYogaPageModule {}
