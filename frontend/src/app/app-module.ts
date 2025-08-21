import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ComponentHeader } from './components/stocks/component-header/component-header';
import { StocksComponent } from './pages/stocks/stocks-component/stocks-component';
import { provideHttpClient } from '@angular/common/http';
import { Actions } from './components/shared/actions/actions';
import { View } from './components/shared/view/view';

@NgModule({
  declarations: [
    App,
    ComponentHeader,
    StocksComponent,
    Actions,
    View
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
