var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/**
 * Qr code scanner page
 * Created by Michael DESIGAUD on 04/02/2016.
 */
var ionic_1 = require('ionic-framework/ionic');
var core_1 = require('angular2/core');
var QRPage = (function () {
    function QRPage(platform, zone) {
        this.dataReceived = false;
        this.zone = zone;
        this.platform = platform;
        this.data = {};
        platform.ready().then(function () {
            if (window.StatusBar) {
                StatusBar.hide();
            }
        });
    }
    QRPage.prototype.scanQRCode = function () {
        var _this = this;
        this.dataReceived = false;
        this.platform.ready().then(function () {
            var self = _this;
            cordova.plugins.barcodeScanner.scan(function (result) {
                console.log(result);
                self.zone.run(function () {
                    self.data = result;
                    self.dataReceived = true;
                    self.readData();
                });
            });
        });
    };
    QRPage.prototype.readData = function () {
        if (this.data && this.data.text) {
            if (this.data.text.indexOf('MATMSG') !== -1) {
                this.data.mail = true;
                var url = this.data.text;
                url = url.replace('MATMSG:TO', 'mailto');
                url = url.replace(';SUB:', '?subject=');
                url = url.replace(';BODY:', '&body=');
                url = url.replace(new RegExp(';', 'g'), '');
                this.data.value = url;
            }
            else if (this.data.text.indexOf('SMSTO') !== -1) {
                this.data.sms = true;
                var data = this.data.text.split(':');
                this.data.value = 'sms:' + data[1] + '?body=' + data[2];
            }
            console.log(this.data);
        }
    };
    QRPage.prototype.sendData = function () {
        window.location.href = this.data.value;
    };
    QRPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/qr/qr.html'
        }),
        __param(0, core_1.Inject(ionic_1.Platform)),
        __param(1, core_1.Inject(core_1.NgZone))
    ], QRPage);
    return QRPage;
})();
exports.QRPage = QRPage;
//# sourceMappingURL=qr.js.map