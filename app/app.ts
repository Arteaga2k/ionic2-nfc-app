import {App, IonicApp, Platform, Keyboard} from 'ionic-framework/ionic';
import {Inject, Directive, ElementRef, Renderer} from 'angular2/core';
import {NFCPage} from './pages/nfc/nfc';
import {LoginPage} from './pages/login/login';
import {TagsPage} from './pages/tags/tags';
import {QRPage} from './pages/qr/qr';
import {AccountPage} from './pages/account/account';
import {NavController} from 'ionic-framework/ionic';
import {User} from './classes/user';

@App({
  templateUrl: './build/pages/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class NfcApp {
  app:IonicApp;
  rootPage;
  pages:Array<any>;
  constructor(@Inject(IonicApp) app: IonicApp, @Inject(Platform) platform: Platform) {
    this.app = app;
    this.pages = [
      {title: 'Read Tag', component: NFCPage, icon: 'card'},
      {title: 'Saved tags', component: TagsPage, icon: 'list'},
      {title: 'My account', component: AccountPage, icon: 'person'}
    ];

    if (this.isAuthTokenValid()) {
      console.log('Automatically logged');
      this.rootPage = NFCPage;
    } else {
      this.rootPage = LoginPage;
    }

    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
      //StatusBar.setStyle(StatusBar.LIGHT_CONTENT);
    });
  }
  isAuthTokenValid():boolean {
    let user:User = new User(JSON.parse(localStorage.getItem('NFC-APP-TOKEN')));
    return user && user.isValid();
  }
  openPage(page:any):void {
    // navigate to the new page if it is not the current page
    this.app.getComponent('leftMenu').enable(true);
    let nav:NavController = this.app.getComponent('nav');
    nav.setRoot(page.component);
    this.app.getComponent('leftMenu').close();
  }
  logout():void {
    localStorage.removeItem('NFC-APP-TOKEN');
    let nav:NavController = this.app.getComponent('nav');
    this.app.getComponent('leftMenu').enable(false);
    nav.setRoot(LoginPage);
  }
}
