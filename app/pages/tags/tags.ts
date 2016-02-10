/**
 * Tags page
 * Created by Michael DESIGAUD on 04/02/2016.
 */
import {Page} from 'ionic-framework/ionic';
import {Inject, NgZone} from 'angular2/core';
import {StringDatePipe} from '../../pipes/stringDatePipe';

@Page({
    templateUrl: 'build/pages/tags/tags.html',
    pipes: [StringDatePipe]
})
export class TagsPage {
    tags:Array<any>;
    constructor() {
        this.getTags();
    }
    getTags():void {
        let tagsJSON:string = localStorage.getItem('NFC-APP-TAGS');
        if (tagsJSON) {
            this.tags = JSON.parse(tagsJSON);
            if(this.tags.length > 0) {
                this.tags.forEach((tag) => tag.date = new Date(tag.date));
            }
        }
    }
}
