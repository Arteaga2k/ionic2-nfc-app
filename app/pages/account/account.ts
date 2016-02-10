/**
 * Account page
 * Created by Michael DESIGAUD on 10/02/2016.
 */
import {Page} from 'ionic-framework/ionic'
import {Inject} from 'angular2/core';
import {FromNowPipe} from '../../pipes/fromNowPipe';
import {User} from '../../classes/user';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {IonicApp} from 'ionic-framework/ionic';
import {Languages} from '../../utils/languages';

@Page({
    templateUrl: 'build/pages/account/account.html',
    pipes: [FromNowPipe,TranslatePipe]
})
export class AccountPage {
    account:User;
    translate:TranslateService;
    app:IonicApp;
    languages:Languages;
    constructor(@Inject(TranslateService) translate: TranslateService, @Inject(IonicApp) app: IonicApp) {
        this.app = app;
        this.translate = translate;
        this.account = new User(JSON.parse(localStorage.getItem('NFC-APP-TOKEN')));
        this.languages = Languages.get();
    }
    changeLocale():void {
        console.log('change locale',this.app.lang);
        this.translate.use(this.app.lang).subscribe(() => {
            console.log('local changed!');
        });
    }
}
