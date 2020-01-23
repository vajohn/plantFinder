import {Component, OnInit, } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PlantsModel} from '../../../models/plantsModel';

@Component({
  selector: 'app-all-plants',
  templateUrl: './all-plants.component.html',
  styleUrls: ['./all-plants.component.scss']
})
export class AllPlantsComponent implements OnInit {
  plantsTempList: PlantsModel[];
  displayedColumns: string[] = ['common_name', 'plant_type', 'soil_type', 'bloom_time', 'flower_color', 'habitat_value'];

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.plantsTempList = data.PlantsListResolver;
    });
  }

}
