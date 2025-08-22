import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrls: ['./view.css']
})
export class View {
  @Output() back = new EventEmitter<void>();
  @Input() data: any;

  onBackClick():void {
    this.back.emit();
  }
  onConfirmOperation():void {
    console.log('estou na view')
    console.log(this.data);
  }
}
