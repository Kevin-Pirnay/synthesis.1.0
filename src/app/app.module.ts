import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './adapters/driver/base/app.component';
import { SvgComponent } from './adapters/driver/components/svg/svg.component';
import { MenuComponent } from './adapters/driver/components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
