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

@Page({
    templateUrl: 'build/pages/login/login.html',
    providers:[LoginService],
    pipes: [TranslatePipe]
})
export class LoginPage {
    nav:NavController;
    loginForm;
    user:User;
    translate: TranslateService;
    // We inject the router via DI
    constructor(@Inject(FormBuilder) form: FormBuilder, @Inject(NavController) nav: NavController,
                @Inject(TranslateService) translate: TranslateService,
                @Inject(LoginService) private loginService:LoginService) {
        this.nav = nav;
        this.user = new User();
        this.translate = translate;
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ['', Validators.required]
        });
    }
    login(event:Event):void {
        // This will be called when the user clicks on the Login button
        event.preventDefault();

        this.loginService.authenticate(this.user.username,this.user.password).subscribe((loginData:any) => {
            this.user = new User(loginData);
            this.user.lastConnection = new Date();
            console.log('Login successful',this.user);
            this.nav.setRoot(NFCPage);

            localStorage.setItem('NFC-APP-TOKEN', JSON.stringify(this.user));
        }, err => {
            console.log('Login failed',err);
            let alert = Alert.create({
                title: 'Invalid credentials',
                subTitle: 'You entered invalid credentials !',
                buttons: ['Ok']
            });
            this.nav.present(alert);
        });
    }
}
