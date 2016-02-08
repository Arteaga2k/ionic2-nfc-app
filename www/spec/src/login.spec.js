///<reference path="../../../typings/jasmine/jasmine.d.ts" />
var testing_1 = require('angular2/testing');
var login_1 = require('../../../app/pages/login/login');
var nfc_1 = require('../../../app/pages/nfc/nfc');
var common_1 = require('angular2/common');
var ionic_1 = require('ionic-framework/ionic');
testing_1.describe('Login page unit tests', function () {
    var form;
    var nav;
    var event = {};
    var credentials = { value: { username: 'admin', password: 'admin' } };
    beforeEach(function () {
        form = jasmine.any(common_1.FormBuilder);
        nav = jasmine.any(ionic_1.NavController);
        nav.setRoot = jasmine.createSpy('NavController set root spy').and.callFake(function (page) {
            testing_1.expect(page.name).toBe(nfc_1.NFCPage.name);
        });
        nav.present = jasmine.createSpy('NavController present spy').and.callFake(function (alert) {
            testing_1.expect(alert).toBeDefined();
            testing_1.expect(alert.data).toBeDefined();
            testing_1.expect(alert.data.title).toBe('Invalid credentials');
        });
        event.preventDefault = jasmine.createSpy('Event spy').and.returnValue(true);
    });
    testing_1.it('Login instance', function () {
        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);
        var loginPage = new login_1.LoginPage(form, nav);
        testing_1.expect(loginPage.nav).toBeDefined();
        testing_1.expect(loginPage.loginForm).toBeDefined();
        testing_1.expect(form.group).toHaveBeenCalled();
        testing_1.expect(loginPage.loginForm).toEqual(credentials);
    });
    testing_1.it('Call login method with correct credentials', function () {
        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);
        var loginPage = new login_1.LoginPage(form, nav);
        spyOn(localStorage, 'setItem');
        loginPage.login(event);
        testing_1.expect(localStorage.setItem).toHaveBeenCalledWith('NFC-APP-TOKEN', btoa(credentials.value.username.toLowerCase() + ':' + credentials.value.password.toLowerCase()));
    });
    testing_1.it('Call login method with wrong credentials', function () {
        credentials.value.username = 'wrongLogin';
        form.group = jasmine.createSpy('Form builder group spy').and.returnValue(credentials);
        var loginPage = new login_1.LoginPage(form, nav);
        spyOn(localStorage, 'setItem');
        loginPage.login(event);
        testing_1.expect(localStorage.setItem).not.toHaveBeenCalled();
        testing_1.expect(nav.present).toHaveBeenCalled();
    });
});
//# sourceMappingURL=login.spec.js.map