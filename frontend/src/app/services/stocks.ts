import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStockItems } from '../Models/stockItems.model';

@Injectable({
  providedIn: 'root'
})
export class Stocks {
  private readonly apiUrl:string = 'https://localhost:7037/api/StockItems'
  http = inject(HttpClient);
  stocksItems$ = this.getStockItem()


  getStockItem(): Observable<IStockItems[]> {
    console.log('get method called',this.stocksItems$,'teste');
    return this.http.get<IStockItems[]>(this.apiUrl);
  }
}
