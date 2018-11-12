import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import 'firebase/firestore';
import firebase from 'firebase';
import * as moment from 'moment';
import { MenuPage } from '../menu/menu'

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  uid;
  count: number = 1;
  scannedCode = null;
  name: string = '';
  gender: string = '';
  weight: string = '';
  height: string = '';
  email: string = '';
  today = moment().format('YYYY-MM-DD');
  timedate = new Date().toLocaleString();
  constructor(public db: AngularFireDatabase, public alertCtrl: AlertController,
     public navCtrl: NavController, public navParams: NavParams, 
     private barcodeScanner: BarcodeScanner) {
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanPage');
  }
  scanCode() {
    let dbs = firebase.firestore();
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
      dbs.collection("Register").doc(this.scannedCode).get().then((doc) => {
        if (doc.exists) {
          console.log("Document name:", doc.data().name);
          console.log("Document :", this.scannedCode);
          this.name = doc.data().name;
          this.db.list('users/' + doc.data().sid + '/' + this.scannedCode + '/attendance/' + this.today).push({
            uid: this.scannedCode,
            sid: doc.data().sid,
            dateTime: this.timedate
          })
          this.db.list('All-user-attendance/' + this.today + '/' + doc.data().sid + '/' + this.scannedCode).push({
            sid: doc.data().sid,
            dateTime: this.timedate
          })
          dbs.collection("count-attendance").doc(this.today).get().then((doc) => {
            if (doc.exists) {
              this.count = doc.data().count;
              this.count++
              dbs.collection('count-attendance').doc(this.today).update({
                count: this.count
              })
            }
            else {
              dbs.collection('count-attendance').doc(this.today).set({
                count: this.count
              })
            }
          })
          let alert = this.alertCtrl.create({
            title: 'สำเร็จ!',
            subTitle: "คุณ: " + '\n' + doc.data().name,
            buttons: ['ตกลง']
          });
          alert.present();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          let alert = this.alertCtrl.create({
            title: 'ไม่พบบัญชีผู้ใช้!',
            subTitle: "ไม่พบบัญชี:" + '\n' + this.scannedCode,
            buttons: ['ตกลง']
          });
          alert.present();
        }
      });
    }).catch(err => {
      console.log('Scan Error', err);
    });
  }
  pushPage() {
    this.navCtrl.setRoot(MenuPage);
  }
}
