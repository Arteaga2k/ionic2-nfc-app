/**
 * Account page
 * Created by Michael DESIGAUD on 10/02/2016.
 */
import {Page, IonicApp} from 'ionic-angular';
import {Inject} from '@angular/core';
import {FromNowPipe} from '../../pipes/fromNowPipe';
import {User} from '../../classes/user';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {Languages} from '../../utils/languages';
import * as moment from 'moment';
import {StorageUtils} from '../../utils/storage.utils';

@Page({
    templateUrl: 'build/pages/account/account.html',
    pipes: [FromNowPipe,TranslatePipe]
})
export class AccountPage {
    account:User;
    languages:Languages;
    constructor(private translate: TranslateService, private app: IonicApp) {
        this.account = new User(StorageUtils.getAccount());
        this.languages = Languages.get();
    }
    changeLocale():void {
        console.log('change locale',this.app.lang);
        this.translate.use(this.app.lang);
        moment.locale(this.app.lang);
    }
}
