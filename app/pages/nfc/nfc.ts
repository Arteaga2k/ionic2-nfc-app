/**
 * NFC Page
 * Created by Michael DESIGAUD on 02/02/2016.
 */

///<reference path="../../../typings/cordova/cordova.d.ts" />

import {Page, NavController, Platform, Alert} from 'ionic-framework/ionic';
import {Inject, NgZone} from 'angular2/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {DOM} from 'angular2/src/platform/dom/dom_adapter';

const NDEF_TYPE:string = 'ndef';


@Page({
    templateUrl: './build/pages/nfc/nfc.html',
    selector: 'nfc',
    pipes: [TranslatePipe]
})
export class NFCPage {
    tagEvent:Event;
    dataReceived:boolean;
    showAnimation:boolean = false;
    zone:NgZone;
    nav:NavController;
    translate:TranslateService;
    constructor(@Inject(NavController) nav: NavController,@Inject(Platform) platform: Platform, @Inject(NgZone) zone: NgZone, @Inject(TranslateService) translate: TranslateService) {
        this.nav = nav;
        this.zone = zone;
        this.dataReceived = false;
        this.translate = translate;

        platform.ready().then(() => {
            if(window.StatusBar) {
                StatusBar.hide();
            }
            this.addNfcListeners();

            document.getElementById('successImage').addEventListener('animationend',() => {
                console.log(this.tagEvent);
                if(this.tagEvent.type === NDEF_TYPE) {
                    this.readNDEFTag();
                }
            });
        });
    }
    addNfcListeners():void {
        nfc.addTagDiscoveredListener((tagEvent:Event) => {
            this.tagListenerSuccess(tagEvent);
        });
        nfc.addNdefListener((tagEvent:Event) => {
            this.tagListenerSuccess(tagEvent);
        });
    }
    tagListenerSuccess(tagEvent:Event) {
        this.zone.run(()=>{
            this.tagEvent = tagEvent;
            this.showAnimation = true;
            this.vibrate(2000);
        });

    }
    readNDEFTag():void {
        /*let data:Array<any> = [];
        Object.keys(this.tag).forEach((key) => {
            data.push({key: key, value: this.tag[key]});
        });
        if (this.tag.ndefMessage && this.tag.ndefMessage[0].payload) {
            this.tagPayload = String.fromCharCode.apply(String, this.tag.ndefMessage[0].payload);
        }
        this.tagInfos = data;*/
        console.log('readNdefTag');
        this.dataReceived = true;
    }
    vibrate(time:number):void {
        if(navigator.vibrate) {
            navigator.vibrate(time);
        }
    }
    scanNewTag():void {
        this.dataReceived = false;
        this.showAnimation = false;
    }
    saveTag():void {
        if(this.tag.id) {
            this.tag.key = btoa(this.tag.id);
            if(!localStorage.getItem('NFC-APP-TAGS')) {
                localStorage.setItem('NFC-APP-TAGS', JSON.stringify([]));
            }

            let tags:Array<any> = JSON.parse(localStorage.getItem('NFC-APP-TAGS'));
            tags = tags.filter((item) => item.key !== this.tag.key);

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
