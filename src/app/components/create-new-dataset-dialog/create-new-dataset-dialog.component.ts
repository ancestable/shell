import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from "@angular/material/dialog";
import { DatasetService } from 'src/app/services/dataset.service';
import { DatasetStoreService } from 'src/app/store/dataset-store.service';

@Component({
  selector: 'app-create-new-dataset-dialog',
  templateUrl: './create-new-dataset-dialog.component.html',
  styleUrls: ['./create-new-dataset-dialog.component.scss']
})
export class CreateNewDatasetDialogComponent implements OnInit {

  MAX_DATASET_NAME = 50;

  form: FormGroup;
  datasetName: string;
  isSaveDisabled = true;
  selectedFile: File;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CreateNewDatasetDialogComponent>,
    private datasetService: DatasetService,
    private datasetStoreService: DatasetStoreService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      datasetName: [ this.datasetName, [] ],
    });

    this.onChanges();
  }

  save(): void {
    const name = this.form.get('datasetName')?.value;
    this.datasetService.create(name, this.selectedFile)
      .subscribe((createdDataset) => {
        this.datasetStoreService.addDataset(createdDataset);
        this.dialogRef.close(this.form.value);
      })
  }

  close(): void {
    this.dialogRef.close();
  }

  uploadFileEvt(importFile: any): void {
    const files = importFile.target.files as FileList;
    if (files && files[0]) {
      this.selectedFile = files[0];
      this.fileInput.nativeElement.value = "";
    }
  }

  get fileLabel() {
    return this.selectedFile?.name || 'Choose File';
  }

  private onChanges(): void {
    this.form.get('datasetName')?.valueChanges.subscribe(val => {
      this.isSaveDisabled = val.length === 0;
    });
  }
}
