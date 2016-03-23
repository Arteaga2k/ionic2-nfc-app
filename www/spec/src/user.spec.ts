/**
 * User class unit test
 * Created by Michael DESIGAUD on 10/02/2016.
 */

///<reference path="../../../typings/lodash/lodash.d.ts" />
///<reference path="../../../typings/jasmine/jasmine.d.ts" />

import * as _ from 'lodash';
import {User,Profile} from '../../../app/classes/user';


describe('User class unit tests', () => {
    let user:User;

    it('Empty constructor should work',() => {
        user = new User();
        expect(user).toBeDefined();
    });

    it('Constructor with object should work',() => {
        let userObj:any = {username:'admin',password:'admin',firstName:'Michael',lastName:'Desigaud', lastConnection:new Date().toISOString(),roles:['ADMIN','MANAGER']};
        user = new User(userObj);
        expect(user).toBeDefined();
        expect(user.username).toEqual(userObj.username);
        expect(user.password).toEqual(userObj.password);
        expect(user.firstName).toEqual(userObj.firstName);
        expect(user.lastName).toEqual(userObj.lastName);
        expect(user.roles).toEqual(userObj.roles);
        expect(user.lastConnection).toEqual(userObj.lastConnection);
        expect(user.getRoleList()).toBe(userObj.roles.join(','));
    });
});
