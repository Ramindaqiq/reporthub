import { Component, OnInit, Renderer, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { CacheFactory } from 'cachefactory';
@Component({
    moduleId: module.id,
    selector: 'navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit{
    private listTitles: any[];
    location: Location;
    private nativeElement: Node;
    private toggleButton;
    public userDetails: any;
    private sidebarVisible: boolean;
    cache;

    @ViewChild("navbar-cmp") button;

    constructor(location:Location, private renderer : Renderer, private element : ElementRef, private router: Router) {
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }

    ngOnInit(){
        this.initCache();
        this.listTitles = ROUTES.filter(listTitle => listTitle);
        var navbar : HTMLElement = this.element.nativeElement;
        this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
        this.userDetails = this.cache.get('token');
    }
    getTitle(){
        var titlee = window.location.pathname;
        titlee = titlee.substring(11);
        for(var item = 0; item < this.listTitles.length; item++){
            if(this.listTitles[item].path === titlee){
                return this.listTitles[item].title;
            }
        }
        return 'Dashboard';
    }
    sidebarToggle(){
        var toggleButton = this.toggleButton;
        var body = document.getElementsByTagName('body')[0];

        if(this.sidebarVisible == false){
            setTimeout(function(){
                toggleButton.classList.add('toggled');
            },500);
            body.classList.add('nav-open');
            this.sidebarVisible = true;
        } else {
            this.toggleButton.classList.remove('toggled');
            this.sidebarVisible = false;
            body.classList.remove('nav-open');
        }
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
}
