import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {PlantsDataService} from '../../services/plants-data.service';
import {PlantsModel} from '../../models/plantsModel';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnChanges {
  @Input() data: PlantsModel[];
  @Input() caption: string;
  @Input() displayedColumns = ['common_name'];
  @Input() filteredData: PlantsModel;
  currentPage = 1;
  keys: string[];
  sortOrder = false;
  selectedCol = '';
  offsetValue = 0;
  saveData;
  constructor(private pds: PlantsDataService) {
  }

  ngOnInit() {
  }

  ngOnChanges() {

    this.keys = Object.keys(this.data[13]).filter(
      (key) => {
        return this.displayedColumns.indexOf(key) !== -1;
      }
    );

    const currentData = JSON.parse(sessionStorage.getItem('local')) as PlantsModel[];
    this.saveData = currentData !== null ? currentData : [] as PlantsModel[];
    this.addLocalData();
  }

  headerShaper(key: string): string {
    return key.slice(0, 1).toUpperCase() +
      key.replace(/_/g, ' ').slice(1);
  }

  sortColumn(column) {
    this.sortOrder = !this.sortOrder;
    this.currentPage = 1;
    this.selectedCol = column;
    const order = this.sortOrder ? 'ASC' : 'DESC';

    if (this.filteredData !== undefined) {
      this.filteredData.$order = 'common_name+' + order;
      this.pds.searchForPlants(this.filteredData).subscribe(data =>
        this.data = data
      );
    }
    if (this.filteredData === undefined) {
      this.pds.getOdoredPlants(this.offsetValue, column + '+' + order).subscribe(data => this.data = data);

    }

  }

  filter(filterColumn, searchPlantForm) {
    this.pds.searchForPlants(filterColumn(searchPlantForm)).subscribe(data => {
      this.data = data;
    });
  }

  previousList() {
    if (this.offsetValue > 0) {
      this.offsetValue -= 15;
      this.currentPage--;
      this.pds.getPlants(this.offsetValue).subscribe(data => {
        this.data = data;
      });

    }
  }

  nextList() {
    this.offsetValue += 15;
    this.currentPage++;
    this.pds.getPlants(this.offsetValue).subscribe(data => {
      this.data = data;
    });

  }

  addLocalData() {
    // fixed adding local data
    for (const i in this.saveData) {
      if (this.saveData !== []) {
        this.data.push(this.saveData[i]);
      }
    }
  }
}
