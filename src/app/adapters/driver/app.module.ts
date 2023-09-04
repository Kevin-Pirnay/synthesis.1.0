import { LinkRootsComponent } from './components/aside/link-roots/link-roots.component';
import { PaginateComponent } from './components/aside/paginate/paginate.component';
import { ChooseRootComponent } from './components/aside/choose-root/choose-root.component';
import { BackViewComponent } from './components/aside/back-view/back-view.component';
import { AsideComponent } from './components/aside/base/aside.component';
import { MenuComponent } from './components/aside/menu/menu.component';
import { SvgComponent } from './components/svg/svg.component';
import { AppComponent } from './base/app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { NavigatorComponent } from './components/navigation/navigator/navigator.component';
import { InfosComponent } from './components/infos/infos.component';


@NgModule({
  declarations: [
    AppComponent,
    SvgComponent,
    MenuComponent,
    AsideComponent,
    BackViewComponent,
    ChooseRootComponent,
    PaginateComponent,
    LinkRootsComponent,
    NavigatorComponent,
    InfosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
