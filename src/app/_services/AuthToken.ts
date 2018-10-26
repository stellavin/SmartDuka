import { Injectable } from '@angular/core';

@Injectable()
export class AuthToken {

    constructor() {
        //
    }

    public getToken() {
        return localStorage.getItem('auth-token');
    }

    public setToken(token: string) {
        return localStorage.setItem('auth-token', token);
    }

    public clearToken() {
        localStorage.removeItem('cartSession');
        return localStorage.removeItem('auth-token');
    }


}
