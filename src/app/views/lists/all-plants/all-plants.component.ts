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

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.plantsList = new MatTableDataSource(data.PlantsListResolver);

    }, error => {
      // todo add error model
    });
    //
    this.plantsList.sort = this.sort;
  }

  onChangePage(plantsTempList: Array<any>) {
    // update current page of plants
    this.plantsTempList = plantsTempList;
  }
}
