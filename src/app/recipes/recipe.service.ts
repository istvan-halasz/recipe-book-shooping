import { Recipe } from "./recipe.model";

export class RecipeService {
  private recipes: Recipe[] = [new Recipe('A Test Recipe', 'This is simply a test', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
  new Recipe('A Test Recipe 1', 'This is simply a test 1', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
  new Recipe('A Test Recipe 2', 'This is simply a test 2', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
  new Recipe('A Test Recipe 3', 'This is simply a test 3', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg'),
  new Recipe('A Test Recipe 4', 'This is simply a test 4', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg')];

  getRecipes() {
    return this.recipes.slice();
  }
}