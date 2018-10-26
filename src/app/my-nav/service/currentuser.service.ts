
import { ListResponse } from './../../_bases/models/ListResponse';
import { BaseService } from './../../_bases/services/BaseService';
import { HttpSettingsService } from './../../_services/HttpSettingsService';
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import { User } from '../../register/models/user';

@Injectable()

export class CurrentUserService extends BaseService {

    public _basePath = '/api/v1/users/';

    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
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



}
