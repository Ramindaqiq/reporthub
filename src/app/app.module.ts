import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, URLSearchParams, Headers, RequestOptions } from '@angular/http'
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {InlineEditorModule} from '@qontu/ngx-inline-editor';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FixedPluginModule } from './shared/fixedplugin/fixedplugin.module';
import { NguiMapModule } from '@ngui/map';

import { MainService } from './main.service';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth-guard.service';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { MainDashboardComponent } from './main/mainDashboard.component';
import { UserComponent } from './user/user.component';
import { TableComponent } from './table/table.component';
import { UsersComponent } from './users/users.component';
import { MapsComponent } from './maps/maps.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MainDashboardComponent,
    UserComponent,
    TableComponent,
    UsersComponent,
    MapsComponent,
    DashboardComponent,
    FormComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    InlineEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    NguiMapModule.forRoot({ apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyA93fK-ab87gA87rV5Dlj7cYI_VzrhymHY' }),
    NgbModule.forRoot()

  ],
  providers: [
    MainService,
    AuthService,
    NgbActiveModal,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
