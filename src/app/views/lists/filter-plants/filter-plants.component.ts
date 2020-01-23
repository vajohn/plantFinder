import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PlantInfoModalComponent} from '../../../components/plant-info-modal/plant-info-modal.component';
import {PlantsDataService} from '../../../services/plants-data.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TableComponent} from '../../../components/table/table.component';

@Component({
  selector: 'app-filter-plants',
  templateUrl: './filter-plants.component.html',
  styleUrls: ['./filter-plants.component.scss']
})
export class FilterPlantsComponent implements OnInit {
  plantsList;
  searchPlantForm: FormGroup;
  displayedColumns: string[] = ['common_name'];
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  types: string[] = ['Shrub', 'Tree', 'Perennial', 'Grass'];
  locations: string[] = ['Garden', 'Roof', 'Sidewalk'];
  values: string[] = ['Pollinator', 'Cover', 'Fruit', 'Greens', 'Buds'];
  sortOrder = false;

  @ViewChild(TableComponent, {static: false}) private tableComponent: TableComponent;

  constructor(
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private pds: PlantsDataService,
    private formBuilder: FormBuilder
  ) {
  }


  ngOnInit() {
    this.searchPlantForm = this.formBuilder.group({
      bloom_time: ['', Validators.required],
      plant_type: [''],
      appropriate_location: [''],
      habitat_value: ['']
    });


    this.route.data.subscribe(data => {
      this.plantsList = data.PlantsListResolver;

    });
  }

  get f() {
    return this.searchPlantForm.controls;
  }

  filterResult() {
    if (this.searchPlantForm.invalid) {
      return;
    }
    this.tableComponent.filter(this.filterColumn, this.searchPlantForm.value);
  }

  resetList() {
    this.searchPlantForm.reset();
    this.pds.getPlants(0).subscribe(data => this.plantsList = data.slice(0, 10));
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
      this.plantsList = data;
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
