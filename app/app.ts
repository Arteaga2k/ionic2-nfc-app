import {App, IonicApp, NavController} from 'ionic-framework/ionic';
import {Inject, Directive, ElementRef, Renderer} from 'angular2/core';
import {NFCPage} from './pages/nfc/nfc';
import {LoginPage} from './pages/login/login';
import {TagsPage} from './pages/tags/tags';
import {QRPage} from './pages/qr/qr';
import {AccountPage} from './pages/account/account';
import {User} from './classes/user';
import {TranslateService, TranslatePipe} from 'ng2-translate/ng2-translate';

@App({
  templateUrl: './build/pages/app.html',
  pipes: [TranslatePipe],
  providers: [TranslateService],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class NfcApp {
  app:IonicApp;
  rootPage;
  pages:Array<any>;
  translate:TranslateService;
  constructor(@Inject(IonicApp) app: IonicApp, @Inject(TranslateService) translate: TranslateService) {
    this.app = app;
    this.translate = translate;

    this.setTranslateConfig();

    this.pages = [
      {title: 'menu.read-tag', component: NFCPage, icon: 'card'},
      {title: 'menu.saved-tags', component: TagsPage, icon: 'list'},
      {title: 'menu.my-account', component: AccountPage, icon: 'person'}
    ];

    if (this.isAuthTokenValid()) {
      console.log('Automatically logged');
      this.rootPage = NFCPage;
    } else {
      this.rootPage = LoginPage;
    }

    //platform.ready().then(() => {});
  }
  setTranslateConfig():void {
    var userLang = navigator.language.split('-')[0];
    this.app.lang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(this.app.lang);

    var prefix = 'i18n';
    var suffix = '.json';
    this.translate.useStaticFilesLoader(prefix, suffix);
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
