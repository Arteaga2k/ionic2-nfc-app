/**
 * Login Page unit tests
 * Created by Michael DESIGAUD on 08/02/2016.
 */
///<reference path="../../../typings/jasmine/jasmine.d.ts" />

import {describe, expect, it, xit, inject,injectAsync} from '@angular/core/testing';
import {LoginPage} from '../../../app/pages/login/login';
import {NFCPage} from '../../../app/pages/nfc/nfc';
import {FormBuilder, Validators} from '@angular/common';
import {NavController, Alert,IonicApp} from 'ionic-angular';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {User,Profile} from '../../../app/classes/user';
import {LoginService} from '../../../app/pages/login/login.service';
import {Observable} from 'rxjs/Observable';
import {StorageUtils} from '../../../app/utils/storage.utils';

describe('Login page unit tests', () => {
    var form:FormBuilder;
    var nav:NavController;
    var translate:TranslateService;
    var loginService:LoginService;
    var ionicApp:IonicApp;
    var event:any = {};
    var credentials:any = {value:{username:'admin', password:'admin', rememberMe: true}};

    beforeEach(() => {
        form = jasmine.any(FormBuilder);
        translate = jasmine.any(TranslateService);
        nav = jasmine.any(NavController);
        loginService = jasmine.any(LoginService);
        ionicApp = jasmine.any(IonicApp);


        nav.setRoot = jasmine.createSpy('NavController set root spy').and.callFake((page:{name:String}) => {
            expect(page.name).toBe(NFCPage.name);
        });
        nav.present = jasmine.createSpy('NavController present spy').and.callFake((alert: Alert) => {
            expect(alert).toBeDefined();
            expect(alert.data).toBeDefined();
            expect(alert.data.title).toBe('Invalid credentials');
        });

        loginService.login = jasmine.createSpy('LoginService authenticate').and.callFake((username:string,password:string) => {
            expect(username).toBeDefined();
            expect(password).toBeDefined();
            return Observable.of({id:1,username:'admin',role:'ADMIN'});
        });

        ionicApp.getComponent = jasmine.createSpy('Ionic App getComponent').and.callFake((el:string) => {
            expect(el).toBeDefined();
            expect(el).toBe('leftMenu');
            return {enable:(show:boolean) => {
                expect(show).toBeTruthy();
            }};
        });

        event.preventDefault = jasmine.createSpy('Event spy').and.returnValue(true);
    });

    it('Login instance', () => {

        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);

        let loginPage = new LoginPage( form , nav, translate,loginService,ionicApp);

        expect(loginPage.loginForm).toBeDefined();
        expect(form.group).toHaveBeenCalled();
        expect(loginPage.loginForm).toEqual(credentials);
    });

    it('Call login method with correct credentials and remember me', () => {

        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);

        let loginPage = new LoginPage( form , nav, translate,loginService,ionicApp);

        loginPage.login(event,credentials.value.username,credentials.value.password,true);
    });
});
