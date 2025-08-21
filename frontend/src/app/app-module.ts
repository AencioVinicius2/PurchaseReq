import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { ComponentHeader } from './components/component-header/component-header';
import { StocksComponent } from './pages/stocks/stocks-component/stocks-component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    ComponentHeader,
    StocksComponent,
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
