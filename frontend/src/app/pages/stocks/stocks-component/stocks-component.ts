import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, inject, Input, output, Output } from '@angular/core';
import { IStockItems } from '../../../Models/stockItems.model';
import { Actions } from '../../../components/shared/actions/actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stocks-component',
  standalone: false,
  templateUrl: './stocks-component.html',
  styleUrl: './stocks-component.css'
})
export class StocksComponent {
  headerTitles:string[] = [
    'Name',
    'Description',
    'Code',
    'Quantity',
    'price',
    'Created At',
    'Updated At'
  ]
  http = inject(HttpClient);
  stocksItems$ = this.getStockItems();
  selectedItem: string | null = null;
  isModalOpen = false;
  
  private getStockItems(): Observable<IStockItems[]> {
    return this.http.get<IStockItems[]>('https://localhost:7037/api/StockItems')
  };

  getItemCell(id: string): void {
    console.log(id);
    this.selectedItem = id;
  }

  openEditModal():void {
    this.isModalOpen = true;
    console.log('open')
  }

  closeEditModal():void {
    console.log('Close')
    this.isModalOpen = false;
  }

  
}
