import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import { MainService } from '../main.service';

@Component({
    selector: 'app-form',
    templateUrl: 'form.component.html',
    styleUrls: ['form.component.css']
})

export class FormComponent implements OnInit {
    form: FormGroup;
    loading = false;
    ageError = true;
    dists = [];
    numberPattern = '^[0-9]+$';
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

    constructor(private mainService: MainService, private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();

    }

    createForm() {
        this.form = this.fb.group({
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

    onSubmit() {

        this.loading = true;
        let x;

        x = (this.form.get('firstName').value).toLowerCase();
        this.form.get('firstName').setValue(x);
        x = (this.form.get('lastName').value).toLowerCase();
        this.form.get('lastName').setValue(x);

        x = (this.form.get('interviewerId').value).toLowerCase();
        this.form.get('interviewerId').setValue(x);

        x = (this.form.get('pid').value).toLowerCase();
        this.form.get('pid').setValue(x);
        
        this.mainService.submitForm(this.form.value).subscribe( data => {
            this.loading = false;
            alert(data['message']);
            this.form.reset();
        }, err => {
            this.loading = false;
            alert(err['error']);
        });
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


}
