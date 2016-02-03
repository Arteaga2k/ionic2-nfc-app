import {App, IonicApp, Platform, Keyboard} from 'ionic-framework/ionic';
import {Inject,Directive, ElementRef, Renderer} from 'angular2/core';
import {NFCPage} from './pages/nfc/nfc';
import {LoginPage} from './pages/login/login';

@App({
  templateUrl: './build/pages/app.html',
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class NfcApp {
  app;
  rootPage;
  pages;
  constructor(@Inject(IonicApp) app: IonicApp, @Inject(Platform) platform: Platform) {
    this.app = app;
    this.rootPage = LoginPage;
    this.pages = [{ title: 'Read Nfc Tag', component: NFCPage }];
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
  openPage(page) {
    // navigate to the new page if it is not the current page
    this.app.getComponent('leftMenu').enable(true);
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
