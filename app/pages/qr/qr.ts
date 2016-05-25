/**
 * Qr code scanner page
 * Created by Michael DESIGAUD on 04/02/2016.
 */

import {Page, Platform} from 'ionic-angular';
import {Inject, NgZone} from '@angular/core';


@Page({
    templateUrl: 'build/pages/qr/qr.html'
})
export class QRPage {
    dataReceived:boolean;
    data:any;
    constructor(private platform: Platform, private zone: NgZone) {
        this.dataReceived = false;
        this.data = {};
        platform.ready().then(() => {
            if(window.StatusBar) {
                StatusBar.hide();
            }
        });
    }
    scanQRCode():void {
        this.dataReceived = false;
        this.platform.ready().then(() => {
            let self:QRPage = this;
            cordova.plugins.barcodeScanner.scan((result:any) => {
                console.log(result);
                self.zone.run(() => {
                    self.data = result;
                    self.dataReceived = true;
                    self.readData();
                });
            });
        });
    }
    readData():void {
        if(this.data && this.data.text) {
            if(this.data.text.indexOf('MATMSG') !== -1) {
                this.data.mail = true;
                let url = this.data.text;
                url = url.replace('MATMSG:TO', 'mailto');
                url = url.replace(';SUB:', '?subject=');
                url = url.replace(';BODY:', '&body=');
                url = url.replace(new RegExp(';', 'g'),'');
                this.data.value = url;
            } else if(this.data.text.indexOf('SMSTO') !== -1){
                this.data.sms = true;
                let data = this.data.text.split(':');
                this.data.value = 'sms:'+data[1]+'?body='+data[2];
            }
            console.log(this.data);
        }
    }
    sendData():void {
        window.location.href = this.data.value;
    }
}