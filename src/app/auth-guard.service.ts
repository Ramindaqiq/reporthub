import { Injectable, ApplicationRef } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot, CanActivateChild, Route,
    CanLoad, NavigationExtras
} from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { CacheFactory } from 'cachefactory';



@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {
    apiIP = 'http://localhost:4400/';

    constructor(private authService: AuthService, private router: Router, private aref: ApplicationRef, private http: HttpClient) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;

        return this.checkToken(url);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);

    }

    canLoad(route: Route): boolean {
        const url = `/${route.path}`;
        return this.checkToken(url);
    }


    checkToken(url: string): boolean {
        const cacheFactory = new CacheFactory();
        let cache;
        if(!cacheFactory.exists('my-cache')) {
            // Create the cache metadata. Any previously saved
            // data will be loaded.
            cache = cacheFactory.createCache('my-cache', {
                // Delete items from the cache when they expire
                deleteOnExpire: 'aggressive',

                // cache expires after 1 hour
                maxAge: 60 * 60 * 1000,

                // Check for expired items every 60 seconds
                recycleFreq: 60 * 1000,
                // This cache will use `localStorage`
                storageMode: 'localStorage'
            });
        } else {
            cache = cacheFactory.get('my-cache');
        }

        if(cache.get('token')) {
            let pt = url.substring(11);
            let userDetails = cache.get('token');
            if(userDetails.role === 'viewer') {
              if(pt === 'users' || pt === 'data-entry') {
                this.router.navigate(['**']);
              }
            } else if(userDetails.role === 'editor') {
              if(pt === 'users') {
                this.router.navigate(['**']);
              }
            }
              return true;
        }  else {
            this.authService.redirectUrl = url;
            this.router.navigate(['/login']);
            return false;
        }


    }
}
