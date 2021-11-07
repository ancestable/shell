import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewDatasetDialogComponent } from './create-new-dataset-dialog.component';

describe('CreateNewDatasetDialogComponent', () => {
  let component: CreateNewDatasetDialogComponent;
  let fixture: ComponentFixture<CreateNewDatasetDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewDatasetDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewDatasetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
