import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';
import { AppComponent } from './app.component';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { provideAuth, AuthHttp, AuthConfig } from 'angular2-jwt';
import { RouterModule } from '@angular/router';
import { DndModule } from 'ng2-dnd';
import { routes } from './app.routes';
import { HomeComponent } from './home/home.component';

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp( new AuthConfig({}), http, options);
}

@NgModule({
  declarations: [
    AppComponent, HomeComponent
  ],
  imports: [
    HttpModule, BrowserModule, FormsModule,
    RouterModule.forRoot(routes),
    DndModule.forRoot()
  ],
  providers: [
    AuthGuard, AuthService, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [ Http, RequestOptions ]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
