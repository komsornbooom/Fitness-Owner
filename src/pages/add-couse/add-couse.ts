import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AddAerobicPage } from '../add-aerobic/add-aerobic';
import { AddYogaPage } from '../add-yoga/add-yoga';

/**
 * Generated class for the AddCousePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-couse',
  templateUrl: 'add-couse.html',
})
export class AddCousePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddCousePage');
  }
  imgaerobic() {
    this.navCtrl.push(AddAerobicPage);

  }

  imgyoga() {
    this.navCtrl.push(AddYogaPage);
  }

}
