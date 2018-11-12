import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FindmemberPage } from '../findmember/findmember';
import { ScanPage } from '../scan/scan';
import 'firebase/firestore';
import { AddCousePage } from '../add-couse/add-couse';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams) {
  }
  imgscan() {
    this.navCtrl.push(ScanPage);
  }
  imgfind() {
    this.navCtrl.push(FindmemberPage);
  }
  imgAdd() {
    this.navCtrl.push(AddCousePage);
  }
  pushPageHome() {
    this.navCtrl.setRoot(HomePage);
  }
}
