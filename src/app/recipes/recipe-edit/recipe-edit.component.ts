import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipesService } from '../recipes.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  editMode = false;

  recipeForm: FormGroup

  //editSelectedRecipe: Recipe;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private recipesService: RecipesService) { }

  ngOnInit() {
    // URL params to get
    this.route.params
      .subscribe((params: Params)=>{
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        console.log(this.editMode);

        this.initForm();
        // this.editForm.setValue({

        //})
      });

  }

  private initForm(){
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      const recipe = this.recipesService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for(let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[1-9]*$/)
              ])
            }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      // Set up FormControl
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),

      'ingredients': recipeIngredients

    });
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    );

    if(this.editMode){
      this.recipesService.updateRecipe(this.id, newRecipe);
      // this.recipesService.updateRecipe(this.id, this.recipeForm.value);
    }else{
      this.recipesService.addRecipe(newRecipe);
      // this.recipesService.addRecipe(this.recipeForm.value);
    }
    console.log(this.recipeForm);
    this.router.navigate(['/recipes']);
  }

  onCancel(){
    // Tell the router to go up one level... This will navigate back to the individule recipe page.
    this.router.navigate(['../'], {relativeTo: this.route});
    // This is absolute path which goes back to recipes page
    // this.router.navigate(['/recipes']);
  }

  onAddIngredients(){
    //const control = new FormControl(null);

    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[1-9]*$/)
        ])
      })
    );
  }

  getControls(){
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onDeleteIngredient(i: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(i);
  }

}
