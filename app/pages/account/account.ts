/**
 * Account page
 * Created by Michael DESIGAUD on 10/02/2016.
 */
import {Page} from 'ionic-framework/ionic';
import {FromNowPipe} from '../../pipes/fromNowPipe';
import {User} from '../../classes/user';

@Page({
    templateUrl: 'build/pages/account/account.html',
    pipes: [FromNowPipe]
})
export class AccountPage {
    account:User;
    constructor() {
        this.account = new User(JSON.parse(localStorage.getItem('NFC-APP-TOKEN')));
    }
}
