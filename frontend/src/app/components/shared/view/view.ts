import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IAddStockItemDTO } from '../../../Models/addStockDTO';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrls: ['./view.css']
})
export class View {
  @Output() back = new EventEmitter<void>();
  @Input() data: any;
  @Input() fields: any;
  @Input() operation: any;
  @Input() title: any;


  onBackClick():void {
    this.back.emit();
  }
  onConfirmOperation():void {
    console.log('estou na view', this.fields);
    console.log(this.data);
  }

  doOperation():void {
    console.log(this.data);
  }
}
