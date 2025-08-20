import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { IStockItems } from '../../../Models/stockItems.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-stocks-component',
  standalone: false,
  templateUrl: './stocks-component.html',
  styleUrl: './stocks-component.css'
})
export class StocksComponent {
  http = inject(HttpClient);

  stocksItems$ = this.getStockItems();

  private getStockItems(): Observable<IStockItems[]> {
    return this.http.get<IStockItems[]>('https://localhost:7037/api/StockItems')
  }
}
