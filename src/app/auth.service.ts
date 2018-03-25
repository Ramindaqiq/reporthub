import { NgModule, Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    apiRoot: string = 'http://172.20.10.2:3005';
    redirectUrl = '';

    constructor(private http: HttpClient) {

    }

}
