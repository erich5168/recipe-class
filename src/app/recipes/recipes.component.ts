import { Component, OnInit} from '@angular/core';

import { Recipe } from '../models/recipe.model';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe;

  //constructor(private recipesService: RecipesService) { }

  constructor() { }

  ngOnInit() {
    // EventEmitter from service
    // this.recipesService.recipeSelected
    //   .subscribe( (recipe:Recipe) => {
    //     //console.log(recipe);
    //     this.selectedRecipe = recipe
    //     console.log(this.selectedRecipe);
    //   });


  }


}
