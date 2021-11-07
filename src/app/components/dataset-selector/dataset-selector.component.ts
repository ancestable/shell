import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface DatasetSelectorItem {
  name: string;
  id: string;
}

@Component({
  selector: 'app-dataset-selector',
  templateUrl: './dataset-selector.component.html',
  styleUrls: ['./dataset-selector.component.scss']
})
export class DatasetSelectorComponent implements OnInit {

  @Input() items: DatasetSelectorItem[];
  @Input() selectedItemName: string;

  @Output() onCreateNewClick = new EventEmitter<void>();
  @Output() onItemClick = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void { }
}
