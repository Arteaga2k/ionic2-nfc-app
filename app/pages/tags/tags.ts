/**
 * Tags page
 * Created by Michael DESIGAUD on 04/02/2016.
 */
import {Page} from 'ionic-framework/ionic';
import {Inject, NgZone} from 'angular2/core';


@Page({
    templateUrl: 'build/pages/tags/tags.html'
})
export class TagsPage {
    tags;
    constructor() {
        this.getTags();
    }
    getTags() {
        let tagsJSON = localStorage.getItem('NFC-APP-TAGS');
        if (tagsJSON) {
            this.tags = JSON.parse(tagsJSON);
        }
    }
}