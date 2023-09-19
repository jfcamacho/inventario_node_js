import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsuariosComponent } from './administracion/usuarios/usuarios.component';
import { CRUDusuariosComponent } from './administracion/crudusuarios/crudusuarios.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Application Components
import {AppCodeModule} from './layout/blocks/app-code/app.code.component';
// import {AppComponent} from './app.component';
import {AppMainComponent} from './layout/app.main.component';
import {AppConfigComponent} from './layout/app.config.component';
import {AppMenuComponent} from './layout/app.menu.component';
import {AppMenuitemComponent} from './layout/app.menuitem.component';
import {AppBreadcrumbComponent} from './layout/app.breadcrumb.component';
import {AppMegamenuComponent} from './layout/app.megamenu.component';
import {AppProfileComponent} from './layout/app.profile.component';
import {AppRightPanelComponent} from './layout/app.rightpanel.component';
import {AppTopBarComponent} from './layout/app.topbar.component';
import {AppFooterComponent} from './layout/app.footer.component';
import {BlockViewer} from './layout/blocks/blockviewer/blockviewer.component';

import {AccordionModule} from 'primeng/accordion';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import {BadgeModule} from 'primeng/badge';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {ButtonModule} from 'primeng/button';
import {CalendarModule} from 'primeng/calendar';
import {CardModule} from 'primeng/card';
import {CarouselModule} from 'primeng/carousel';
import {CascadeSelectModule} from 'primeng/cascadeselect';
import {ChartModule} from 'primeng/chart';
import {CheckboxModule} from 'primeng/checkbox';
import {ChipModule} from 'primeng/chip';
import {ChipsModule} from 'primeng/chips';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {ColorPickerModule} from 'primeng/colorpicker';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DataViewModule} from 'primeng/dataview';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {DropdownModule} from 'primeng/dropdown';
import {FieldsetModule} from 'primeng/fieldset';
import {FileUploadModule} from 'primeng/fileupload';
// import {FullCalendarModule} from '@fullcalendar/angular';
import {GalleriaModule} from 'primeng/galleria';
import {ImageModule} from 'primeng/image';
import {InplaceModule} from 'primeng/inplace';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputMaskModule} from 'primeng/inputmask';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {KnobModule} from 'primeng/knob';
import {ListboxModule} from 'primeng/listbox';
import {MegaMenuModule} from 'primeng/megamenu';
import {MenuModule} from 'primeng/menu';
import {MenubarModule} from 'primeng/menubar';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {MultiSelectModule} from 'primeng/multiselect';
import {OrderListModule} from 'primeng/orderlist';
import {OrganizationChartModule} from 'primeng/organizationchart';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {PaginatorModule} from 'primeng/paginator';
import {PanelModule} from 'primeng/panel';
import {PanelMenuModule} from 'primeng/panelmenu';
import {PasswordModule} from 'primeng/password';
import {PickListModule} from 'primeng/picklist';
import {ProgressBarModule} from 'primeng/progressbar';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import {ScrollTopModule} from 'primeng/scrolltop';
import {SelectButtonModule} from 'primeng/selectbutton';
import {SidebarModule} from 'primeng/sidebar';
import {SkeletonModule} from 'primeng/skeleton';
import {SlideMenuModule} from 'primeng/slidemenu';
import {SliderModule} from 'primeng/slider';
import {SplitButtonModule} from 'primeng/splitbutton';
import {SplitterModule} from 'primeng/splitter';
import {StepsModule} from 'primeng/steps';
import {TabMenuModule} from 'primeng/tabmenu';
import {TableModule} from 'primeng/table';
import {TabViewModule} from 'primeng/tabview';
import {TagModule} from 'primeng/tag';
import {TerminalModule} from 'primeng/terminal';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {TimelineModule} from 'primeng/timeline';
import {ToastModule} from 'primeng/toast';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {ToolbarModule} from 'primeng/toolbar';
import {TooltipModule} from 'primeng/tooltip';
import {TreeModule} from 'primeng/tree';
import {TreeTableModule} from 'primeng/treetable';
import {VirtualScrollerModule} from 'primeng/virtualscroller';

