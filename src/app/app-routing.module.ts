import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';

import { HomeComponent } from './core/home/home.component';
import { AuthGuard } from './auth/auth-guard.service';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },

  // Lazy loading
  // { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule', canLoad:[AuthGuard]},
  // { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' },

  { path: 'recipes', loadChildren: './recipes/recipe.module#RecipesModule'},
  { path: 'shopping-list', component: ShoppingListComponent},

  //{ path: '', component: ShoppingListComponent }
];


@NgModule({
  imports:[
    // Preloading lazy loading
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule{}
