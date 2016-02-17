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
    tag:any;
    callback;
    addTagDiscoveredListener(callback):void {
        this.callback = callback;
    }
    addNdefListener(callback):void {
        this.callback = callback;
    }
    sendTag(tagEvent:{type:string,tag:any},successCallback):void {
        this.tag = tagEvent.tag;
        this.callback(tagEvent, null);
        successCallback();
    }
}

export class CordovaMock {
    public static mockAll():void {
        window.StatusBar = new StatusBarMock();
        window.nfc = new NFCMock();
    }
}
