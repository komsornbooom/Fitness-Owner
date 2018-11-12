import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the AddAerobicPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var i = 0;
var count = 0;
var getCourse = [];
@IonicPage()
@Component({
  selector: 'page-add-aerobic',
  templateUrl: 'add-aerobic.html',
})
export class AddAerobicPage {
  dateStart = '';
  dateEnd = '';
  timeStart = "00:00";
  timeEnd = "00:00";
  get: number = 0;
  count;
  public getCourse = [];
  public splitCourse = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }
  ionViewDidLoad() {
    let dbs = firebase.firestore();
    dbs.collection("Aerobic").get()
      .then(function (querySnapshot) {
        i = 0;
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id);
          getCourse[i] = doc.id;
          i++;
        })
        count = getCourse.length;
        console.log(count);
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
    console.log('ionViewDidLoad AddAerobicPage');
  }
  save() {
    if (this.dateStart != '' && this.dateEnd != '' && this.get != 0) {
      var dateStart = this.dateStart;
      var dateEnd = this.dateEnd;
      var timeStart = this.timeStart;
      var timeEnd = this.timeEnd;
      var get: number = this.get;
      this.getCourse = getCourse;
      this.count = count;
      if (this.count == 0) {
        firebase.firestore().collection("Aerobic").doc('Aerobic-1').set({
          date: dateStart + '-' + dateEnd,
          time: timeStart + '-' + timeEnd,
          registered: 0,
          get: Number(get)
        })
        let alert = this.alertCtrl.create({
          title: 'สำเร็จ',
          subTitle: 'การเพิ่มคอร์สสำเร็จ',
          buttons: ['ตกลง']
        });
        alert.present();
        this.navCtrl.setRoot(MenuPage);
      } else {
        var i = 0;
        var t = 1;
        for (i = 0; i < count; i++) {
          this.splitCourse[i] = getCourse[i].split('-')[1];
        }
        for (i = 0; i < count; i++) {
          if (this.splitCourse[i] == (i + 1)) {
            t = 0;
          }
          else {
            console.log('course missing: ' + (this.splitCourse[i] - 1));
            t = i + 1;
            break;
          }
        }
        if (t != 0) {
          console.log('create course: ' + t);
          firebase.firestore().collection("Aerobic").doc('Aerobic-' + (t)).set({
            date: dateStart + '-' + dateEnd,
            time: timeStart + '-' + timeEnd,
            registered: 0,
            get: Number(get)
          })
          let alert = this.alertCtrl.create({
            title: 'สำเร็จ',
            subTitle: 'การเพิ่มคอร์สสำเร็จ',
            buttons: ['ตกลง']
          });
          alert.present();
          this.navCtrl.setRoot(MenuPage);
        } else {
          firebase.firestore().collection("Aerobic").doc('Aerobic-' + (this.count + 1)).set({
            date: dateStart + '-' + dateEnd,
            time: timeStart + '-' + timeEnd,
            registered: 0,
            get: Number(get)
          })
          let alert = this.alertCtrl.create({
            title: 'สำเร็จ',
            subTitle: 'การเพิ่มคอร์สสำเร็จ',
            buttons: ['ตกลง']
          });
          alert.present();
          this.navCtrl.setRoot(MenuPage);
        }
      }
    } else {
      let alert = this.alertCtrl.create({
        title: 'เพิ่มคอร์สไม่สำเร็จ',
        subTitle: 'กรุณาตรวจสอบขอมูล <br> -วันที่ -เวลา <br> -จำนวณที่เปิดรับ <br>ว่าใส่ข้อมูลครบถ้วนแล้วหรือไม่?',
        buttons: ['ตกลง']
      });
      alert.present();
    }
  }

}
