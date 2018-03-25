import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheFactory } from 'cachefactory';
import { Router } from '@angular/router';

import { MainService } from '../main.service';
import { AuthService } from '../auth.service';


declare var $: any;

@Component({
  selector: 'login',
  // moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})

export class LoginComponent implements OnInit {

  form: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  loading = false;
  cache;

  constructor(private mainService: MainService, private fb: FormBuilder, private router: Router, private authService: AuthService) { }


  ngOnInit() {
    this.initCache();
    if (this.verifyToken()) {
      this.router.navigate(['/dashboard']);
    } else {
      this.createForm();
    }

  }

  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  initCache() {
    const cacheFactory = new CacheFactory();

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


  login() {
    let redirect;
    this.loading = true;
    const username: String = (this.form.get('username').value).toLowerCase();

    this.form.get('username').setValue(username);

    this.mainService.login(this.form.value).subscribe(data => {

      // this.loading = false;
      this.cache.put('token',{'token': data['token'],'fullName':data['fullName'],'role':data['role']});

      redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/dashboard';

      this.router.navigate([redirect]);

    }, err => {
      alert(err['error'])
      this.loading = false;
    });

  }

  verifyToken(): boolean {
    return this.cache.get('token');
  }
}
