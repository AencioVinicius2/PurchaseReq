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
  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();
  @Input() selectedItem: string | null = null;


  openView(operation: string, item: string | null): void {
    if(operation == '1') {
      this.add.emit();
    }
    if(operation == '2') {
      if(item !== null) {
        this.view.emit();
      }
    }
    if(operation == '3') {
      if(item !== null) {
        this.edit.emit();
      }
    }
    if(operation == '4') {
      if(item !== null) {
        this.delete.emit();
      }
    }
  }

  onConfirmOperation():void {
    console.log(this.selectedItem);
  }
}
