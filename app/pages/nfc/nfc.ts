/**
 * NFC Page
 * Created by Michael DESIGAUD on 02/02/2016.
 */

import {Page, NavController, Platform} from 'ionic-framework/ionic';
import {Inject, NgZone} from 'angular2/core';


@Page({
    templateUrl: 'build/pages/nfc/nfc.html'
})
export class NFCPage {
    tagInfos;
    dataReceived:boolean;
    zone:NgZone;
    nav:NavController;
    constructor(@Inject(NavController) nav: NavController,@Inject(Platform) platform: Platform, @Inject(NgZone) zone: NgZone) {
        this.nav = nav;
        this.zone = zone;
        this.tagInfos = [];
        this.dataReceived = false;
        platform.ready().then(() => {
            if(window.StatusBar){
                StatusBar.hide();
            }
            this.addNfcListeners();
        });
    }
    addNfcListeners(){
        var self = this;
        nfc.addTagDiscoveredListener(function (tagEvent) {
            self.zone.run(() => {
                self.readTagData(tagEvent);
            });
        }, function () {
            console.log("Listening for NFC Tag");
        });
    }
    readTagData(tagEvent){
        let data = [];
        Object.keys(tagEvent.tag).forEach(function(key){
            data.push({key: key, value: tagEvent.tag[key]});
        });
        console.log(data);
        this.tagInfos = data;
        this.dataReceived = true;
        this.vibrate(2000);
    }
    vibrate(time){
        if(navigator.vibrate){
            navigator.vibrate(time);
        }
    }
    scanNewTag(){
        this.dataReceived = false;
    }
}