import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MainService } from '../main.service';
import { Router } from '@angular/router';
import { CacheFactory } from 'cachefactory';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'user-cmp',
    moduleId: module.id,
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit{
  form: FormGroup;
  emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  numberPattern = '^[0-9]+$';
  loading = false;
  public userDetails : any;
  public completeUserDetails : any;
  cache;



  constructor(private mainService: MainService, private fb: FormBuilder, private router: Router) { }

    ngOnInit(){
      this.initCache();
      this.createForm();

      this.userDetails = this.cache.get('token');
      var dataToSend = {
        token:this.userDetails.token
      }
      this.mainService.getUserDetails(dataToSend).subscribe(data => {
        this.completeUserDetails = data;
        this.setFormValue();
      }, err => {
        alert(err['error'])
      })
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

    createForm() {
      this.form = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        mobileNumber: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(10)]],
        username: ['', Validators.required],
        role: ['', Validators.required],
      });

    }
    setFormValue() {
      this.form.setValue({
        fullName: this.completeUserDetails['fullName'],
        email: this.completeUserDetails['email'],
        mobileNumber: this.completeUserDetails['mobileNumber'],
        username: this.completeUserDetails['username'],
        role: this.completeUserDetails['role']
      });
    }
    onSubmit() {
      const username: String = (this.form.get('username').value).toLowerCase();

      this.form.get('username').setValue(username);

      this.completeUserDetails['username'] = this.form.value['username'];
      this.completeUserDetails['email'] = this.form.value['email'];
      this.completeUserDetails['mobileNumber'] = this.form.value['mobileNumber'];

      this.mainService.updateUser(this.completeUserDetails).subscribe(data => {
        alert(data)
      }, err =>{
        alert(err['error'])
      })
    }

}
