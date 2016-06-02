/**
 * Login component
 * Created by Michael DESIGAUD on 02/02/2016.
 */

import {Page, NavController, Alert, IonicApp} from 'ionic-angular';
import {Inject} from '@angular/core';
import {FormBuilder, Validators, ControlGroup} from '@angular/common';
import {NFCPage} from '../nfc/nfc';
import {User,Profile} from '../../classes/user';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {LoginService} from './login.service';
import {Response} from '@angular/http';
import {StorageUtils} from '../../utils/storage.utils';

@Page({
    selector:'login-page',
    template: 'build/pages/login/login.html',
    providers:[LoginService],
    pipes: [TranslatePipe]
})
export class LoginPage {
    loginForm:ControlGroup;
    rememberMe = false;
    // We inject the router via DI
    constructor(form: FormBuilder, private nav: NavController, private translate: TranslateService, private loginService:LoginService,private app: IonicApp) {
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ['', Validators.required]
        });
    }
    login(event:Event,username:string,password:string,rememberMe:boolean):void {
        // This will be called when the user clicks on the Login button
        event.preventDefault();
        this.loginService.login(username,password,rememberMe).subscribe(() => this.nav.setRoot(NFCPage),(alert:Alert) => this.nav.present(alert));
    }
}
