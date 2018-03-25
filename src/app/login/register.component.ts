import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../main.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CacheFactory } from 'cachefactory';
import { Router } from '@angular/router';


declare var $: any;

@Component({
  selector: 'register',
  // moduleId: module.id,
  templateUrl: 'register.component.html',
  styleUrls: ['login.component.css']
})

export class RegisterComponent implements OnInit {

  form: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  numberPattern = '^[0-9]+$';
  loading = false;
  cache;

  constructor(private mainService: MainService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.initCache();
    if(this.cache.get('token')) {
      this.router.navigate(['/dashboard']);
    }
    this.createForm();

  }



  createForm() {
    this.form = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      mobileNumber: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(10)]],
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

        // Check for expired items every 60 seconds
        recycleFreq: 60 * 1000,
        // This cache will use `localStorage`
        storageMode: 'localStorage'
      });
    } else {
      this.cache = cacheFactory.get('my-cache');
    }
  }


  onSubmit() {


    const fullName: String = (this.form.get('fullName').value).toLowerCase();
    const username: String = (this.form.get('username').value).toLowerCase();

    this.form.get('fullName').setValue(fullName);
    this.form.get('username').setValue(username);


    this.loading = true;

    this.mainService.register(this.form.value).subscribe(data => {
      this.loading = false;
      this.cache.put('token',{token: data['token'],fullName:data['fullName'],role:data['role']});
      this.router.navigate(['/dashboard']);


    }, err => {
      alert(err['error'])
      this.loading = false;
    });

  }


}
