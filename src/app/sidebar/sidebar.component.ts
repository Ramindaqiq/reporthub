import { Component, OnInit } from '@angular/core';
import { CacheFactory } from 'cachefactory';
import { Router, ActivatedRoute } from '@angular/router';
declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon:'fa fa-bar-chart', class: ''},
    { path: 'edit-profile', title: 'Edit Profile',  icon:'fa fa-user', class: ''},
    { path: 'data-entry', title: 'Data Entry', icon: 'fa fa-wpforms', class: ''},
    { path: 'table', title: 'Table List',  icon:'fa fa-table', class: ''},
    { path: 'users', title: 'Users',  icon:'fa fa-users', class: ''},
    { path: 'maps', title: 'Maps',  icon:'ti-map', class: ''}
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    public userDetails: any;
    cache;

    constructor(private router: Router) {

    }

    ngOnInit() {
        this.initCache();

        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.userDetails = this.cache.get('token');
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }
    initCache() {
      const cacheFactory = new CacheFactory();
      let cache;
      // Check whether cache metadata has been initialized
      // on every page refresh.
      if (!cacheFactory.exists('my-cache')) {
        // Create the cache metadata. Any previously saved
        // data will be loaded.
        this.cache = cacheFactory.createCache('my-cache', {
          // Delete items from the cache when they expire
          deleteOnExpire: 'aggressive',
          // cache expires after 1 hour
          maxAge: 60 * 60 * 1000 ,

          // Check for expired items every 60 seconds
          recycleFreq: 60 * 1000,
          // This cache will use `localStorage`
          storageMode: 'localStorage'
        });
      }
    }
    logout() {
        const cacheFactory = new CacheFactory();
        if (!cacheFactory.exists('my-cache')) {
          // Create the cache metadata. Any previously saved
          // data will be loaded.
          this.cache = cacheFactory.createCache('my-cache', {
            // Delete items from the cache when they expire
            deleteOnExpire: 'aggressive',
            // cache expires after 1 hour
            maxAge: 60 * 60 * 1000 ,

            // Check for expired items every 60 seconds
            recycleFreq: 60 * 1000,
            // This cache will use `localStorage`
            storageMode: 'localStorage'
          });
        }
        cacheFactory.destroy('my-cache');
        this.router.navigate(['/login']);
    }

    checkRole(pt): boolean {
      if(this.userDetails.role === 'viewer') {
        if(pt === 'users' || pt === 'data-entry') {
          return false;
        }
        return true;

      } else if(this.userDetails.role === 'editor') {
        if(pt === 'users') {
          return false;
        }
        return true;

      } else {
        return true;
      }

}
}
