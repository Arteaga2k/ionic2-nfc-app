/**
 * NFC Page
 * Created by Michael DESIGAUD on 02/02/2016.
 */

///<reference path="../../../typings/cordova/cordova.d.ts" />

import {Page, NavController, Platform, Alert} from 'ionic-framework/ionic';
import {Inject, NgZone} from 'angular2/core';


@Page({
    templateUrl: 'app/pages/nfc/nfc.html',
    selector: 'nfc',
})
export class NFCPage {
    tagInfos:Array<any>;
    tag:any;
    dataReceived:boolean;
    zone:NgZone;
    nav:NavController;
    constructor(@Inject(NavController) nav: NavController,@Inject(Platform) platform: Platform, @Inject(NgZone) zone: NgZone) {
        this.nav = nav;
        this.zone = zone;
        this.tagInfos = [];
        this.dataReceived = false;
        platform.ready().then(() => {
            if(window.StatusBar) {
                StatusBar.hide();
            }
            this.addNfcListeners();
        });
    }
    addNfcListeners():void {
        var self = this;
        nfc.addTagDiscoveredListener((tagEvent:any, data:any) => {
            self.zone.run(() => {
                self.readTagData(tagEvent);
            });
        }, () => {
            console.log('Listening for NFC Tag');
        });
    }
    readTagData(tagEvent:any):void {
        let data:Array<any> = [];
        Object.keys(tagEvent.tag).forEach((key) => {
            data.push({key: key, value: tagEvent.tag[key]});
        });
        this.tag = tagEvent.tag;
        this.tagInfos = data;
        this.dataReceived = true;
        this.vibrate(2000);
    }
    vibrate(time:number):void {
        if(navigator.vibrate) {
            navigator.vibrate(time);
        }
    }
    scanNewTag():void {
        this.dataReceived = false;
    }
    saveTag():void {
        if(this.tag.id) {
            if(!localStorage.getItem('NFC-APP-TAGS')) {
                localStorage.setItem('NFC-APP-TAGS', JSON.stringify([]));
            }

            let tags:Array<any> = JSON.parse(localStorage.getItem('NFC-APP-TAGS'));
            tags = tags.filter((item) => item.id === this.tag.id);

            this.tag.date = new Date().toISOString();
            tags.push(this.tag);

            localStorage.setItem('NFC-APP-TAGS', JSON.stringify(tags));

            let alert:Alert = Alert.create({
                title: 'Tag saved',
                subTitle: 'Tag \'' + this.tag.id + '\' saved!',
                buttons: ['Ok']
            });
            this.nav.present(alert);
        }

    }
}
