import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-generic-dialog',
  templateUrl: './generic-dialog.component.html',
  styleUrls: ['./generic-dialog.component.scss']
})
export class GenericDialogComponent {

  @Input() title: string;
  @Input() primaryButtonName: string;
  @Input() primaryButtonDisabled = false;
  @Input() secondaryButtonName: string;
  @Input() secondaryButtonDisabled = false;

  @Output() onPrimaryButtonClick = new EventEmitter<void>();
  @Output() onSecondaryButtonClick = new EventEmitter<void>();

  constructor() { }
}
