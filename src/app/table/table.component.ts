import { Component, OnInit } from '@angular/core';
import { MainService } from '../main.service';
import { Survey } from '../models/survey';
import { CacheFactory } from 'cachefactory';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { NgbModal, ModalDismissReasons,NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare interface TableData {
    headerRow: string[];
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html',
    styleUrls: ['table.component.css']
})

export class TableComponent implements OnInit{

    public tableData1: TableData;
    public userDetails:any;
    surveys: any;
    cache;
    closeResult: any;
    form: FormGroup;
    filteredLocation = "all";
    numberPattern = '^[0-9]+$';
    loading = false;
    ageError = true;
    dists = [];
    cities = [{
        name: 'kabul',
        districts: [
            'farza',
            'guldara',
            'kalakan',
            'khake jabar',
            'mirbachakot',
            'shakardara',
            'dah sabz',
            'bagrami',
            'chahar asyab',
            'paghman'
        ]
    },
    {
        name: 'kandahar',
        districts: [
            'dand',
            'kandahar city',
            'arghandab'
        ]
    },
    {
        name: 'herat',
        districts: [
            'guzara',
            'injil',
            'pashtoon zarghoon',
            'kush ki kohna',
            'herat city'
        ]
    },
    {
        name: 'nangarhar',
        districts: [
            'surkh rood',
            'jalalabad city'
        ]
    },
    {
        name: 'helmand',
        districts: [
            'boost',
            'garam ser'
        ]
    }
    ];

    jobs = [
        'governament employee',
        'non-governament employee',
        'self-employed',
        'non-paid',
        'student',
        'homemaker',
        'retired',
        'unemployed( able to work )',
        'unemployed( unable to work )',
        'refused'
    ];

    mStatus = [
        'single',
        'married',
        'seperated',
        'divorced',
        'widowed',
        'refused to answer'
    ];

    educationLevel = [
        'no formal schooling',
        'less then primary school',
        'primary school completed',
        'secondary school completed',
        'high school completed',
        'college/university completed',
        'postgraduate degree',
        'refused to answer'
    ]

    constructor(private mainService: MainService,private modalService: NgbModal, private fb: FormBuilder,private activeModal: NgbActiveModal) { }
    ngOnInit(){
        this.initCache();
        this.createForm();
        this.tableData1 = {
            headerRow: [ 'PID', 'Name', 'Country', 'Province', 'Actions']
        };
        this.userDetails = this.cache.get('token');
        this.getData();

    }
    getData() {
      this.mainService.getFormList(this.filteredLocation).subscribe(data => {
          // this.surveys = new Survey({})
          this.surveys = data;
      }, err => {
          alert(err['error']);
      })
    }
    createForm() {
        this.form = this.fb.group({
            _id: '',
            pid: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
            interviewerId: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
            firstName: ['', Validators.required],
            lastName: '',
            age: ['', [Validators.required, Validators.min(10), Validators.max(65)]],
            job: ['', Validators.required],
            gender: ['', Validators.required],
            maritalStatus: ['', Validators.required],
            educationLevel: ['', Validators.required],
            country: ['', Validators.required],
            province: ['', Validators.required],
            district: ['', Validators.required],
            alcoholConsumption: ['', Validators.required],
            tobaccoProducts: ['', Validators.required],
            eatFruit: ['', Validators.required],
            highSalt: ['', Validators.required],
            oilType: ['', Validators.required]
        });
    }

    validateAge() {

        const age = Number(this.form.get('age').value);

        if (age < 18 || age > 69) {
            this.ageError = false;
        } else {
            this.ageError = true;
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

    onCityChange() {


        let ct = this.form.get('province').value;
        let i;
        for (i = 0; i < this.cities.length; i++) {
            if (ct === this.cities[i].name) {
                this.dists = this.cities[i].districts;
                break;
            }
        }

    }

    openView(view) {
      this.modalService.open(view,{ size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${reason}`;
      });
    }
    openEdit(edit) {
      this.modalService.open(edit,{ size: 'lg' }).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${reason}`;
      });
    }

    setFormValue(survey) {

      let ct = survey.province;
      let i;
      for (i = 0; i < this.cities.length; i++) {
          if (ct === this.cities[i].name) {
              this.dists = this.cities[i].districts;
              break;
          }
      }

      this.form.setValue({
        _id: survey._id,
        pid: survey.pid,
        interviewerId: survey.interviewerId,
        firstName: survey.firstName,
        lastName: survey.lastName,
        age: survey.age,
        job: survey.job,
        gender: survey.gender,
        maritalStatus: survey.maritalStatus,
        educationLevel: survey.educationLevel,
        country: survey.country,
        province: survey.province,
        district: survey.district,
        alcoholConsumption: survey.alcoholConsumption,
        tobaccoProducts: survey.tobaccoProducts,
        eatFruit: survey.eatFruit,
        highSalt: survey.highSalt,
        oilType: survey.oilType
      })
    }

    onDelete(userData) {
      if (confirm("Are you sure you want to delete this form?")) {
        this.mainService.deleteForm(userData).subscribe( data => {
            this.getData()
            alert(data['message']);
            // this.form.reset();
        }, err => {
            alert(err['error']);
        });
      } else {

      }

    }
    onSubmit() {

        this.loading = true;
        let x;

        x = (this.form.get('firstName').value).toLowerCase();
        this.form.get('firstName').setValue(x);
        x = (this.form.get('lastName').value).toLowerCase();
        this.form.get('lastName').setValue(x);


        this.mainService.updateForm(this.form.value).subscribe( data => {
            this.loading = false;
            alert(data['message']);
            this.getData()
            this.activeModal.dismiss('Cross click')
        }, err => {
            this.loading = false;
            alert(err['error']);
        });
    }

}
