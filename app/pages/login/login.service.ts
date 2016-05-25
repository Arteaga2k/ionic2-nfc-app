/**
 * Login service
 * Created by Michael DESIGAUD on 15/03/2016.
 */

import {Injectable,Inject} from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {NavController, Alert} from 'ionic-angular';
import {User} from '../../classes/user';
import {NFCPage} from '../nfc/nfc';
import {StorageUtils} from '../../utils/storage.utils';

const CONTENT_TYPE_HEADER:string = 'Content-Type';
const APPLICATION_JSON:string = 'application/json';
const BACKEND_URL:string = 'http://demo2726806.mockable.io/authenticate';

@Injectable()
export class LoginService {
    constructor(private http:Http) {}
    login(username:string,password:string,rememberMe:boolean):Observable<any> {
        if(username.toLowerCase() !== 'admin' || password.toLowerCase() !== 'admin') {
            let alert = Alert.create({
                title: 'Invalid credentials',
                subTitle: 'You entered invalid credentials !',
                buttons: ['Ok']
            });
            return Observable.throw(alert);
        } else {

            let headers = new Headers();
            headers.append(CONTENT_TYPE_HEADER, APPLICATION_JSON);

            return this.http.post(BACKEND_URL,JSON.stringify({login:username,password:password}),{headers:headers}).map((res:Response) => {

                let loginData:any = res.json();
                let user:User = this.readJwt(loginData.token);
                user.username = username;
                user.password = password;

                console.log('Login successful', user);

                if (rememberMe) {
                    console.log('Remember me: Store user and jwt to local storage');
                    StorageUtils.setAccount(user);
                    StorageUtils.setToken(loginData.token);
                }

                return user;
            });
        }
    }
    private readJwt(token:string):User {
        let tokens:Array<any> = token.split('.');
        let tokenPayload:any = JSON.parse(atob(tokens[1]));

        let user:User = new User();
        user.lastConnection = new Date();
        user.id = parseInt(tokenPayload.iss);
        user.email = tokenPayload.sub;
        user.firstName = tokenPayload.firstName;
        user.lastName = tokenPayload.lastName;
        user.roles = tokenPayload.role;

        return user;
    }
}
