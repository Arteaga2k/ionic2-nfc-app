/**
 * Login component
 * Created by Michael DESIGAUD on 02/02/2016.
 */

import {Page, NavController, Alert} from 'ionic-framework/index';
import {Inject} from 'angular2/core';
import {FormBuilder, Validators} from 'angular2/common';
import {NFCPage} from '../nfc/nfc';
import {User,Profile} from '../../classes/user';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {LoginService} from './login.service';
import {Response} from 'angular2/http';
import {StorageUtils} from '../../utils/storage.utils';

@Page({
    templateUrl: 'build/pages/login/login.html',
    providers:[LoginService],
    pipes: [TranslatePipe]
})
export class LoginPage {
    loginForm;
    rememberMe = false;
    // We inject the router via DI
    constructor(form: FormBuilder, private nav: NavController, private translate: TranslateService, private loginService:LoginService) {
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ['', Validators.required]
        });
    }
    login(event:Event,username:string,password:string,rememberMe:boolean):void {
        // This will be called when the user clicks on the Login button
        event.preventDefault();

        this.loginService.doLogin(username,password,rememberMe).subscribe(() => {
            this.nav.setRoot(NFCPage);
        },(alert:Alert) => {
           this.nav.present(alert);
        });
    }
}
