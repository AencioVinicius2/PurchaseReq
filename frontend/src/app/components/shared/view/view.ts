import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrls: ['./view.css']
})
export class View {
  @Output() back = new EventEmitter<void>();

  onBackClick():void {
    this.back.emit();
  }
}
