import { HttpSettingsService } from './../../_services/HttpSettingsService';
import {Injectable, EventEmitter} from '@angular/core';
import {Http, Response, RequestOptionsArgs, URLSearchParams, Headers} from '@angular/http';
import {ListResponse, ListResponseOfObject} from '../models/ListResponse';
import {Observable} from 'rxjs/Observable';
import {BaseModel} from '../models/BaseModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BaseService {

    public _basePath = '';
    public singleO: EventEmitter<any> = new EventEmitter();
    public listO: EventEmitter<any> = new EventEmitter();
    public singleObject: any;
    public listObject: any;


    constructor(public http: Http, public _httpSettings: HttpSettingsService) {
    }

    listMap(res: Response): ListResponse | ListResponseOfObject {
        return res.json();
    }

    singleMap(res: Response) {
        return res.json();
    }


    public getUrl(path?) {
        if (typeof path === 'undefined') {
            path = this._basePath;
        }
        return this._httpSettings.getBaseUrl() + path;
    }

    public getList(params?: Object): Observable<any> {
        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl(), options)
            .map(res => {
                const toReturn = <any>this.listMap(res);
                this.listObject = toReturn;
                this.listO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public get(id, params?): Observable<any> {
        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.get(this.getUrl() + id + '/', options)
            .map(res => {
                const toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    // new
    public post(data, params?): Observable<any> {
        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.post(this.getUrl(), data, options)
            .map(res => {
                const toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    // update
    public put(id, data, params?): Observable<any> {
        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.put(this.getUrl() + id + '/', data, options)
            .map(res => {
                const toReturn = <any>this.singleMap(res);
                this.singleObject = toReturn;
                this.singleO.emit(toReturn);
                return toReturn;
            })
            .catch(this.handleError);
    }

    public delete(id, params?): Observable<any> {
        const options: RequestOptionsArgs = {
            headers: this._httpSettings.getHeaders(),
            search: new URLSearchParams(this.makeStringOfParams(params))
        };
        return this.http.delete(this.getUrl() + id + '/', options)
            .map(res => {
                return res;
            })
            .catch(this.handleError);
    }

    public handleError (error: Response) {
        // console.error(error.status, error.statusText, error.toString());
        const json = error.json();
        // var toReturn = 'Server error';
        let toReturn = json;
        if (json.hasOwnProperty('error')) {
            toReturn = json.error;
        }
        if (json.hasOwnProperty('detail')) {
            toReturn = json.detail;
        }

        return Observable.throw(toReturn);
    }

    public makeStringOfParams(obj: Object) {
        let toReturn = '';
        const qsArray: string[] = [];
        for (const field in obj) {
            if (obj.hasOwnProperty(field)) {
                if (obj[field] === true) {
                    obj[field] = 'True';
                }
                if (obj[field] === false) {
                    obj[field] = 'False';
                }
                qsArray.push(field + '=' + obj[field]);
            }
        }
        toReturn = qsArray.join('&');
        return toReturn;
    }

    removeEmptyFields(obj: Object) {
        const newObj = {};
        for (const field in obj) {
            if (obj.hasOwnProperty(field)) {

                if (
                    (obj[field] === true || obj[field] === false) ||
                    (obj[field] !== '' && obj[field] !== null)
                ) {
                    newObj[field] = obj[field];
                }
            }
        }
        return newObj;
    }

    mergeLists(listFrom: BaseModel[], listTo: BaseModel[]) {
        for (const index in listFrom) {
            if (listFrom.hasOwnProperty(index)) {
                for (const listToIndex in listTo) {
                    if (listTo.hasOwnProperty(listToIndex)) {
                        if (listTo[listToIndex].id === listFrom[index].id) {
                            listTo[listToIndex] = listFrom[index];
                        }
                    }
                }
            }
        }
        return listTo;
    }



}
