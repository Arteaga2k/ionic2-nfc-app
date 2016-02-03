/**
 * NFC Page
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
var NFCPage = (function () {
    function NFCPage(nav, platform, zone) {
        var _this = this;
        this.nav = nav;
        this.zone = zone;
        this.tagInfos = [];
        this.dataReceived = false;
        platform.ready().then(function () {
            if (window.StatusBar) {
                StatusBar.hide();
            }
            _this.addNfcListeners();
        });
    }
    NFCPage.prototype.addNfcListeners = function () {
        var self = this;
        nfc.addTagDiscoveredListener(function (tagEvent) {
            self.zone.run(function () {
                self.readTagData(tagEvent);
            });
        }, function () {
            console.log("Listening for NFC Tag");
        });
    };
    NFCPage.prototype.readTagData = function (tagEvent) {
        var data = [];
        Object.keys(tagEvent.tag).forEach(function (key) {
            data.push({ key: key, value: tagEvent.tag[key] });
        });
        console.log(data);
        this.tagInfos = data;
        this.dataReceived = true;
        this.vibrate(2000);
    };
    NFCPage.prototype.vibrate = function (time) {
        if (navigator.vibrate) {
            navigator.vibrate(time);
        }
    };
    NFCPage.prototype.scanNewTag = function () {
        this.dataReceived = false;
    };
    NFCPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/nfc/nfc.html'
        }),
        __param(0, core_1.Inject(ionic_1.NavController)),
        __param(1, core_1.Inject(ionic_1.Platform)),
        __param(2, core_1.Inject(core_1.NgZone))
    ], NFCPage);
    return NFCPage;
})();
exports.NFCPage = NFCPage;
//# sourceMappingURL=nfc.js.map