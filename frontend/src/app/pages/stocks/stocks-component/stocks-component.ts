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
  private defaultStockItem: IStockItems = {
    id: '',
    name: '',
    description: '',
    code: '',
    quantity: '0',
    price: '0',
    createdAt: '',
    updatedAt: ''
  };
  
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
  dataItemObj: IStockItems = {
    id: '',
    name: '',
    description: '',
    code: '',
    quantity: '0,',
    price: '0',
    createdAt: '',
    updatedAt: '',
  };
  fieldsItem: any[] = [];
  fieldsItemPost: IAddStockItemDTO = {
  name: '',
  description: '',
  quantity: 0,
  price: 0
};
 fieldsKeys: any[] = [];
 actualOperation: string = '';
 title: string = '';
 dataView: IAddStockItemDTO[] = []

  getItemCell(id: string, item: IStockItems[]): void {
    this.selectedItemId = id;
    this.itemArrayOfObject = item;
    console.log('getItemCell',this.itemArrayOfObject);
  };

  closeEditModal():void {
    this.isModalOpen = false;
    this.dataItemObj = {...this.defaultStockItem};
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
              this.dataItemObj[key as keyof IStockItems] = new Date(value as string)
              .toLocaleString('pt-BR')
              .replace(',','');
              this.fieldsItem.push(key);
            }else if(value == '') {
              this.dataItemObj[key as keyof IStockItems] = ''; 
              this.fieldsItem.push(key);
            }else {
              this.dataItemObj[key as keyof IStockItems] = value as string;
              this.fieldsItem.push(key);
            }
        });
      };
    };
    /*this.dataItem.forEach(obj => {
      console.log('obj', obj);
    })*/
    console.log('format dataItemObj: ', this.dataItemObj);
  };

  getDataFromView(data: IAddStockItemDTO):void {
    this.dataView = [];
    this.dataView.push(data);
    console.log('getDataFormView', this.dataView);
    this.addStockItem(this.dataView);
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
      //createdAt:  new Date().toLocaleString('pt-BR'),
      //updatedAt: new Date().toLocaleString('pt-BR'),
    };
    try {
      const response = await lastValueFrom(this.stockService.postStockItem(addStockItemRequest));
      console.log('Item criado:', response);
    } catch(error) {
      console.log(error);
    }
  }
  
}
