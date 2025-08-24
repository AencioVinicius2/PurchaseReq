import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  standalone: false,
  templateUrl: './actions.html',
  styleUrls: ['./actions.css']
})
export class Actions {
  @Output() edit = new EventEmitter<void>();
  @Output() view = new EventEmitter<void>();
  @Input() selectedItem: string | null = null;

  onEditClick(operation: string, item:string | null):void {
    if(item !== null) {
      this.edit.emit();
    }
    console.log(operation, item);
  }

  onViewClick(operation: string, item:string | null): void {
    if(item !== null) {
      this.view.emit();
    }
    console.log(operation, item);
  }

  onConfirmOperation():void {
    console.log(this.selectedItem);
  }
}