//Almacenamiento del token de forma Segura
import { CookieService } from 'ngx-cookie-service';

// Application services
import {BreadcrumbService} from './layout/app.breadcrumb.service';
import {MenuService} from './layout/app.menu.service';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';

//Iconos fontawensome

import { fas } from '@fortawesome/free-solid-svg-icons';
import { LoginComponent } from './login/login.component';
import { CategoriaComponent } from './configuracion/categoria/categoria.component';
import { EstadoComponent } from './configuracion/estado/estado.component';
import { UnidadComponent } from './configuracion/unidad/unidad.component';
import { CompraComponent } from './inventario/compra/compra.component';
import { FacturaComponent } from './inventario/factura/factura.component';
import { InventarioComponent } from './inventario/inventario/inventario.component';
import { PagoComponent } from './configuracion/pago/pago.component';
import { ProveedorComponent } from './inventario/proveedor/proveedor.component';
import { VentaComponent } from './inventario/venta/venta.component';
import { ProveedoresComponent } from './inventario/proveedor/proveedores.component';
import { ProductoComponent } from './inventario/inventario/producto.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    CRUDusuariosComponent,
    DashboardComponent,
    AppMainComponent,
    AppMenuComponent,
    AppMenuitemComponent,
    AppConfigComponent,
    AppTopBarComponent,
    AppFooterComponent,
    AppRightPanelComponent,
    AppMegamenuComponent,
    AppProfileComponent,
    AppBreadcrumbComponent,
    BlockViewer,
    LoginComponent,
    CategoriaComponent,
    EstadoComponent,
    UnidadComponent,
    CompraComponent,
    FacturaComponent,
    InventarioComponent,
    PagoComponent,
    ProveedorComponent,
    VentaComponent,
    ProveedoresComponent,
    ProductoComponent
    // DashboardDemoComponent,
  ],
  imports: [
    AppCodeModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AccordionModule,
    AutoCompleteModule,
    AvatarGroupModule,
    AvatarModule,
    BadgeModule,
    BreadcrumbModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    CarouselModule,
    CascadeSelectModule,
    ChartModule,
    CheckboxModule,
    ChipModule,
    ChipsModule,
    ConfirmDialogModule,
    ConfirmPopupModule,
    ColorPickerModule,
    ContextMenuModule,
    DataViewModule,
    DialogModule,
    DividerModule,
    DropdownModule,
    FieldsetModule,
    FileUploadModule,
    // FullCalendarModule,
    GalleriaModule,
    ImageModule,
    InplaceModule,
    InputNumberModule,
    InputMaskModule,
    InputSwitchModule,
    InputTextModule,
    InputTextareaModule,
    KnobModule,
    ListboxModule,
    MegaMenuModule,
    MenuModule,
    MenubarModule,
    MessageModule,
    MessagesModule,
    MultiSelectModule,
    OrderListModule,
    OrganizationChartModule,
    OverlayPanelModule,
    PaginatorModule,
    PanelModule,
    PanelMenuModule,
    PasswordModule,
    PickListModule,
    ProgressBarModule,
    RadioButtonModule,
    RatingModule,
    RippleModule,
    ScrollPanelModule,
    ScrollTopModule,
    SelectButtonModule,
    SidebarModule,
    SkeletonModule,
    SlideMenuModule,
    SliderModule,
    SplitButtonModule,
    SplitterModule,
    StepsModule,
    TableModule,
    TabMenuModule,
    TabViewModule,
    TagModule,
    TerminalModule,
    TieredMenuModule,
    TimelineModule,
    ToastModule,
    ToggleButtonModule,
    ToolbarModule,
    TooltipModule,
    TreeModule,
    TreeTableModule,
    VirtualScrollerModule,
    FontAwesomeModule,
  ],
  providers: [
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    MenuService,BreadcrumbService, CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    }
}
