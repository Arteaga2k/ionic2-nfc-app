/**
 * User class
 * Created by Michael DESIGAUD on 09/02/2016.
 */

///<reference path="../../typings/lodash/lodash.d.ts" />

import * as _ from 'lodash';

export enum Profile {
    ADMIN,
    USER,
    MANAGER
}

export class User {
    username:string;
    password:string;
    rememberMe:boolean;
    lastConnection:Date;
    role:Profile;
    constructor(user?:{lastConnection:string}) {
        if(user) {
            this.lastConnection = new Date(user.lastConnection);
            _.assignIn(this, user);
        }
    }
    isValid():boolean {
        return this.username && this.password
        && this.username.toLowerCase() === 'admin'
            && this.password.toLowerCase() === 'admin';
    }
    getProfile():string {
        return Profile[this.role];
    }
}
