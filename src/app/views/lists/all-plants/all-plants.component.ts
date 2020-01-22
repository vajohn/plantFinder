import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {PlantsModel} from '../../../models/plantsModel';
import {PlantsDataService} from '../../../services/plants-data.service';
import {LoaderService} from '../../../services/loader.service';
import {ToastComponent} from '../../../components/toast/toast.component';

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
  sortOrder = false;
  selectedCol = '';

  constructor(
    private route: ActivatedRoute,
    private pds: PlantsDataService,
    private ls: LoaderService,
    private sb: MatSnackBar
  ) {

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
      this.sb.openFromComponent(ToastComponent, {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'start',
        data: {text: this.errorMessage},
        panelClass: 'errorToast'
      });
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
      this.ls.showHide();
      this.offsetValue -= 15;
      this.currentPage--;
      this.pds.getPlants(this.offsetValue).subscribe(data => {
        this.plantsTempList = data;
        this.ls.showHide();
      });

    }
  }

  nextList() {
    this.offsetValue += 15;
    this.currentPage++;
    this.pds.getPlants(this.offsetValue).subscribe(data => {
      this.plantsTempList = data;
      this.ls.showHide();
    });

  }

  headerShaper(title: string): string {
    const tempTitle = title.replace(/_/g, ' ');
    return tempTitle[0].toUpperCase() + tempTitle.substring(1);
  }

  sortColumn(column) {
    this.sortOrder = !this.sortOrder;
    this.selectedCol = column;
    const order = this.sortOrder ? 'ASC' : 'DESC';

    this.pds.getOdoredPlants(this.offsetValue, column + '+' + order).subscribe(data => this.plantsTempList = data);
  }
}
