import { ENV } from './../_shared/constant/env';
import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {SessionService} from './SessionService';
import {SettingsService} from './SettingsService';

@Injectable()
export class HttpSettingsService {

    private protocol;
    private domain;
    private baseUrl;

    constructor(private _sessionService: SessionService, private _settings: SettingsService) {
        this.protocol = _settings.getProtocol();
        this.domain = _settings.getDomain();
        this.baseUrl = _settings.getBaseUrl();
    }
    
    public getHeaders(): Headers {
        const headersObj = {
          'Content-Type': 'application/json',
          'Authorization': ''
        };
        const token = this._sessionService.getToken();
        console.log('token......', token);
        if (token != null) {
          headersObj.Authorization = 'Bearer ' + token;
        }
        console.log('headersObj......', headersObj);
        return new Headers(headersObj);
      }

    public getUnauthorizedHeaders(): Headers {
        const headersObj = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'
        };
        return new Headers(headersObj);
      }
      public getUnauthorizedHeadersForPost(): Headers {
        const headersObj = {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        };
        return new Headers(headersObj);
      }

    public getBaseUrl() {
        return this.protocol + this.domain + this.baseUrl;
    }

}
