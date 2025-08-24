import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { IStockItems } from '../../../Models/stockItems.model';
import { Actions } from '../../../components/shared/actions/actions';
import { Observable } from 'rxjs';
import { Stocks } from '../../../services/stocks';

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
  ]
  selectedItem: string | null = null;
  itemObjOfArray: any;
  isModalOpen = false;
  dataItem: any;
  dataItemFormated: any;
  dataitemObjOfArray: any[] = [];

  getItemCell(id: string, item: IStockItems[]): void {
    console.log('get Item cell')
    this.selectedItem = id;
    //console.log(this.selectedItem);
    this.itemObjOfArray = item;
  }

  openEditModal(itemId: string | null):void {
    this.isModalOpen = true;
    this.formatData(itemId);
  }

  closeEditModal(itemId: string | null):void {
    this.isModalOpen = false;
    this.dataitemObjOfArray = []
  }

  openViewModal(itemId: string | null):void {
    this.isModalOpen = true;
    this.formatData(itemId);
  }

  formatData(itemId: string | null) {
    for(let item of this.itemObjOfArray) {
      if(item.id == itemId) {
        this.dataItem = item;
        this.dataItemFormated = []
        this.dataItemFormated = Object.entries(this.dataItem).forEach(([key, value]) => {
            if(key.includes('At') && value) {
              this.dataitemObjOfArray.push(new Date(value as string).toLocaleString('pt-BR').replace(',','')
            );
            }else if(value == '') {
              this.dataitemObjOfArray.push('');
            }else {
              this.dataitemObjOfArray.push(value);
            }
        }) 
      }
    }
  }

  
}
