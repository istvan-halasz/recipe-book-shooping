import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Effect, Actions, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { map, switchMap, withLatestFrom } from "rxjs/operators";
import { Recipe } from "../recipe.model";

import * as RecipesActions from './recipe.actions';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  readonly url = 'https://ng-course-recipe-book-cff04-default-rtdb.firebaseio.com/';

  @Effect()
  fetchRecipes = this.actions$.pipe(ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => {
      return this.httpClient
        .get<Recipe[]>(
          this.url.concat('recipes.json'),
        );
    }),
    map(recipes => {
      return recipes.filter(r => r != null).map(recipe => {
        if (recipe != null) {
          return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
        }
      });
    }),
    map(recipes => {
      return new RecipesActions.SetRecipes(recipes);
    })
  );

  @Effect({ dispatch: false })
  storeRecipes = this.actions$.pipe(ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.httpClient.put(this.url.concat('recipes.json'), recipesState.recipes);
    }));

  constructor(private actions$: Actions, private httpClient: HttpClient, private store: Store<fromApp.AppState>) { }
}