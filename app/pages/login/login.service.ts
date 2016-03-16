import {Injectable,Inject} from 'angular2/core';
import {Http,Headers,Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
/**
 * Login service
 * Created by Michael DESIGAUD on 15/03/2016.
 */

@Injectable()
export class LoginService {
    constructor(@Inject(Http) private http:Http) {}
    authenticate(username:string,password:string):Observable<Response> {

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        let data:any = {login:username,password:password};

        return this.http.post('http://demo2726806.mockable.io/login',JSON.stringify(data),{headers:headers})
            .map(res => res.json());
    }
}
