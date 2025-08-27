import { Component, inject } from '@angular/core';
import { IStockItems } from '../../../Models/stockItems.model';
import { lastValueFrom, Observable } from 'rxjs';
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
  dataItemToFormat: any;
  dataItemObj: IStockItems = {
    id: '',
    name: '',
    description: '',
    code: '',
    quantity: '',
    price: '',
    createdAt: '',
    updatedAt: '',
  };
  fieldsItemPost: IAddStockItemDTO = {
  name: '',
  description: '',
  quantity: 0,
  price: 0
};
 fieldsPost: any[] = [];
 actualOperation: string = '';
 title: string = '';
 currentItem: IStockItems = {
    id: '',
    name: '',
    description: '',
    code: '',
    quantity: '',
    price: '',
    createdAt: '',
    updatedAt: '',
 };
 dataViewForPost: IAddStockItemDTO[] = []

  getItemCell(id: string, item: IStockItems[]): void {
    this.selectedItemId = id;
    this.itemArrayOfObject = item;
    this.currentItem = this.itemArrayOfObject.find((items: IStockItems) => items.id == id);

    console.log('getItemCell', this.currentItem);
  };

  closeEditModal():void {
    this.isModalOpen = false;
    this.dataItemObj = {
    id: '',
    name: '',
    description: '',
    code: '',
    quantity: '',
    price: '',
    createdAt: '',
    updatedAt: '',
    };
  };

  viewModal(operation: string, itemId: string | null):void {
    this.isModalOpen = true;
    if(operation == '1') {
      this.fieldsPost = Object.keys(this.fieldsItemPost);
      this.actualOperation = operation;
      this.title = 'Create new Item'
      console.log('fields', this.fieldsPost);
    }
    if(operation == '2') {
      this.formatData(itemId);
      this.actualOperation = operation;
      this.title = 'View item'
      console.log('actual operation 2', this.actualOperation);
    }
    if(operation == '3') {
      this.formatData(itemId);
      this.fieldsPost = Object.keys(this.fieldsItemPost);
      this.actualOperation = operation;
      this.title = 'Update item'
      console.log('actual operation 3', this.actualOperation);
    }
  }

  formatData(itemId: string | null):void {
    
    for(let item of this.itemArrayOfObject) {
      if(item.id == itemId) {
        this.dataItem = item;
        this.dataItemToFormat = [];
        this.dataItemToFormat = Object.entries(this.dataItem).forEach(([key, value]) => {
          if(key.includes('At') && value) {
            this.dataItemObj[key as keyof IStockItems] = new Date(value as string)
            .toLocaleString('pt-BR')
            .replace(',','');
          }else if(value == '') {
            this.dataItemObj[key as keyof IStockItems] = ''; 
          }else {
            this.dataItemObj[key as keyof IStockItems] = value as string;
          }
      });
      
      };
    };
    console.log('array of obj: ', this.itemArrayOfObject);
  };

  getDataFromView(data: IAddStockItemDTO):void {
    this.dataViewForPost = [];
    this.dataViewForPost.push(data);
    console.log('getDataFormView', this.dataViewForPost);
    this.addStockItem(this.dataViewForPost);
  }

  async addStockItem(data: any): Promise<void> {
    this.isModalOpen = true;
    const dataObj = Object.assign({}, ...data);
    const dataFlatObj = Object.assign({}, ...Object.values(dataObj))
    const addStockItemRequest: IAddStockItemDTO = {
      name: dataFlatObj.name ?? '',
      description: dataFlatObj.description ?? '',
      quantity: dataFlatObj.quantity ?? 0,
      price: dataFlatObj.price ?? 0,
    };
    try {
      const response = await lastValueFrom(this.stockService.postStockItem(addStockItemRequest));
      console.log('Item created', response);
    } catch(error) {
      console.log(error);
    }
  }
  
}
