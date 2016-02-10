/**
 * fromNow pipe
 * Created by Michael DESIGAUD on 10/02/2016.
 */

///<reference path="../../typings/moment/moment.d.ts" />

import {Pipe, PipeTransform} from 'angular2/core';
import {DatePipe} from 'angular2/common';
import {StringDatePipe} from './stringDatePipe';
import * as moment from 'moment';

@Pipe({
    name: 'fromNow'
})
export class FromNowPipe implements PipeTransform {
    transform(value: string|number|Date, args: any[]) {
        if(value) {
            return moment(value).fromNow();
        }
        return;
    }
}
