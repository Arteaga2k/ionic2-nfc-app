/**
 * Tags page
 * Created by Michael DESIGAUD on 04/02/2016.
 */
import {Page} from 'ionic-angular';
import {Inject, NgZone} from '@angular/core';
import {StringDatePipe} from '../../pipes/stringDatePipe';
import {TranslatePipe, TranslateService} from 'ng2-translate/ng2-translate';
import {StorageUtils} from '../../utils/storage.utils';

@Page({
    templateUrl: 'build/pages/tags/tags.html',
    pipes: [StringDatePipe,TranslatePipe]
})
export class TagsPage {
    tags:Array<any>;
    constructor(private translate: TranslateService) {
        this.getTags();
    }
    getTags():void {
        this.tags = StorageUtils.getTags();
        if(this.tags.length > 0) {
            this.tags.forEach((tag) => tag.date = new Date(tag.date));
        }
    }
}
