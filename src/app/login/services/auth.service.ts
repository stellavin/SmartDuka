
import { ENV } from './../../_shared/constant/env';
import { AuthToken } from './../../_services/AuthToken';
import { Observable } from 'rxjs/Observable';
import { BaseService } from './../../_bases/services/BaseService';
import { Auth } from './../models/auth';
import { ListResponse } from './../../_bases/models/ListResponse';
import { HttpSettingsService } from './../../_services/HttpSettingsService';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import { SessionService } from '../../_services/SessionService';
import { HttpHeaders } from '@angular/common/http';

@Injectable()

export class AuthService extends BaseService {

    public _basePath = 'oauth/token/';

    constructor(public http: Http,
                public _httpSettings: HttpSettingsService,
                public _sesstionService: SessionService,
                private _authToken: AuthToken
    ) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        const toReturn = <ListResponse>res.json();
        for (const num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = new Auth(toReturn.results[num]);
            }
        }
        return toReturn;
    }

    singleMap(res: Response): Auth {
        return new Auth(res.json());
    }

    public login(data, params?): Observable<any> {

        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getUnauthorizedHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log('data---->>', data);
        const userdata = 'grant_type=password&client_id='+ encodeURIComponent(ENV.CLIENT_ID)+'&client_secret='+encodeURIComponent(ENV.CLIENT_SECRET)+'&username='+encodeURIComponent(data.username)+'&password='+encodeURIComponent(data.password);
        return this.http.post(this.getUrl(), userdata, options)
            .map(res => {
                const toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                this._authToken.setToken(toReturn.access_token);
                this._sesstionService.actionLoggedIn();
                return toReturn;
            })
            .catch(this.handleError);
    }

    public logout(): Observable<any> {

        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders()
        };
        return this.http.post(this._httpSettings.getBaseUrl() + 'accounts/logout/', '', options)
            .map(res => {
                const toReturn = <any>res.json();
                this._authToken.setToken(toReturn.access_token);
                this._sesstionService.logout();
                return toReturn;
            })
            .catch(this.handleError);
    }
    


}
