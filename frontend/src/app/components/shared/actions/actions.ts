import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-actions',
  standalone: false,
  templateUrl: './actions.html',
  styleUrls: ['./actions.css']
})
export class Actions {
  @Output() edit = new EventEmitter<void>();

  onEditClick(operation: string):void {
    this.edit.emit();
    console.log(operation);
  }
}
