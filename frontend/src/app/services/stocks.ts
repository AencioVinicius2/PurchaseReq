import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStockItems } from '../Models/stockItems.model';
import { RequiredValidator } from '@angular/forms';
import { IAddStockItemDTO } from '../Models/addStockDTO';

@Injectable({
  providedIn: 'root'
})
export class Stocks {
  private readonly apiUrl:string = 'https://localhost:7037/api/StockItems'
  http = inject(HttpClient);

  getStockItem(): Observable<IStockItems[]> {
    return this.http.get<IStockItems[]>(this.apiUrl);
  }
  postStockItem(request: IAddStockItemDTO): Observable<IAddStockItemDTO> {
    return this.http.post<IAddStockItemDTO>('https://localhost:7037/api/StockItems', request);
  }

  deleteStockItem(code: string): Observable<IStockItems[]> {
    return this.http.delete<IStockItems[]>(`${this.apiUrl}/${code}`);
  }

}
