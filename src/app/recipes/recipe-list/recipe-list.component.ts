import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../recipes.service';
import * as fromApp from '../../store/app.reducers';
import * as fromRecipe from '../store/recipe.reducers';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  recipesState: Observable<fromRecipe.State>;

  constructor(private recipesService: RecipesService,
              private router: Router,
              private route: ActivatedRoute,
              private store: Store<fromRecipe.FeatureState>
            ) { }

  ngOnInit() {
    
    

    this.recipesState = this.store.select('recipes');

    // this.recipes = this.recipesService.getRecipes();

    // this.subscription = this.recipesService.recipesChanged
    //   .subscribe( (recipes: Recipe[])=>{
    //     // this.recipes = recipes;
    //   })
  }

  toNewRecipe(){
    this.router.navigate(['new'], {relativeTo: this.route} )
  }

  ngOnDestroy(){
    // this.subscription.unsubscribe();
  }

}
