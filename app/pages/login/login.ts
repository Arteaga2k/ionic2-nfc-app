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
    rememberMe = false;
    translate: TranslateService;
    // We inject the router via DI
    constructor(@Inject(FormBuilder) form: FormBuilder, @Inject(NavController) nav: NavController,
                @Inject(TranslateService) translate: TranslateService,
                @Inject(LoginService) private loginService:LoginService) {
        this.nav = nav;
        this.translate = translate;
        this.loginForm = form.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            rememberMe: ['', Validators.required]
        });
    }
    login(event:Event,username:string,password:string,rememberMe:boolean):void {
        // This will be called when the user clicks on the Login button
        event.preventDefault();

        if(username.toLowerCase() !== 'admin' || password.toLowerCase() !== 'admin') {
            let alert = Alert.create({
                title: 'Invalid credentials',
                subTitle: 'You entered invalid credentials !',
                buttons: ['Ok']
            });
            this.nav.present(alert);
        } else {

            this.loginService.authenticate(username, password).subscribe((loginData:any) => {
                let user:User = new User(loginData);
                user.lastConnection = new Date();
                console.log('Login successful', user);
                this.nav.setRoot(NFCPage);

                if (rememberMe) {
                    console.log('Remember me: Store user to local storage');
                    localStorage.setItem('NFC-APP-TOKEN', JSON.stringify(user));
                }
            });
        }
    }
}
