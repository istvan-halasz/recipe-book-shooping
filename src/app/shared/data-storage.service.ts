import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly url = 'https://ng-course-recipe-book-cff04-default-rtdb.firebaseio.com/';


  constructor(private httpClient: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.httpClient.put(this.url.concat('recipes.json'), recipes).subscribe(response => {
      console.log(response);
    });
  }

  fetchRecipes() {
    this.httpClient.get<Recipe[]>(this.url.concat('recipes.json'))
      .pipe(map(recipes => {
        return recipes.filter(r => r != null).map(recipe => {
          if (recipe != null) {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          }
        });
      }))
      .subscribe(
        recipes => {
          console.log(recipes);
          this.recipeService.setRecipes(recipes);
        }
      );
  }

}