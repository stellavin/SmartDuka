import { Category } from './../model/categorys';
import { ListResponse } from './../../_bases/models/ListResponse';
import { BaseService } from './../../_bases/services/BaseService';
import { HttpSettingsService } from './../../_services/HttpSettingsService';
import { Injectable } from '@angular/core';
import {Http, Response, RequestOptionsArgs, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';

@Injectable()

export class CategoryService extends BaseService {

    public _basePath = 'api/v1/categories/';

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

    singleMap(res: Response): Category {
        return new Category(res.json());
    }



}
