import { AppRoutingModule } from './app-routing.module';
import { SvgComponent } from './adapters/driver/components/svg/svg.component';
import { AsideComponent } from './adapters/driver/components/aside/base/aside.component';
import { AppComponent } from './adapters/driver/base/app.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MenuComponent } from "./adapters/driver/components/aside/menu/menu.component";


@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    MenuComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
