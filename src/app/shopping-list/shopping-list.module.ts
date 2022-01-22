import { NgModule } from '@angular/core';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  exports: [
    ShoppingListComponent,
    ShoppingEditComponent
  ],
  imports: [
    FormsModule,
    RouterModule.forChild([
      { path: 'shopping-list', component: ShoppingListComponent }
    ]),
    SharedModule
  ]
})
export class ShoppingListModule { }
