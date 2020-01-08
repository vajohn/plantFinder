import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PlantInfoModalComponent} from '../../../components/plant-info-modal/plant-info-modal.component';
import {PlantsModel} from '../../../models/plantsModel';

@Component({
  selector: 'app-filter-plants',
  templateUrl: './filter-plants.component.html',
  styleUrls: ['./filter-plants.component.scss']
})
export class FilterPlantsComponent implements OnInit {
  plantsList;
  plantsTempList;
  displayedColumns: string[] = ['common_name'];
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  types: string[] = ['Shrub', 'Tree', 'Perennial', 'Grass'];
  locations: string[] = ['Garden', 'Roof', 'Sidewalk'];
  values: string[] = ['Pollinator', 'Cover', 'Fruit', 'Greens', 'Buds'];
  plantSeason: string = this.seasons[0];
  plantType: string;
  plantLocation: string;
  plantValue: string;

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.plantsList = new MatTableDataSource(data.PlantsListResolver);
    }, error => {
      // todo add error modal
    });

    this.plantsList.sort = this.sort;
    this.plantsTempList = this.plantsList.filteredData.slice(0, 10);

  }

  filterResults() {
    // avoiding to directly mutate result data
    const plantList = this.plantsList.filteredData;

    const result = plantList.filter((item: PlantsModel) => {
      return item.bloom_time === this.plantSeason
        || item.plant_type === this.plantType
        || item.appropriate_location === this.plantLocation
        || item.habitat_value === this.plantValue;
    });
    // setting size of result, will make it dynamic in future
    // result.length = 10;
    this.plantsTempList = result.slice(0, 10);
  }

  openModal(row: any) {
    console.log(row);
    this.dialog.open(PlantInfoModalComponent, {data: row});
  }
}
