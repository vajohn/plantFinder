import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PlantInfoModalComponent} from '../../../components/plant-info-modal/plant-info-modal.component';
import {PlantsModel} from '../../../models/plantsModel';
import {PlantsDataService} from '../../../services/plants-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-filter-plants',
  templateUrl: './filter-plants.component.html',
  styleUrls: ['./filter-plants.component.scss']
})
export class FilterPlantsComponent implements OnInit {
  plantsList;
  plantsTempList;
  searchPlantForm: FormGroup;
  displayedColumns: string[] = ['common_name'];
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  types: string[] = ['Shrub', 'Tree', 'Perennial', 'Grass'];
  locations: string[] = ['Garden', 'Roof', 'Sidewalk'];
  values: string[] = ['Pollinator', 'Cover', 'Fruit', 'Greens', 'Buds', 'Ghetto'];

  showError = false;
  errorMessage = '';

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private pds: PlantsDataService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    const currentData = JSON.parse(sessionStorage.getItem('local')) as PlantsModel[];
    const saveData: PlantsModel[] = currentData !== undefined ? currentData : [] as PlantsModel[];
    this.route.data.subscribe(data => {
      this.plantsList = new MatTableDataSource(data.PlantsListResolver);
      for (const i in saveData) {
        if (saveData !== []) {
          this.plantsList.filteredData.push(saveData[i]);
        }
      }
      // this.plantsList.filteredData.push(...saveData); jasmine refused to allow this
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });

    this.plantsList.sort = this.sort;
    this.plantsTempList = this.plantsList;

    this.searchPlantForm = this.formBuilder.group({
      bloom_time: ['', Validators.required],
      plant_type: [''],
      appropriate_location: [''],
      habitat_value: ['']
    });

  }


  get f() {
    return this.searchPlantForm.controls;
  }

  filterResult() {
    if (this.searchPlantForm.invalid) {
      return;
    }

    const tempFilterParams: PlantsModel = this.searchPlantForm.value;

    if (tempFilterParams.plant_type === '') {
      delete tempFilterParams.plant_type;
    }
    if (tempFilterParams.appropriate_location === '') {
      delete tempFilterParams.appropriate_location;
    }
    if (tempFilterParams.habitat_value === '') {
      delete tempFilterParams.habitat_value;
    }

    this.pds.searchForPlants(tempFilterParams).subscribe(data => this.plantsTempList = data.slice(0, 10));
  }

  resetList() {
    this.searchPlantForm.reset();
    this.pds.getPlants().subscribe(data => this.plantsTempList = data.slice(0, 10));
  }

  openModal(row: any) {
    console.log(row);
    this.dialog.open(PlantInfoModalComponent, {data: row});
  }
}
