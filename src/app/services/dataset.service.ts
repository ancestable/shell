import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';
import { DatasetModel } from '../models/api/dataset';

import { ConfigurationService } from './configuration.service';

@Injectable({
  providedIn: 'root'
})
export class DatasetService {

  constructor(
    private configurationService: ConfigurationService,
    private http: HttpClient,
  ) { }

  create(name: string, importFile?: File): Observable<DatasetModel> {
    return importFile ? this.createDatasetWithFile(name, importFile) : this.createDataset(name);
  }

  loadAll(): Observable<DatasetModel[]> {
    return this.http.get<any>(`${this.configurationService.apiUrl}/dataset`)
      .pipe(
        retry(1),
      )
  }

  loadFullDataset(datasetId: string) {
    return this.http.get<any>(`${this.configurationService.apiUrl}/dataset/${datasetId}/full`)
      .pipe(
        retry(1),
      )
  }

  private createDataset(name: string) {
    return this.http.post<any>(`${this.configurationService.apiUrl}/dataset`, { name })
      .pipe(
        retry(1),
      )
  }

  private createDatasetWithFile(name: string, importFile: File) {
    const fd = new FormData();
    fd.append('file', importFile, importFile.name);
    fd.append('name', name);
    return this.http.post<any>(`${this.configurationService.apiUrl}/gedcom/upload`, fd)
      .pipe(
        retry(1),
      )
  }
}
