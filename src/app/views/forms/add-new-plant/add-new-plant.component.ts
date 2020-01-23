import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Dropdown} from '../../../models/navigation';
import {PlantsModel} from '../../../models/plantsModel';

@Component({
  selector: 'app-add-new-plant',
  templateUrl: './add-new-plant.component.html',
  styleUrls: ['./add-new-plant.component.scss']
})
export class AddNewPlantComponent implements OnInit, OnDestroy {

  time: Dropdown[] = [
    {value: 'summer', viewValue: 'Summer'},
    {value: 'winter', viewValue: 'Winter'},
    {value: 'spring', viewValue: 'Spring'},
    {value: 'autumn', viewValue: 'Autumn'},
  ];

  type: Dropdown[] = [
    {value: 'shrub', viewValue: 'Shrub'},
    {value: 'perennial', viewValue: 'Perennial'},
    {value: 'tree', viewValue: 'Tree'},
    {value: 'grass', viewValue: 'Grass'}
  ];

  addNewPlant: FormGroup;
  submitted = false;
  showResult = false;
  result = 'Data saved successfully';

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.addNewPlant = this.formBuilder.group({
      bloom_time: ['', Validators.required],
      plant_type: ['', Validators.required],
      common_name: ['', [Validators.required, Validators.minLength(4)]],
      flower_color: ['', [Validators.required, Validators.minLength(4)]],
      soil_type: [''],
      habitat_value: ['']
    });
  }

  ngOnDestroy() {
    this.showResult = false;
  }

  get f() {
    return this.addNewPlant.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.addNewPlant.invalid) {
      return;
    }
    // tslint:disable-next-line:prefer-const
    // let saveData: PlantsModel[] = [] as PlantsModel[];

    const currentData = JSON.parse(sessionStorage.getItem('local')) as PlantsModel[];

    console.log(currentData);

    const saveData: PlantsModel[] = currentData !== null ? currentData : [] as PlantsModel[];
    saveData.push(this.addNewPlant.value);
    sessionStorage.setItem('local', JSON.stringify(saveData));
    this.showResult = true;
  }
}
