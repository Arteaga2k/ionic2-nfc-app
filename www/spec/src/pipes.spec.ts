///<reference path="../../../typings/jasmine/jasmine.d.ts" />

/**
 * Pipes unit tests
 * Created by Michael DESIGAUD on 10/02/2016.
 */
import * as _ from 'lodash';
import * as moment from 'moment';
import {FromNowPipe} from '../../../app/pipes/fromNowPipe';
import {StringDatePipe} from '../../../app/pipes/stringDatePipe';


describe('Application pipes unit tests', () => {
    let fromNow:FromNowPipe;
    let stringDate:StringDatePipe;

    beforeEach(() => {
        fromNow = new FromNowPipe();
        stringDate = new StringDatePipe();
    });

    it('transforms string date or timestamp to formatted date',() => {
        let dt:string = '2016-02-10T20:19:07.502Z';
        let timestamp:number = new Date(dt).getTime();
        /*expect(stringDate.transform(dt,['short'])).toBeDefined();
        expect(stringDate.transform(dt,['shortDate'])).toEqual('2/10/2016');
        expect(stringDate.transform(dt,['short'])).toEqual('2/10/2016, 9:19 PM');*/
        /*expect(stringDate.transform(timestamp,['shortDate'])).toEqual('2/10/2016');
        expect(stringDate.transform(timestamp,['short'])).toEqual('2/10/2016, 9:19 PM');*/
    });

    it('transforms date to fromNow moment text',() => {
        let dt:string = '2016-02-10T20:19:07.502Z';
        let date:Date = new Date(dt);
        let timestamp:number = date.getTime();
        expect(fromNow.transform(dt,[])).toBeDefined();
        expect(fromNow.transform(dt,[])).toEqual(moment(dt).fromNow());

        expect(fromNow.transform(date,[])).toBeDefined();
        expect(fromNow.transform(date,[])).toEqual(moment(date).fromNow());

        expect(fromNow.transform(timestamp,[])).toBeDefined();
        expect(fromNow.transform(timestamp,[])).toEqual(moment(timestamp).fromNow());
    });
});
