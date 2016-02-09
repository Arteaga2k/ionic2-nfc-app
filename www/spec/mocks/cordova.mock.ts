/**
 * Cordova Mock
 * Created by Michael DESIGAUD on 09/02/2016.
 */

///<reference path="../../../typings/cordova/cordova.d.ts" />

class StatusBarMock implements StatusBar {
    hide():void {
        console.log('Hide status bar');
    }
}

class NFCMock {
    tag:Object;
    callback;
    addTagDiscoveredListener(callback):void {
        this.callback = callback;
    }
    sendTag(tagData,successCallback):void {
        this.tag = tagData;
        this.callback({tag:this.tag}, null);
        successCallback();
    }
}

export class CordovaMock {
    public static mockAll():void {
        window.StatusBar = new StatusBarMock();
        window.nfc = new NFCMock();
    }
}
