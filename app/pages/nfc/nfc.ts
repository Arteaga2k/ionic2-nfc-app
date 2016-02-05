/**
 * NFC Page
 * Created by Michael DESIGAUD on 02/02/2016.
 */

import {Page, NavController, Platform, Alert} from 'ionic-framework/ionic';
import {Inject, NgZone} from 'angular2/core';


@Page({
    templateUrl: 'build/pages/nfc/nfc.html'
})
export class NFCPage {
    tagInfos;
    tag;
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
        nfc.addTagDiscoveredListener((tagEvent,data) => {
            console.log(tagEvent,data);
            self.zone.run(() => {
                self.readTagData(tagEvent);
            });
        }, () => {
            console.log("Listening for NFC Tag");
        });
    }
    readTagData(tagEvent){
        let data = [];
        Object.keys(tagEvent.tag).forEach((key) => {
            data.push({key: key, value: tagEvent.tag[key]});
        });
        console.log(data);
        this.tag = tagEvent.tag;
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
    saveTag(){
        if(this.tag.id){
            if(!localStorage.getItem('NFC-APP-TAGS')){
                localStorage.setItem('NFC-APP-TAGS', JSON.stringify([]));
            }

            let tags = JSON.parse(localStorage.getItem('NFC-APP-TAGS'));
            tags = tags.filter((item) => item.id === this.tag.id);

            this.tag.date = new Date().toISOString();
            tags.push(this.tag);

            localStorage.setItem('NFC-APP-TAGS', JSON.stringify(tags));

            let alert = Alert.create({
                title: 'Tag saved',
                subTitle: "Tag '" + this.tag.id + "' saved!",
                buttons: ['Ok']
            });
            this.nav.present(alert);
        }

    }
}