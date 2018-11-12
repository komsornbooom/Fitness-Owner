import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { MenuPage } from '../menu/menu';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  disable = false;
  enable = true;

  @ViewChild('username') username;
  @ViewChild('password') password;

  constructor(private fire: AngularFireAuth, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController) {

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');
  }
  logIn() {
    this.disable = true;
    this.enable = false;
    this.fire.auth.signInWithEmailAndPassword(this.username.value, this.password.value)
      .then(data => {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();
        setTimeout(() => {
          loading.dismiss();
          let alert = this.alertCtrl.create({
            title: 'SUCCESSFUL!',
            subTitle: "You are logged in,You're welcome",
            buttons: ['OK']
          });
          alert.present();
          console.log('logged in', this.fire.auth.currentUser);
          this.navCtrl.setRoot(MenuPage);
          this.disable = false;
          this.enable = true;
        }, 2000);
      })
      .catch(error => {
        let alert = this.alertCtrl.create({
          title: 'error occur',
          subTitle: "e-mail or password not found!, try again leter",
          buttons: ['OK']
        });
        alert.present();
        this.disable = false;
        this.enable = true;
        console.log('error occur', 'e-mail or password not found!');
      });


  }



}
