/**
 * StringDate pipe
 * Created by Michael DESIGAUD on 09/02/2016.
 */

import {Pipe, PipeTransform} from 'angular2/core';
import {DatePipe} from 'angular2/common';

@Pipe({
    name: 'stringDate'
})
export class StringDatePipe implements PipeTransform {
    transform(value: string, args: any[]) {
        if(value) {
            return new DatePipe().transform(new Date(value),args);
        }
        return;
    }
}
