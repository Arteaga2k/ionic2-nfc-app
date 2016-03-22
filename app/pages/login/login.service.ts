import {Injectable,Inject} from 'angular2/core';
import {Http,Headers,Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {NavController, Alert} from 'ionic-framework/index';
import {User} from '../../classes/user';
import {NFCPage} from '../nfc/nfc';
import {StorageUtils} from '../../utils/storage.utils';
import 'rxjs/add/observable/throw';

/**
 * Login service
 * Created by Michael DESIGAUD on 15/03/2016.
 */

@Injectable()
export class LoginService {
    constructor(private http:Http) {}
    doLogin(username:string,password:string,rememberMe:boolean):Observable<any> {
        if(username.toLowerCase() !== 'admin' || password.toLowerCase() !== 'admin') {
            let alert = Alert.create({
                title: 'Invalid credentials',
                subTitle: 'You entered invalid credentials !',
                buttons: ['Ok']
            });
            //this.nav.present(alert);
            return Observable.throw(alert);
        } else {
            return this.authenticate(username, password).map((loginData:any) => {
                let user:User = new User(loginData);
                user.password = password;
                user.lastConnection = new Date();
                console.log('Login successful', user);

                if (rememberMe) {
                    console.log('Remember me: Store user to local storage');
                    StorageUtils.setToken(user);
                }
            });
        }
    }
    doAutoLogin():Observable<any> {
        if(StorageUtils.hasToken()) {
            let data:any = StorageUtils.getToken();
            console.log('Automatically logged in with data',data);
            return this.doLogin(data.username,data.password,true);
        }
    }
    private authenticate(username:string,password:string):Observable<Response> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data:any = {login:username,password:password};

        return this.http.post('http://demo2726806.mockable.io/login',JSON.stringify(data),{headers:headers})
            .map(res => res.json());
    }
}
