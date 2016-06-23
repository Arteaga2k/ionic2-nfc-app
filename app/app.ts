import {App, IonicApp, NavController,Menu,Nav,NavParams} from 'ionic-angular';
import {Inject, Directive, ElementRef, Renderer, provide, Type,ViewChild} from '@angular/core';
import {Http,RequestOptions, XHRBackend} from '@angular/http';
import {NFCPage} from './pages/nfc/nfc';
import {LoginPage} from './pages/login/login';
import {TagsPage} from './pages/tags/tags';
import {QRPage} from './pages/qr/qr';
import {AccountPage} from './pages/account/account';
import {User} from './classes/user';
import {TranslateService, TranslatePipe, TranslateLoader, TranslateStaticLoader} from 'ng2-translate/ng2-translate';
import {StorageUtils} from './utils/storage.utils';
import {LoginService} from './pages/login/login.service';
import {JwtHttp} from './utils/jwt-http';

@App({
  templateUrl: './build/pages/app.html',
  pipes: [TranslatePipe],
  providers: [TranslateService,LoginService,
    provide(TranslateLoader, {
      useFactory: (http:Http) => new TranslateStaticLoader(http,'i18n', '.json'),
      deps: [Http]
    }),
    provide(Http,{
      useFactory:(xhrBackend: XHRBackend, requestOptions: RequestOptions) => {
        return new JwtHttp(xhrBackend, requestOptions);
      },
      deps: [XHRBackend, RequestOptions],
      multi:false
    })
  ],
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class NfcApp {
  rootPage:Type;
  pages:Array<any>;
  @ViewChild(Nav) nav:Nav;
  @ViewChild(Menu) menu:Menu;
  constructor(private app: IonicApp, private translate: TranslateService, private loginService: LoginService) {
    this.app = app;
    this.translate = translate;

    this.setTranslateConfig();

    this.pages = [
      {title: 'menu.read-tag', component: NFCPage, icon: 'card'},
      {title: 'menu.saved-tags', component: TagsPage, icon: 'list'},
      {title: 'menu.my-account', component: AccountPage, icon: 'person'}
    ];

    if (StorageUtils.hasAccount()) {
      this.rootPage = NFCPage;
    } else {
      this.rootPage = LoginPage;
    }
  }
  setTranslateConfig():void {
    var userLang = navigator.language.split('-')[0];
    this.app.lang = /(fr|en)/gi.test(userLang) ? userLang : 'en';
    this.translate.setDefaultLang('en');
    this.translate.use(this.app.lang);
  }
  openPage(page:any):void {
    // navigate to the new page if it is not the current page
    this.menu.enable(true);
    this.nav.setRoot(page.component);
    this.menu.close();
  }
  logout():void {
    StorageUtils.removeToken();
    StorageUtils.removeAccount();
    this.menu.enable(false);
    this.nav.setRoot(LoginPage);
  }
}
