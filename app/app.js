var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var ionic_1 = require('ionic-framework/ionic');
var core_1 = require('angular2/core');
var nfc_1 = require('./pages/nfc/nfc');
var login_1 = require('./pages/login/login');
var NfcApp = (function () {
    function NfcApp(app, platform) {
        this.app = app;
        this.rootPage = login_1.LoginPage;
        this.pages = [{ title: 'Read Nfc Tag', component: nfc_1.NFCPage }];
        platform.ready().then(function () {
            // The platform is now ready. Note: if this callback fails to fire, follow
            // the Troubleshooting guide for a number of possible solutions:
            //
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            //
            // First, let's hide the keyboard accessory bar (only works natively) since
            // that's a better default:
            //
            // Keyboard.setAccessoryBarVisible(false);
            //
            // For example, we might change the StatusBar color. This one below is
            // good for dark backgrounds and light text:
            // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
            //StatusBar.setStyle(StatusBar.LIGHT_CONTENT);
        });
    }
    NfcApp.prototype.openPage = function (page) {
        // navigate to the new page if it is not the current page
        this.app.getComponent('leftMenu').enable(true);
        var nav = this.app.getComponent('nav');
        nav.setRoot(page.component);
    };
    NfcApp = __decorate([
        ionic_1.App({
            templateUrl: './build/pages/app.html',
            config: {} // http://ionicframework.com/docs/v2/api/config/Config/
        }),
        __param(0, core_1.Inject(ionic_1.IonicApp)),
        __param(1, core_1.Inject(ionic_1.Platform))
    ], NfcApp);
    return NfcApp;
})();
exports.NfcApp = NfcApp;
//# sourceMappingURL=app.js.map