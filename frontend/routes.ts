import { StocksComponent } from '../frontend/src/app/pages/stocks/stocks-component/stocks-component';
import { Routes } from '@angular/router';

const routeConfig: Routes = [
    {
        path: '',
        component: StocksComponent,
        title: 'Home page',
    },
]