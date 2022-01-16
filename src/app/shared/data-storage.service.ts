import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";

import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  readonly url = 'https://ng-course-recipe-book-cff04-default-rtdb.firebaseio.com/';


  constructor(private httpClient: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.authService.user.pipe(take(1)).subscribe(user => {
      const token = user.token;

      return this.httpClient.put(
        this.url.concat('recipes.json'),
        recipes,
        {
          params: new HttpParams().set('auth', token)
        }
      ).subscribe();
    });
  }

  fetchRecipes() {
    return this.authService.user.pipe(take(1),
      exhaustMap(user => {
        return this.httpClient.get<Recipe[]>(
          this.url.concat('recipes.json'), {
          params: new HttpParams().set('auth', user.token)
        }
        );
      }),
      map(recipes => {
        return recipes.filter(r => r != null).map(recipe => {
          if (recipe != null) {
            return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] };
          }
        });
      }), tap(recipes => {
        this.recipeService.setRecipes(recipes);
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