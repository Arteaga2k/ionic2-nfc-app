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
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
        nfc.addTagDiscoveredListener(function (tagEvent, data) {
            console.log(tagEvent, data);
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
        this.tag = tagEvent.tag;
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
    NFCPage.prototype.saveTag = function () {
        var _this = this;
        if (this.tag.id) {
            if (!localStorage.getItem('NFC-APP-TAGS')) {
                localStorage.setItem('NFC-APP-TAGS', JSON.stringify([]));
            }
            var tags = JSON.parse(localStorage.getItem('NFC-APP-TAGS'));
            tags = tags.filter(function (item) { return item.id === _this.tag.id; });
            this.tag.date = new Date().toISOString();
            tags.push(this.tag);
            localStorage.setItem('NFC-APP-TAGS', JSON.stringify(tags));
            var alert_1 = ionic_1.Alert.create({
                title: 'Tag saved',
                subTitle: "Tag '" + this.tag.id + "' saved!",
                buttons: ['Ok']
            });
            this.nav.present(alert_1);
        }
    };
    NFCPage = __decorate([
        ionic_1.Page({
            templateUrl: 'build/pages/nfc/nfc.html'
        }),
        __param(0, core_1.Inject(ionic_1.NavController)),
        __param(1, core_1.Inject(ionic_1.Platform)),
        __param(2, core_1.Inject(core_1.NgZone)), 
        __metadata('design:paramtypes', [ionic_1.NavController, ionic_1.Platform, core_1.NgZone])
    ], NFCPage);
    return NFCPage;
})();
exports.NFCPage = NFCPage;
