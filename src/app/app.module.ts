import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';
import { UserService } from './user/user.service';
import { AutoDetail} from './auto/detail/auto.detail';
import { AutoList } from './auto/list/auto.list';
import { AutoSearch } from './auto/search/auto.search';
import { AutoPost } from './auto/post/auto.post';
import { AutoService } from './auto/auto.service';
import { LoginComponent } from './login/login.component';
import { LocationService } from './location/location.service';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent, HomeComponent, AutoDetail, AutoList, AutoSearch, AutoPost,
    LoginComponent
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes),
    DndModule.forRoot()
  ],
  providers: [
    AuthGuard, AuthService, UserService, AutoService, LocationService, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
