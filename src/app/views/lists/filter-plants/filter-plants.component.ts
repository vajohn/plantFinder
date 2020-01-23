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
  sortOrder = false;
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

    this.pds.searchForPlants(this.filterColumn(this.searchPlantForm.value)).subscribe(data => {
      this.plantsTempList = data;
    });

  }

  resetList() {
    this.searchPlantForm.reset();
    this.pds.getPlants(0).subscribe(data => this.plantsTempList = data.slice(0, 10));
  }

  openModal(row: any) {

    this.dialog.open(PlantInfoModalComponent, {data: row});
  }

  sortColumn() {
    this.sortOrder = !this.sortOrder;
    const order = this.sortOrder ? 'ASC' : 'DESC';
    const temp = this.filterColumn(this.searchPlantForm.value);
    temp.$order = 'common_name+' + order;
    this.pds.searchForPlants(temp).subscribe(data => {
      this.plantsTempList = data;
    });
  }

  filterColumn(tempFilterParams) {
    if (tempFilterParams.plant_type === '' || tempFilterParams.plant_type === null) {
      delete tempFilterParams.plant_type;
    }
    if (tempFilterParams.appropriate_location === '' || tempFilterParams.appropriate_location === null) {
      delete tempFilterParams.appropriate_location;
    }
    if (tempFilterParams.habitat_value === '' || tempFilterParams.habitat_value === null) {
      delete tempFilterParams.habitat_value;
    }

    return tempFilterParams;
  }
}
