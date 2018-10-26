import { CurrentUserService } from './my-nav/service/currentuser.service';
import { VideoService } from './view-video/services/video.service';
import { CategoryService } from './categorys/services/category.service';
import { RegisterUserService } from './register/services/registeruser.service';
import { LocationService } from './register/services/location.service';
import { HttpClientModule, HttpClientXsrfModule } from '@angular/common/http';
import { SessionService } from './_services/SessionService';
import { HttpSettingsService } from './_services/HttpSettingsService';
import { AuthService } from './login/services/auth.service';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyNavComponent } from './my-nav/my-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatCardModule } from '@angular/material';
import { CategorysComponent } from './categorys/categorys.component';
import { ListVideosComponent } from './list-videos/list-videos.component';
import { ViewVideoComponent } from './view-video/view-video.component';
import { PlayVideoComponent } from './play-video/play-video.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { MyMaterialModule } from './material.module';
import { MatFormFieldModule, MatSelectModule } from '@angular/material';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AuthToken } from './_services/AuthToken';
import { SettingsService } from './_services/SettingsService';
import { LocalStorageService } from './_services/localstorage.service';
import { HttpModule } from '@angular/http';
import { MatVideoModule } from 'mat-video';
import { ToastrModule } from 'ngx-toastr';

const appRoutes: Routes = [
  {path : '', component : LoginComponent},
  {
    component: MyNavComponent,
    path: 'head',
    children: [
      { path: 'categorys', component: CategorysComponent},
      { path: 'list-videos', component: ListVideosComponent},
      { path: 'view-video', component: ViewVideoComponent},
      { path: 'play-video', component: PlayVideoComponent},
    ]
},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    MyNavComponent,
    CategorysComponent,
    ListVideosComponent,
    ViewVideoComponent,
    PlayVideoComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MyMaterialModule,
    MatSelectModule,
    MatFormFieldModule,
    NgxMatSelectSearchModule,
    RouterModule.forRoot(appRoutes),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    HttpModule,
    HttpClientModule,
    MatVideoModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    ToastrModule.forRoot(
      {
        timeOut: 1000,
        positionClass: 'toast-top-right',
        preventDuplicates: true,
      }
    )
  ],
  providers: [
    AuthService,
    AuthToken,
    HttpSettingsService,
    SettingsService,
    LocalStorageService,
    SessionService,
    LocationService,
    RegisterUserService,
    CategoryService,
    VideoService,
    CurrentUserService


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
