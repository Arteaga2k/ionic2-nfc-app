/**
 * NFC Page
 * Created by Michael DESIGAUD on 02/02/2016.
 */

///<reference path="../../../typings/cordova/cordova.d.ts" />
///<reference path="../../../typings/phonegap-nfc/phonegap-nfc.d.ts" />

import {Page, NavController, Platform, Alert} from 'ionic-angular';
import {Inject, NgZone} from '@angular/core';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {TagUtil,Tag} from '../../classes/tag';
import {StorageUtils} from '../../utils/storage.utils';

@Page({
    templateUrl: './build/pages/nfc/nfc.html',
    selector: 'nfc',
    pipes: [TranslatePipe]
})
export class NFCPage {
    dataReceived:boolean;
    showAnimation:boolean = false;
    zone:NgZone;
    nav:NavController;
    translate:TranslateService;
    tag:Tag;
    constructor(nav: NavController, platform: Platform, zone: NgZone, translate: TranslateService) {
        this.nav = nav;
        this.zone = zone;
        this.dataReceived = false;
        this.translate = translate;
        this.tag = new Tag();

        platform.ready().then(() => {
            if(window.StatusBar) {
                StatusBar.hide();
            }
            this.addNfcListeners();
        });
    }
    addNfcListeners():void {
        nfc.addTagDiscoveredListener((tagEvent:Event) => this.tagListenerSuccess(tagEvent));
        nfc.addNdefListener((tagEvent:Event) => this.tagListenerSuccess(tagEvent));
    }
    tagListenerSuccess(tagEvent:Event) {
        console.log(tagEvent);
        this.zone.run(()=> {
            this.tag = TagUtil.readTagFromJson(tagEvent);
            this.dataReceived = true;
            this.vibrate(2000);
        });

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

            if(!StorageUtils.hasTags()) {
                StorageUtils.setTags([]);
            }

            let tags:Array<any> = StorageUtils.getTags();
            tags = tags.filter((item) => item.key !== this.tag.key);

            this.tag.date = new Date().toISOString();
            tags.push(this.tag);

            StorageUtils.setTags(tags);

            let alert:Alert = Alert.create({
                title: 'Tag saved',
                subTitle: 'Tag \'' + this.tag.id + '\' saved!',
                buttons: ['Ok']
            });
            this.nav.present(alert);
        }

    }
}
