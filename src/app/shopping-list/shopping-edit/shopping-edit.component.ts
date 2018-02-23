import { Component, OnInit, OnDestroy, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';

import { Ingredient } from '../../models/ingredient.model';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromApp from "../../store/app.reducers";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  @ViewChild('f') slForm: NgForm;

  // @ViewChild('nameInput') nameInputRef: ElementRef;
  // @ViewChild('amountInput') amountInputRef: ElementRef;

  // @Output() ingredientAdded = new EventEmitter<{name:string, amount:number}>();

  // @Output() ingredientAdded = new EventEmitter<Ingredient>();

  constructor(
    //private store: Store<{shoppingList: {ingredients: Ingredient[]}}>
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit() {
    this.subscription = this.store.select('shoppingList')
      .subscribe(
        (data)=>{
          // console.log(data) --> [object Object]
          // console.log(Object.keys(data)); -->  all the keys
          console.log(JSON.stringify(data));
          if(data.editedIngredientIndex > -1){
            this.editMode = true;
            this.editedItemIndex = data.editedIngredientIndex;
            this.editedItem = data.editedIngredient;

            // Reactive Form if you don't want to reset state onNgDestroy()
            this.slForm.setValue({
              name: this.editedItem.name,
              amount: this.editedItem.amount
            })
          }else{
            this.editMode = false;
          }
        }
      );
    // this.subscription = this.slService.startEditing
    //   .subscribe(
    //     (index: number) => {
    //       //console.log(index);
    //       this.editMode = true;
    //       this.editedItemIndex = index;
    //       this.editedItem = this.slService.getIngredient(index);
    //       this.slForm.setValue({
    //         name: this.editedItem.name,
    //         amount: this.editedItem.amount
    //       })
    //     }
    //   );
  }

  onSubmit(form: NgForm){
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value;
    console.log(form);
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);
    console.log(newIngredient);

    if(this.editMode){
      // this.slService.updateIngredient(this.editedItemIndex, newIngredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(newIngredient));
    }else{
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      
    }
    this.editMode = false;
    this.slForm.reset();
  }

  onDelete(){
    console.log(this.editedItemIndex);
    // this.slService.deleteIngredient(this.editedItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  onClear(){
    this.slForm.reset();
    this.editMode = false;
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
    
    // reset state
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
