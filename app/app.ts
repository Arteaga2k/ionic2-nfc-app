/// <reference path="../node_modules/angular2/typings/browser.d.ts" />
/// <reference path="../node_modules/angular2/typings/es6-promise/es6-promise.d.ts" />
/// <reference path="../node_modules/angular2/typings/es6-collections/es6-collections.d.ts" />

import {App, IonicApp, NavController,Menu} from 'ionic-framework/index';
import {Inject, Directive, ElementRef, Renderer, provide, Type} from 'angular2/core';
import {Http} from 'angular2/http';
import {NFCPage} from './pages/nfc/nfc';
import {LoginPage} from './pages/login/login';
import {TagsPage} from './pages/tags/tags';
import {QRPage} from './pages/qr/qr';
import {AccountPage} from './pages/account/account';
import {User} from './classes/user';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';

@App({
  templateUrl: './build/pages/app.html',
  pipes: [TranslatePipe],
  providers: [TranslateService,
    provide(TranslateLoader, {
      useFactory: (http:Http) => new TranslateStaticLoader(http,'i18n', '.json'),
      deps: [Http]
    })
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class NfcApp {
  app:IonicApp;
  rootPage:Type;
  pages:Array<any>;
  translate:TranslateService;
  constructor(@Inject(IonicApp) app: IonicApp, @Inject(TranslateService) translate: TranslateService,@Inject(Http) http:Http) {
    this.app = app;
    this.translate = translate;

    this.setTranslateConfig(http);

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
  setTranslateConfig(http:Http):void {
    var userLang = navigator.language.split('-')[0];
    this.app.lang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(this.app.lang);
  }
  isAuthTokenValid():boolean {
    return !!localStorage.getItem('NFC-APP-TOKEN');
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
