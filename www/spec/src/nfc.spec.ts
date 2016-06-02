/**
 * NFC Page unit tests
 * Created by Michael DESIGAUD on 08/02/2016.
 */
///<reference path="../../../typings/jasmine/jasmine.d.ts" />
///<reference path="../../../typings/jasmine/jasmine.d.ts" />

import {describe, expect, it, xit, inject, injectAsync, beforeEachProviders} from '@angular/core/testing';
import {NFCPage} from '../../../app/pages/nfc/nfc';
import {NavController, Alert, Platform} from 'ionic-angular';
import {NgZone} from '@angular/core';
import {CordovaMock} from '../mocks/cordova.mock';
import {TranslateService} from 'ng2-translate/ng2-translate';

describe('NFC page unit tests', () => {
    let nav:NavController;
    let platform:Platform;
    let zone:NgZone;
    let translate:TranslateService;

    let tagData:any = JSON.parse('{"id":[4,-17,21,82,41,73,-128],"techTypes":["android.nfc.tech.NfcA","android.nfc.tech.MifareUltralight","android.nfc.tech.Ndef"],"type":"NFC Forum Type 2","maxSize":137,"isWritable":true,"ndefMessage":[{"tnf":1,"type":[83,112],"id":[],"payload":[-111,1,14,85,1,114,101,100,102,114,111,103,103,121,46,102,114,47,81,1,53,84,2,102,114,83,116,97,114,116,117,112,32,101,120,112,101,114,116,101,32,101,110,32,87,101,98,44,32,77,111,98,105,108,101,32,101,116,32,78,70,67,32,45,32,82,69,68,32,70,82,79,71,71,89]}],"canMakeReadOnly":true}');

    beforeEach(() => {

        CordovaMock.mockAll();

         nav = jasmine.any(NavController);
         platform = jasmine.any(Platform);
         zone = jasmine.any(NgZone);
         translate = jasmine.any(TranslateService);

         nav.present = jasmine.createSpy('NavController present spy').and.callFake((alert:Alert) => {
             expect(alert).toBeDefined();
             expect(alert.data).toBeDefined();
         });

         platform.ready = jasmine.createSpy('Platform ready spy').and.callFake(() => {
             return {
                 then: (callback) => {
                     callback();
                     expect(window.StatusBar.hide).toHaveBeenCalled();
                 }
             };
         });

        zone.run = jasmine.createSpy('Zone run spy').and.callFake((callback) => {
            callback();
        });

    });

    it('NFC Page instance should be ok',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone, translate);

         expect(nfcPage.nav).toBeDefined();
         expect(nfcPage.zone).toBeDefined();
         expect(nfcPage.dataReceived).toBeFalsy();
         expect(nfcPage.tag).toBeDefined();
    });

    it('NFC Send tag should start vibration and read tag data',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone, translate);

        spyOn(nfcPage,'vibrate');
        window.nfc.sendTag({tag:tagData,type:'ndef'}, () => {
            expect(nfcPage.dataReceived).toBeTruthy();
            expect(nfcPage.tag).toBeDefined();
            expect(nfcPage.tag.id).toBeDefined();
            expect(nfcPage.tag.techTypes).toBeDefined();
            expect(nfcPage.tag.type).toBeDefined();
            expect(nfcPage.vibrate).toHaveBeenCalledWith(2000);
        });
    });

    it('Scanning new tag should reset properties',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone, translate);
        window.nfc.sendTag({tag:tagData,type:'ndef'}, () => {
            expect(nfcPage.dataReceived).toBeTruthy();
            nfcPage.scanNewTag();
            expect(nfcPage.dataReceived).toBeFalsy();
        });
    });

    it('Saving tag should store in local storage',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone, translate);

        spyOn(localStorage,'getItem').and.callThrough();

        window.nfc.sendTag({tag:tagData,type:'ndef'}, () => {
            expect(nfcPage.tag.date).toBeUndefined();
            nfcPage.saveTag();
            expect(localStorage.getItem).toHaveBeenCalled();
            expect(nfcPage.tag.date).toBeDefined();
        });
    });
});
