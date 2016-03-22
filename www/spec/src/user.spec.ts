/**
 * User class unit test
 * Created by Michael DESIGAUD on 10/02/2016.
 */

///<reference path="../../../typings/lodash/lodash.d.ts" />

import * as _ from 'lodash';
import {User,Profile} from '../../../app/classes/user';


describe('User class unit tests', () => {
    let user:User;

    it('Empty constructor should work',() => {
        user = new User();
        expect(user).toBeDefined();
    });

    it('Constructor with object should work',() => {
        let userObj:any = {username:'admin',password:'admin',role:Profile.MANAGER, lastConnection:new Date().toISOString()};
        user = new User(userObj);
        expect(user).toBeDefined();
        expect(user.username).toEqual(userObj.username);
        expect(user.password).toEqual(userObj.password);
        expect(user.role).toEqual(userObj.role);
        expect(user.lastConnection).toEqual(userObj.lastConnection);
        expect(user.getProfile()).toBe(Profile[userObj.role]);
    });
});
