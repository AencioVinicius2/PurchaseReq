import { Component, EventEmitter, Input, Output, QueryList, ViewChildren,  } from '@angular/core';
import { NgForm, NgModel } from '@angular/forms';
import { IAddStockItemDTO } from '../../../Models/addStockDTO';

@Component({
  selector: 'app-view',
  standalone: false,
  templateUrl: './view.html',
  styleUrls: ['./view.css']
})
export class View {
  @Output() back = new EventEmitter<void>();
  @Output() dataOutput = new EventEmitter<any>();
  @Input() data: any;
  @Input() fields: any;
  @Input() operation: any;
  @Input() title: any;
  @ViewChildren('f') forms!: QueryList<NgForm>;

  dataInput:any = [
   
  ]

  onBackClick():void {
    this.back.emit();
  }

  onConfirmOperation():void {
    if(this.operation == '1') {
      console.log('at onconfirm');
      this.dataInput = [];
      //const formData = f.value;
      //this.dataInput.push(formData);
      //this.dataOutput.emit(formData);
      this.submitForm();
    }
  }

  submitForm():void {
    const allFormData = this.forms.map(form => form.value);
    this.dataInput = [];
    this.dataInput.push(...allFormData);
    this.dataOutput.emit(allFormData);
    console.log('submitForm', this.dataInput);
  }

  doOperation():void {
    console.log(this.data);
  }
}
