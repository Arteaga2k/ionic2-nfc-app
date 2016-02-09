/**
 * NFC Page unit tests
 * Created by Michael DESIGAUD on 08/02/2016.
 */
///<reference path="../../../typings/jasmine/jasmine.d.ts" />

import {describe, expect, it, xit, inject, injectAsync, beforeEachProviders} from 'angular2/testing';
import {NFCPage} from '../../../app/pages/nfc/nfc';
import {NavController, Alert, Platform} from 'ionic-framework/ionic';
import {NgZone} from 'angular2/core';
import {CordovaMock} from '../mocks/cordova.mock';

describe('NFC page unit tests', () => {
    let nav:NavController;
    let platform:Platform;
    let zone:NgZone;

    beforeEach(() => {

        CordovaMock.mockAll();

         nav = jasmine.any(NavController);
         platform = jasmine.any(Platform);
         zone = jasmine.any(NgZone);

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

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone);

         expect(nfcPage.nav).toBeDefined();
         expect(nfcPage.zone).toBeDefined();
         expect(nfcPage.dataReceived).toBeFalsy();
         expect(nfcPage.tagInfos).toEqual([]);
    });

    it('NFC Send tag should start vibration and read tag data',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone);

        spyOn(nfcPage,'vibrate');
        let tagData = {key:'value'};
        window.nfc.sendTag(tagData, () => {
            expect(nfcPage.dataReceived).toBeTruthy();
            expect(nfcPage.tagInfos.length).toBe(Object.keys(tagData).length);
            expect(nfcPage.vibrate).toHaveBeenCalledWith(2000);
        });
    });

    it('Scanning new tag should reset properties',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone);
        window.nfc.sendTag({key:'value'}, () => {
            expect(nfcPage.dataReceived).toBeTruthy();
            nfcPage.scanNewTag();
            expect(nfcPage.dataReceived).toBeFalsy();
        });
    });

    it('Saving tag should store in local storage',() => {

        spyOn(window.StatusBar,'hide');

        let nfcPage:NFCPage = new NFCPage(nav, platform, zone);

        spyOn(localStorage,'getItem').and.callThrough();

        window.nfc.sendTag({id:4, key:'value'}, () => {
            expect(nfcPage.tag.date).toBeUndefined();
            nfcPage.saveTag();
            expect(localStorage.getItem).toHaveBeenCalled();
            expect(nfcPage.tag.date).toBeDefined();
        });
    });
});
