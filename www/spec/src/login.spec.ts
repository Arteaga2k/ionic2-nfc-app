///<reference path="../../../typings/jasmine/jasmine.d.ts" />

import {describe, expect, it, xit, inject, beforeEachProviders} from 'angular2/testing';
import {LoginPage} from '../../../app/pages/login/login';
import {NFCPage} from '../../../app/pages/nfc/nfc';
import {FormBuilder, Validators} from 'angular2/common';
import {NavController, Alert} from 'ionic-framework/ionic';

describe('Login page unit tests', () => {
    var form:FormBuilder;
    var nav:NavController;
    var event:any = {};
    var credentials:any = {value:{username:'admin', password:'admin'}};

    beforeEach(() => {
        form = jasmine.any(FormBuilder);

        nav = jasmine.any(NavController);
        nav.setRoot = jasmine.createSpy('NavController set root spy').and.callFake((page:{name:String}) => {
            expect(page.name).toBe(NFCPage.name);
        });
        nav.present = jasmine.createSpy('NavController present spy').and.callFake((alert: Alert) => {
            expect(alert).toBeDefined();
            expect(alert.data).toBeDefined();
            expect(alert.data.title).toBe('Invalid credentials');
        });

        event.preventDefault = jasmine.createSpy('Event spy').and.returnValue(true);
    });

    it('Login instance', () => {

        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);

        let loginPage = new LoginPage( form , nav);

        expect(loginPage.nav).toBeDefined();
        expect(loginPage.loginForm).toBeDefined();
        expect(form.group).toHaveBeenCalled();
        expect(loginPage.loginForm).toEqual(credentials);
    });

    it('Call login method with correct credentials', () => {

        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);

        let loginPage = new LoginPage( form , nav);

        spyOn(localStorage, 'setItem');
        loginPage.login(event);
        expect(localStorage.setItem).toHaveBeenCalledWith('NFC-APP-TOKEN', btoa(credentials.value.username.toLowerCase() + ':' + credentials.value.password.toLowerCase()));
    });

    it('Call login method with wrong credentials', () => {

        credentials.value.username = 'wrongLogin';
        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);

        let loginPage = new LoginPage( form , nav);

        spyOn(localStorage, 'setItem');

        loginPage.login(event);

        expect(localStorage.setItem).not.toHaveBeenCalled();
        expect(nav.present).toHaveBeenCalled();
    });
});
