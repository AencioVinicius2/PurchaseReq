import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import { IStockItems } from '../../../Models/stockItems.model';
import { Actions } from '../../../components/shared/actions/actions';
import { Observable } from 'rxjs';
import { Stocks } from '../../../services/stocks';
import { IAddStockItemDTO } from '../../../Models/addStockDTO';

@Component({
  selector: 'app-stocks-component',
  standalone: false,
  templateUrl: './stocks-component.html',
  styleUrl: './stocks-component.css'
})
export class StocksComponent {
  private stockService = inject(Stocks);
  stocksItems$: Observable<IStockItems[]> = this.stockService.getStockItem();

  headerTitles:string[] = [
    'Name',
    'Description',
    'Code',
    'Quantity',
    'price',
    'Created At',
    'Updated At'
  ];
  selectedItemId: string | null = null;
  itemArrayOfObject: any;
  isModalOpen = false;
  dataItem: any;
  dataItemFormated: any;
  dataitemObjOfArray: any[] = [];
  fieldsItem: any[] = [];
  fieldsItemPost: IAddStockItemDTO = {
  name: '',
  description: '',
  code: '',
  quantity: 0,
  price: 0
};
 fieldsKeys: any[] = [];
 actualOperation: string = '';
 title: string = '';
 dataView: IAddStockItemDTO[] = []

  stockIForm = new FormGroup({
    name: new FormControl<string>(''),
    description: new FormControl<string | null>(null),
    code: new FormControl<string>(''),
    quantity: new FormControl<number | null>(null),
    price: new FormControl<number | null>(null),  
  })
 

  getItemCell(id: string, item: IStockItems[]): void {
    this.selectedItemId = id;
    this.itemArrayOfObject = item;
    console.log('getItemCell',this.itemArrayOfObject);
  };

  closeEditModal():void {
    this.isModalOpen = false;
    this.dataitemObjOfArray = [];
    this.fieldsItem = [];
  };

  viewModal(operation: string, itemId: string | null):void {
    this.isModalOpen = true;
    if(operation == '1') {
      this.fieldsKeys = Object.keys(this.fieldsItemPost);
      this.actualOperation = operation;
      this.title = 'Create new Item'
      console.log('actual operation 1', this.actualOperation);
    }
    if(operation == '2') {
      this.formatData(itemId);
      this.fieldsKeys = Object.keys(this.fieldsItemPost);
      this.actualOperation = operation;
      this.title = 'View item'
      console.log('actual operation 2', this.actualOperation);
    }
    if(operation == '3') {
      this.formatData(itemId);
      this.fieldsKeys = Object.keys(this.fieldsItemPost);
      this.actualOperation = operation;
      this.title = 'Update item'
      console.log('actual operation 3', this.actualOperation);
    }
  }

  formatData(itemId: string | null):void {
    for(let item of this.itemArrayOfObject) {
      if(item.id == itemId) {
        this.dataItem = item;
        this.dataItemFormated = [];
        this.dataItemFormated = Object.entries(this.dataItem).forEach(([key, value]) => {
            if(key.includes('At') && value) {
              this.dataitemObjOfArray.push(new Date(value as string).toLocaleString('pt-BR').replace(',',''));
              this.fieldsItem.push(key);
            }else if(value == '') {
              this.dataitemObjOfArray.push('');
              this.fieldsItem.push(key);
            }else {
              this.dataitemObjOfArray.push(value);
              this.fieldsItem.push(key);
            }
        });
      };
    };
    console.log('format data: ', this.itemArrayOfObject);
  };

  getDataFromView(data: IAddStockItemDTO):void {
    this.dataView = [];
    this.dataView.push(data);
    console.log('getDataFormView', this.dataView);
    this.addStockItem(this.dataView);
  }

  addStockItem(data: any):void {
    this.isModalOpen = true;
    const dataObj = Object.assign({}, ...data);
    const dataFlatObj = Object.assign({}, ...Object.values(dataObj))
    //const arrayData = dataObj.map(x)
    //for(let obj of dataObj) {
    //  obj
    //}
    const addStockItemRequest: IAddStockItemDTO = {
      name: this.stockIForm.value.name ?? '',
      description: this.stockIForm.value.description ?? '',
      code: this.stockIForm.value.code ?? '',
      quantity: this.stockIForm.value.quantity ?? 0,
      price: this.stockIForm.value.price ?? 0
    }
    this.fieldsKeys = Object.keys(this.fieldsItemPost);
    //console.log('data', data);
    console.log('obj', dataFlatObj.name);
    //console.log('at add stock', this.fieldsItemPost);
    //this.stockService.postStockItem(addStockItemRequest);
    
  }
  
}
