import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { map, tap } from 'rxjs/operators';

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from '../recipes/store/recipe.actions';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly url = 'https://ng-course-recipe-book-cff04-default-rtdb.firebaseio.com/';


  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private store: Store<fromApp.AppState>) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpClient.put(this.url.concat('recipes.json'), recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {

    return this.httpClient
      .get<Recipe[]>(
        this.url.concat('recipes.json'),
      ).pipe(
        map(recipes => {
          return recipes.filter(r => r != null).map(recipe => {
            if (recipe != null) {
              return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
            }
          });
        }), tap(recipes => {
          //this.recipeService.setRecipes(recipes);
          this.store.dispatch(new RecipesActions.SetRecipes(recipes));
        })
      );
    /*return this.httpClient.get<Recipe[]>(this.url.concat('recipes.json'))
      .pipe(map(recipes => {
        return recipes.filter(r => r != null).map(recipe => {
          if (recipe != null) {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          }
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
      }));*/
  }

}