import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Survey } from '../models/survey';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { CacheFactory } from 'cachefactory';
import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare interface TableData {
    headerRow: string[];
}

@Component({
    selector: 'users-cmp',
    moduleId: module.id,
    templateUrl: 'users.component.html',
    styleUrls: ['../table/table.component.css']
})

export class UsersComponent implements OnInit{

    public tableData1: TableData;
    users: any;
    cache;
    form: FormGroup;
    filteredRole= 'all';
    formNew: FormGroup;
    emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    numberPattern = '^[0-9]+$';
    public userDetails : any;
    closeResult: any;
    roles = [
        'viewer',
        'editor',
        'admin'
    ];

    constructor(private mainService: MainService,private modalService: NgbModal,private fb: FormBuilder) { }
    ngOnInit(){
        this.createForm();
        this.createNewForm();
        this.initCache();
        this.userDetails = this.cache.get('token');
        this.getUsersList();
        this.tableData1 = {
            headerRow: [ 'Name', 'Email', 'Mobile Number', 'Role','Actions']
        };
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
    getUsersList() {
      var data = {
        'token': this.userDetails['token'],
        'role' : this.filteredRole
      }
      this.mainService.getUserList(data).subscribe(data => {
          this.users = data.users;
      }, err => {
      })
    }
    createForm() {
        this.form = this.fb.group({
            _id: '',
            fullName: ['', Validators.required],
            email: ['', Validators.required],
            mobileNumber: ['', Validators.required],
            role: ['', Validators.required]
        });
    }
    createNewForm() {
      this.formNew = this.fb.group({
        fullName: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
        mobileNumber: ['', [Validators.required, Validators.pattern(this.numberPattern), Validators.minLength(10)]],
        username: ['', Validators.required],
        password: ['', Validators.required],
        role: ['', Validators.required]
      });
    }
    createNewUser() {
      const fullName: String = (this.formNew.get('fullName').value).toLowerCase();
      const username: String = (this.formNew.get('username').value).toLowerCase();
      const role: String = (this.formNew.get('role').value).toLowerCase();

      this.formNew.get('fullName').setValue(fullName);
      this.formNew.get('username').setValue(username);
      this.formNew.get('role').setValue(role);

      this.mainService.register(this.formNew.value).subscribe(data => {
        this.formNew.reset();
        this.getUsersList();
        alert('New user successfully registered.')
      }, err => {
        alert(err['error'])
      });
    }
    openEdit(edit) {
      this.modalService.open(edit,{ size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${reason}`;
      });
    }
    openNewUser(newUser) {
      this.modalService.open(newUser,{ size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${reason}`;
      });
    }

    setFormValue(user) {
      this.form.setValue({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        mobileNumber: user.mobileNumber,
        role: user.role
      })
    }
    onSubmit() {
        let x;
        x = (this.form.get('role').value).toLowerCase();
        this.form.get('role').setValue(x);
        var userRoleData = {
          _id: this.form.value['_id'],
          role: this.form.value['role']
        }
        this.mainService.updateRole(userRoleData).subscribe( data => {
            alert(data);
            this.getUsersList();
        }, err => {
            alert(err['error']);
        });
    }
    onDelete(userData) {
       if (confirm("Are you sure you want to delete this user?")) {
         this.mainService.deleteUser(userData).subscribe( data => {
             this.getUsersList()
             alert(data);
         }, err => {
             alert(err);
         });
       } else {

       }

    }

}
