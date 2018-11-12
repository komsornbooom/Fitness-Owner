import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import firebase from 'firebase';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { ListPage } from '../pages/list/list';
import {ScanPage } from '../pages/scan/scan';
import{FindmemberPage}from '../pages/findmember/findmember';
import { AddCousePage } from '../pages/add-couse/add-couse';
import { AddAerobicPage } from '../pages/add-aerobic/add-aerobic';
import { AddYogaPage } from '../pages/add-yoga/add-yoga';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import {ChartsModule} from 'ng2-charts';

const firebaseAuth = {
  apiKey: "AIzaSyATg0IsO0Xhyx1C7z64v-I-BOnJe-F2q-w",
  authDomain: "fitness-6656c.firebaseapp.com",
  databaseURL: "https://fitness-6656c.firebaseio.com",
  projectId: "fitness-6656c",
  storageBucket: "fitness-6656c.appspot.com",
  messagingSenderId: "41286515607"
};
firebase.initializeApp (firebaseAuth);
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ListPage,
    ScanPage,
    FindmemberPage,
    AddCousePage,
    AddAerobicPage,
    AddYogaPage
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    MenuPage,
    ListPage,
    ScanPage,
    FindmemberPage,
    AddCousePage,
    AddAerobicPage,
    AddYogaPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
