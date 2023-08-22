import { AppRoutingModule } from './app-routing.module';
import { SvgComponent } from './adapters/driver/components/svg/svg.component';
import { AsideComponent } from './adapters/driver/components/aside/base/aside.component';
import { AppComponent } from './adapters/driver/base/app.component';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MenuComponent } from "./adapters/driver/components/aside/menu/menu.component";
import { BackViewComponent } from './adapters/driver/components/aside/back-view/back-view.component';
import { ChooseRootComponent } from './adapters/driver/components/aside/choose-root/choose-root.component';
import { PaginateComponent } from './adapters/driver/components/aside/paginate/paginate.component';
import { LinkRootsComponent } from './adapters/driver/components/aside/link-roots/link-roots.component';


@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    MenuComponent,
    AsideComponent,
    BackViewComponent,
    ChooseRootComponent,
    PaginateComponent,
    LinkRootsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
