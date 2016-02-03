/**
 * Login component
 * Created by Michael DESIGAUD on 02/02/2016.
 */
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
var common_1 = require('angular2/common');
var nfc_1 = require('../nfc/nfc');
var LoginPage = (function () {
    // We inject the router via DI
    function LoginPage(form, nav) {
        this.nav = nav;
        this.loginForm = form.group({
            username: ["", common_1.Validators.required],
            password: ["", common_1.Validators.required]
        });
    }
    LoginPage.prototype.login = function (event) {
        // This will be called when the user clicks on the Login button
        event.preventDefault();
        if (this.loginForm.value.username.toLowerCase() === "admin" && this.loginForm.value.password === "admin") {
            this.nav.setRoot(nfc_1.NFCPage);
        }
        else {
            var alert_1 = ionic_1.Alert.create({
                title: 'Invalid credentials',
                subTitle: 'You entered invalid credentials !',
                buttons: ['Ok']
            });
            this.nav.present(alert_1);
        }
        // We call our API to log the user in. The username and password are entered by the user
        /*fetch('http://localhost:3001/sessions/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username, password
            })
        })
            .then(status)
            .then(json)
            .then((response) => {
                // Once we get the JWT in the response, we save it into localStorage
                localStorage.setItem('jwt', response.id_token);
                // and then we redirect the user to the home
                this.router.parent.navigate('/home');
            })
            .catch((error) => {
                alert(error.message);
                console.log(error.message);
            });*/
    };
    LoginPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/login/login.html'
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(ionic_1.NavController))
    ], LoginPage);
    return LoginPage;
})();
exports.LoginPage = LoginPage;
//# sourceMappingURL=login.js.map