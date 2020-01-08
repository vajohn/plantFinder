import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PlantsModel} from '../../../models/plantsModel';

@Component({
  selector: 'app-all-plants',
  templateUrl: './all-plants.component.html',
  styleUrls: ['./all-plants.component.scss']
})
export class AllPlantsComponent implements OnInit {
  plantsList: MatTableDataSource<PlantsModel>;
  plantsTempList;
  displayedColumns: string[] = ['common_name', 'plant_type', 'soil_type', 'bloom_time', 'flower_color', 'habitat_value'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showError = false;
  errorMessage = '';

  constructor(private route: ActivatedRoute) {
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
      // this.plantsList.filteredData.push(...saveData);
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });
    //
    this.plantsList.sort = this.sort;
  }

  onChangePage(plantsTempList: Array<any>) {
    // update current page of plants
    this.plantsTempList = plantsTempList;
  }
}
