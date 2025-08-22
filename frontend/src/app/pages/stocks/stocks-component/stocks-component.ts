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
  itemArray: IStockItems[] | null = null;
  isModalOpen = false;

  
  getItemCell(id: string, item: IStockItems[] ): void {
    console.log(id);
    this.selectedItem = id;
    this.itemArray = item;
  }

  openEditModal():void {
    this.isModalOpen = true;
    console.log('open')
  }

  openViewModal():void {
    this.isModalOpen = true;
    console.log('open, view')
  }

  closeEditModal():void {
    console.log('Close')
    this.isModalOpen = false;
  }

  
}
