import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import 'firebase/firestore';
import * as moment from 'moment';

//import { Observable } from 'rxjs';
import { AngularFireDatabase } from 'angularfire2/database'
/**
 * Generated class for the FindmemberPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-findmember',
  templateUrl: 'findmember.html',
})
export class FindmemberPage {
  dateStart: string = null;
  dateEnd: string = null;
  email: string = '';

  gender: string = '';
  weight: string = '';
  height: string = '';
  count: number = 0;
  count1: number = 0;
  count2: number = 0;
  showDateS = false;
  showDateE = false;
  showAll = false;
  showToday = true;
  today1 = moment().format('YYYY-MM-DD');//new Date().toDateString();
  today;

  public doughnutChartLabels: string[]; //= [this.today,this.today1];
  public doughnutChartData: number[]; //= [this.count,this.count1];
  public doughnutChartType: string; // = 'doughnut';

  constructor(public loadingCtrl: LoadingController, public db: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams) {
    //this.count=this.navParams.get('count')
    let dbs = firebase.firestore();

    dbs.collection("count-attendance").doc(this.today1).get().then((doc) => {
      if (doc.exists) {
        this.count2 = doc.data().count;
        console.log(this.today1 + " " + this.count2);
        this.doughnutChartData = [this.count2];
      }
      else {
        this.count2 = 0;
        this.doughnutChartData = [0];
        console.log("No such document! " + this.today1);
      }
    })
    this.doughnutChartLabels = [this.today1];
    this.doughnutChartType = 'doughnut';
  }
  getDate() {
    let dbs = firebase.firestore();
    if (this.dateStart != null && this.dateEnd != null) {
      dbs.collection("count-attendance").doc(this.dateStart).get().then((doc) => {
        if (doc.exists) {
          this.count = doc.data().count;
          console.log(this.dateStart + " " + this.count);
          this.doughnutChartData = [this.count, this.count1];
        }
        else {
          this.count = 0;
          this.doughnutChartData = [0, this.count1];
          console.log("No such document! " + this.dateStart);
        }
      })
      dbs.collection("count-attendance").doc(this.dateEnd).get().then((doc) => {
        if (doc.exists) {
          this.count1 = doc.data().count;
          console.log(this.dateEnd + " " + this.count);
          this.doughnutChartData = [this.count, this.count1];
        }
        else {
          this.count1 = 0;
          this.doughnutChartData = [this.count, this.count1];
          console.log("No such document! " + this.dateEnd);
        }
      })
      this.showAll = true;
      this.showDateS = false;
      this.showDateE = false;
      this.showToday = false;
      this.doughnutChartLabels = [this.dateStart, this.dateEnd];
      this.doughnutChartType = 'doughnut';
    }
    else if (this.dateStart != null && this.dateEnd == null) {
      dbs.collection("count-attendance").doc(this.dateStart).get().then((doc) => {
        if (doc.exists) {
          this.count = doc.data().count;
          console.log(this.dateStart + " " + this.count);
          this.doughnutChartData = [this.count];
        }
        else {
          this.count = 0;
          this.doughnutChartData = [0];
          console.log("No such document! " + this.dateStart);
        }
      })
      this.showDateS = true;
      this.showDateE = false;
      this.showAll = false;
      this.showToday = false;
      this.doughnutChartLabels = [this.dateStart];
      this.doughnutChartType = 'doughnut';
    } else if (this.dateStart == null && this.dateEnd != null) {
      dbs.collection("count-attendance").doc(this.dateEnd).get().then((doc) => {
        if (doc.exists) {
          this.count1 = doc.data().count;
          console.log(this.dateEnd + " " + this.count);
          this.doughnutChartData = [this.count1];
        }
        else {
          this.count1 = 0;
          this.doughnutChartData = [this.count1];
          console.log("No such document! " + this.dateEnd);
        }
      })
      this.showDateE = true;
      this.showDateS = false;
      this.showAll = false;
      this.showToday = false;
      this.doughnutChartLabels = [this.dateEnd];
      this.doughnutChartType = 'doughnut';
    } else { }
  }
  doRefresh(refresher) {
    this.dateStart = null;
    this.dateEnd = null;
    this.showAll = false;
    this.showDateS = false;
    this.showDateE = false;
    this.showToday = true;
    let dbs = firebase.firestore();
    dbs.collection("count-attendance").doc(this.today1).get().then((doc) => {
      if (doc.exists) {
        this.count2 = doc.data().count;
        console.log(this.today1 + " " + this.count2);
        this.doughnutChartData = [this.count2];
      }
      else {
        this.count2 = 0;
        this.doughnutChartData = [0];
        console.log("No such document! " + this.today1);
      }
    })
    this.doughnutChartLabels = [this.today1];
    this.doughnutChartType = 'doughnut';
    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }
  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    setTimeout(() => {
      loading.dismiss();
    }, 1500);
    console.log('ionViewDidLoad FindmemberPage');
  }
}
