import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PlantsModel} from '../../../models/plantsModel';
import {PlantsDataService} from '../../../services/plants-data.service';

@Component({
  selector: 'app-all-plants',
  templateUrl: './all-plants.component.html',
  styleUrls: ['./all-plants.component.scss']
})
export class AllPlantsComponent implements OnInit {
  plantsList: MatTableDataSource<PlantsModel>;
  plantsTempList: PlantsModel[];
  displayedColumns: string[] = ['common_name', 'plant_type', 'soil_type', 'bloom_time', 'flower_color', 'habitat_value'];
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  showError = false;
  errorMessage = '';
  offsetValue = 0;
  currentPage = 1;

  constructor(private route: ActivatedRoute, private pds: PlantsDataService) {
  }

  ngOnInit() {
    const currentData = JSON.parse(sessionStorage.getItem('local')) as PlantsModel[];
    const saveData: PlantsModel[] = currentData !== undefined ? currentData : [] as PlantsModel[];
    this.route.data.subscribe(data => {
      this.plantsTempList = data.PlantsListResolver;
      this.plantsList = new MatTableDataSource(data.PlantsListResolver);
      for (const i in saveData) {
        if (saveData !== []) {
          this.plantsList.filteredData.push(saveData[i]);

        }
      }
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });
    //
    this.plantsList.sort = this.sort;
    this.offsetValue = 0;

  }

  onChangePage(plantsTempList: Array<any>) {
    // update current page of plants
    this.plantsTempList = plantsTempList;
  }

  previousList() {
    if (this.offsetValue > 0) {
      this.offsetValue -= 15;
      this.currentPage--;
      this.pds.getPlants(this.offsetValue).subscribe(data => this.plantsTempList = data);

    }
  }

  nextList() {
    this.offsetValue += 15;
    this.currentPage++;
    this.pds.getPlants(this.offsetValue).subscribe(data => this.plantsTempList = data);

  }

  headerShaper(title: string): string {
    const tempTitle = title.replace(/_/g, ' ');
    return tempTitle[0].toUpperCase() + tempTitle.substring(1);
  }
}
