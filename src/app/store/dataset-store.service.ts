import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DatasetModel } from '../models/api/dataset';

@Injectable({
  providedIn: 'root'
})
export class DatasetStoreService {

  private _datasets = new BehaviorSubject<DatasetModel[]>([]);
  public readonly datasets: Observable<DatasetModel[]> = this._datasets.asObservable();

  private _selectedDatasetId = new BehaviorSubject<string | null>(null);
  public readonly selectedDatasetId: Observable<string | null> = this._selectedDatasetId.asObservable();

  constructor() { }

  saveDatasets(datasets: DatasetModel[]): void {
    this._datasets.next(datasets);
  }

  addDataset(dataset: DatasetModel): void {
    const datasets = this.getDatasets();
    datasets.push(dataset);
    this._datasets.next(datasets)
  }

  getDatasets(): DatasetModel[] {
    return this._datasets.value;
  }

  saveSelectedDatasetId(datasetId: string): void {
    this._selectedDatasetId.next(datasetId);
  }

  getSelectedDatasetId(): string | null {
    return this._selectedDatasetId.value;
  }
}
