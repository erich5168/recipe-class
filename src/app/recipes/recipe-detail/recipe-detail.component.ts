import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../../models/recipe.model';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from "../../store/app.reducers";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipeDetail: Recipe;
  id: number;

  constructor(private recipesService: RecipesService,
              private store: Store<fromApp.AppState>,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    //const id = this.route.snapshot.params['id'];
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeDetail = this.recipesService.getRecipe(this.id);
      }
    )
  }

  onAddToShoppingList(){
    //console.log(this.recipeDetail.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipeDetail.ingredients));
    
    this.router.navigate(['shopping-list']);
  }

  toEditRecipe(){
    //this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(){
    this.recipesService.deleteRecipe(this.id);
    // redirectTo
    this.router.navigate(['/recipes']);
  }

}
