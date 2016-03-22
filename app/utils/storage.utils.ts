
const NFC_APP_TAGS:string = 'NFC-APP-TAGS';
const NFC_APP_TOKEN:string = 'NFC-APP-TOKEN';

export class StorageUtils {

    static getItem(itemName:string):any {
        return localStorage.getItem(itemName);
    }
    static hasTags():boolean {
        return !!this.getItem(NFC_APP_TAGS);
    }
    static hasToken():boolean {
        return !!this.getItem(NFC_APP_TOKEN);
    }
    static getTags():Array<any> {
        if(this.hasTags()) {
            return JSON.parse(this.getItem(NFC_APP_TAGS));
        }
        return [];
    }
    static setTags(tags:Array<any>) {
        localStorage.setItem(NFC_APP_TAGS,JSON.stringify(tags));
    }
    static getToken():any {
        if(this.hasToken()) {
            return JSON.parse(this.getItem(NFC_APP_TOKEN));
        }
    }
    static setToken(token:any):void {
        localStorage.setItem(NFC_APP_TOKEN,JSON.stringify(token));
    }
    static removeToken():void {
        localStorage.removeItem(NFC_APP_TOKEN);
    }
}
