import { ENV } from './../../_shared/constant/env';
import { Observable } from 'rxjs/Observable';
import { AuthToken } from './../../_services/AuthToken';
import { HttpSettingsService } from './../../_services/HttpSettingsService';
import { ListResponse } from './../../_bases/models/ListResponse';
import {Injectable} from '@angular/core';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {User} from '../models/user';
import { BaseService } from '../../_bases/services/BaseService';
import { SessionService } from '../../_services/SessionService';

@Injectable()

export class RegisterUserService extends BaseService {

    public _basePath = 'api/v1/users/';

    constructor(public http: Http,
                public _httpSettings: HttpSettingsService,
                public _sessionService: SessionService,
                private _authToken: AuthToken
    ) {
        super(http, _httpSettings);
    }

    listMap(res: Response): ListResponse {
        const toReturn = <ListResponse>res.json();
        for (const num in toReturn.results) {
            if (toReturn.results.hasOwnProperty(num)) {
                toReturn.results[num] = toReturn.results[num];
            }
        }
        return toReturn;
    }

    singleMap(res: Response): User {
        return new User(res.json());
    }

    public register(data, params?): Observable<any> {
        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getUnauthorizedHeadersForPost(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        console.log('data...ooo', data);
        return this.http.post(this.getUrl(), data, options)
            .map(res => {
                const toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public getCurrentUser() {
        return this.get('current_user');
      }
}
