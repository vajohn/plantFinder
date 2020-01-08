import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {PlantsModel} from '../../models/plantsModel';

@Component({
  selector: 'app-plant-info-modal',
  templateUrl: './plant-info-modal.component.html',
  styleUrls: ['./plant-info-modal.component.scss']
})
export class PlantInfoModalComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<PlantInfoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PlantsModel
  ) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
