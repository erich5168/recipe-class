import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';

import { RecipesService } from '..//recipes/recipes.service';
// import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { DataStorageService } from '../services/data-storage.service';
// Authentication
 //import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '../auth/auth-guard.service';
import { AuthInterceptor } from '../shared/auth.interceptor';
import { LoggingInterceptor } from '../shared/logging.interceptor';



@NgModule({
  declarations:[
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  exports:[
    AppRoutingModule,
    HeaderComponent
  ],
  providers: [
    RecipesService,
    DataStorageService,
    // AuthService,
    AuthGuard,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
    // AuthGuard -->  AuthGuard is only in used in the header...
    // So technically this can be moved to Recipe Module
  ]
})
export class CoreModule{}
