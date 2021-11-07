import { WindowObservable } from '@ancestable/shared';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DatasetService } from 'src/app/services/dataset.service';
import { DatasetStoreService } from 'src/app/store/dataset-store.service';
import { CreateNewDatasetDialogComponent } from '../create-new-dataset-dialog/create-new-dataset-dialog.component';
import { DatasetSelectorItem } from '../dataset-selector/dataset-selector.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  datasetSelectorItems: DatasetSelectorItem[] = [];
  selectedDatasetName: string = '';

  constructor(
    private dialog: MatDialog,
    private datasetService: DatasetService,
    private datasetStoreService: DatasetStoreService,
  ) { }

  ngOnInit(): void {
    this.datasetStoreService.datasets.subscribe((datasets) => {
      this.datasetSelectorItems = datasets.map((dataset) => ({ name: dataset.name, id: dataset.id || '' }));
      this.selectedDatasetName = datasets[0]?.name || '';
      if (datasets[0].id) {
        this.loadFullDataset(datasets[0].id);
      }
    });

    this.datasetStoreService.selectedDatasetId.subscribe((selectedDatasetId) => {
      const datasets = this.datasetStoreService.getDatasets();
      this.selectedDatasetName = datasets.find((dataset) => dataset.id === selectedDatasetId)?.name || '';
    });

    this.datasetService.loadAll().subscribe((datasets) => this.datasetStoreService.saveDatasets(datasets));

    WindowObservable.DatasetWithRecords.subscribe((dataset) => console.log(dataset));
  }

  openCreateNewDialog(): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateNewDatasetDialogComponent, dialogConfig);
  }

  onItemClick(selectedDatasetId: string): void {
    this.datasetStoreService.saveSelectedDatasetId(selectedDatasetId);
    this.loadFullDataset(selectedDatasetId);
  }

  private loadFullDataset(selectedDatasetId: string): void {
    this.datasetService.loadFullDataset(selectedDatasetId).subscribe((dataset) => {
      WindowObservable.DatasetWithRecords.publish(dataset);
    });
  }
}
