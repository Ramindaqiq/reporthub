import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { MainService } from '../main.service';

declare var $:any;

@Component({
    selector: 'monitoring-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    results : any
    filteredLocation = 'all';
    surveys:any;
    updatedTime :any;
    updatedLocalTime = 0;
    totalForms:any;
    genderDataMale:any;
    genderDataFemale:any;
    maritalSingle:any;
    maritalMarried:any;
    maritalSeperated:any;
    maritalDivorced:any;
    maritalWidowed:any;
    maritalRefused:any;
    provinceKabul:any;
    provinceKandahar:any;
    provinceHerat:any;
    provinceNangarhar:any;
    provinceHelmand:any;
    consumingAlcoholCount:any;
    notConsumingAlcoholCount:any;
    refusedAlcoholCount:any;
    males= 0;
    females= 0;
    singles = 0;
    marrieds = 0;
    seperateds = 0;
    divorceds = 0;
    widoweds = 0;
    refuseds = 0;
    kabul = 0;
    kandahar = 0;
    herat = 0;
    nangarhar = 0;
    helmand = 0;
    consumingAlcohol = 0;
    notConsumingAlcohol = 0;
    refusedAlcohol = 0;
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
    constructor(private mainService: MainService) { }
    getData() {
      this.males= 0;
      this.females= 0;
      this.singles = 0;
      this.marrieds = 0;
      this.seperateds = 0;
      this.divorceds = 0;
      this.widoweds = 0;
      this.refuseds = 0;
      this.kabul = 0;
      this.kandahar = 0;
      this.herat = 0;
      this.nangarhar = 0;
      this.helmand = 0;
      this.consumingAlcohol = 0;
      this.notConsumingAlcohol = 0;
      this.refusedAlcohol = 0;
      this.mainService.getFormList(this.filteredLocation).subscribe(data => {
          // this.surveys = new Survey({})
          this.surveys = data;
          this.totalForms = data.length;
          this.filteringData();
          this.generateGenderChart()
          this.generateMaritalBar()
          this.generateProvinceBar()
          this.generateAlcoholBar()
      }, err => {
          alert(err['error']);
      })
    }
    filteringData() {
      this.surveys.forEach(obj => {
        var localTime = new Date(obj['submissionDate']).getTime()
        if(localTime > this.updatedLocalTime) {
          this.updatedTime = obj['submissionDate'];
          this.updatedLocalTime = localTime;
        }
        if(obj['gender'] === 'male') {
          this.males++;
        } else {
          this.females++;
        }
        if(obj['maritalStatus'] === 'single') {
          this.singles++;
        } else if(obj['maritalStatus'] === 'married') {
          this.marrieds++;
        } else if(obj['maritalStatus'] === 'seperated') {
          this.seperateds++;
        } else if(obj['maritalStatus'] === 'divorced') {
          this.divorceds++;
        } else if(obj['maritalStatus'] === 'widowed') {
          this.widoweds++;
        } else {
          this.refuseds++;
        }
        if(obj['province'] === 'kabul') {
          this.kabul++;
        } else if(obj['province'] === 'kandahar') {
          this.kandahar++;
        } else if(obj['province'] === 'herat') {
          this.herat++;
        } else if(obj['province'] === 'nangarhar') {
          this.nangarhar++;
        } else {
          this.helmand++;
        }
        if(obj['alcoholConsumption'] === 'yes') {
          this.consumingAlcohol++;
        } else if(obj['alcoholConsumption'] === 'no') {
          this.notConsumingAlcohol++;
        } else {
          this.refusedAlcohol++;
        }
      })
    }
    generateAlcoholBar() {
      this.consumingAlcoholCount = this.consumingAlcohol.toString();
      this.notConsumingAlcoholCount = this.notConsumingAlcohol.toString();
      this.refusedAlcoholCount = this.refusedAlcohol.toString();
      new Chartist.Bar('#alcoholBar', {
        labels: [this.consumingAlcoholCount,this.notConsumingAlcoholCount,this.refusedAlcoholCount],
        series: [this.consumingAlcohol,this.notConsumingAlcohol,this.refusedAlcohol]
      }, {
        distributeSeries: true
      });
    }
    generateMaritalBar() {
      this.maritalSingle = this.singles.toString();
      this.maritalMarried = this.marrieds.toString();
      this.maritalSeperated = this.seperateds.toString();
      this.maritalDivorced = this.divorceds.toString();
      this.maritalWidowed = this.widoweds.toString();
      this.maritalRefused = this.refuseds.toString();
      new Chartist.Bar('#maritalBar', {
        labels: [this.maritalSingle,this.maritalMarried,this.maritalSeperated,this.maritalDivorced,this.maritalWidowed,this.maritalRefused],
        series: [this.singles,this.marrieds,this.seperateds,this.divorceds,this.widoweds,this.refuseds]
      }, {
        distributeSeries: true
      });
    }
    generateProvinceBar() {
      this.provinceKabul = this.kabul.toString();
      this.provinceKandahar = this.kandahar.toString();
      this.provinceHerat = this.herat.toString();
      this.provinceNangarhar = this.nangarhar.toString();
      this.provinceHelmand = this.helmand.toString();
      new Chartist.Bar('#provinceBar', {
        labels: [this.provinceKabul,this.provinceKandahar,this.provinceHerat,this.provinceNangarhar,this.provinceHelmand],
        series: [this.kabul,this.kandahar,this.herat,this.nangarhar,this.helmand]
      }, {
        distributeSeries: true
      });
    }
    generateGenderChart() {
      var dataPreferences = {
          series: [
              [25, 30, 20, 25]
          ]
      };

      var optionsPreferences = {
          donut: true,
          donutWidth: 40,
          startAngle: 0,
          total: 100,
          showLabel: true,
          axisX: {
              showGrid: true
          }
      };

      new Chartist.Pie('#genderChart',dataPreferences, optionsPreferences);
      this.genderDataMale = this.males.toString();
      this.genderDataFemale = this.females.toString();
      new Chartist.Pie('#genderChart', {
        labels: [this.genderDataMale,this.genderDataFemale],
        series: [this.males,this.females]
      });
    }
    ngOnInit(){
      this.getData();
      var dataSales = {
        labels: ['9:00AM', '12:00AM', '3:00PM', '6:00PM', '9:00PM', '12:00PM', '3:00AM', '6:00AM'],
        series: [
           [287, 385, 490, 562, 594, 626, 698, 895, 952],
          [67, 152, 193, 240, 387, 435, 535, 642, 744],
          [23, 113, 67, 108, 190, 239, 307, 410, 410]
        ]
      };

      var optionsSales = {
        low: 0,
        high: 1000,
        showArea: true,
        height: "245px",
        axisX: {
          showGrid: false,
        },
        lineSmooth: Chartist.Interpolation.simple({
          divisor: 3
        }),
        showLine: true,
        showPoint: false,
      };

      var responsiveSales: any[] = [
        ['screen and (max-width: 640px)', {
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];

      new Chartist.Line('#chartHours', dataSales, optionsSales, responsiveSales);


      var data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        series: [
          [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
          [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
        ]
      };

      var options = {
          seriesBarDistance: 10,
          axisX: {
              showGrid: false
          },
          height: "245px"
      };

      var responsiveOptions: any[] = [
        ['screen and (max-width: 640px)', {
          seriesBarDistance: 5,
          axisX: {
            labelInterpolationFnc: function (value) {
              return value[0];
            }
          }
        }]
      ];

      new Chartist.Line('#chartActivity', data, options, responsiveOptions);


  }

}
