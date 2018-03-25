import { NgModule, Component, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MainService {
  // apiRoot: string = 'http://172.20.10.2:3005';
  apiRoot: string = 'http://localhost:3005';
  results: any;
  loading: boolean;

  constructor(private http: HttpClient) {
    this.results = [];
    this.loading = false;
  }

  register(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/register', data);
  }

  login(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/login', data);
  }

  submitForm(data): Observable<any> {
    return this.http.post(this.apiRoot + '/form/save', data);
  }

  getFormList(filteredLocation): Observable<any> {
    return this.http.get(this.apiRoot + '/form/all/?location='+filteredLocation);
  }
  getUserList(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/all', data);
  }
  getUserDetails(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/one', data);
  }
  updateForm(data): Observable<any> {
    return this.http.post(this.apiRoot + '/form/update', data);
  }
  deleteForm(data): Observable<any> {
    return this.http.post(this.apiRoot + '/form/delete', data);
  }
  deleteUser(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/delete', data,{responseType: 'text'});
  }
  updateUser(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/update', data,{responseType: 'text'});
  }
  updateRole(data): Observable<any> {
    return this.http.post(this.apiRoot + '/users/updateRole', data,{responseType: 'text'});
  }
}
