import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  @Output() menuChanged = new EventEmitter<'recipes' | 'shopping-list'>();
  collapsed = true;

  constructor() { }

  ngOnInit(): void {
  }

  onRecipiesClicked() {
    console.log('recipies clicked');
    this.menuChanged.emit('recipes');
  }

  onShoppingListClicked() {
    console.log('shopping list clicked');
    this.menuChanged.emit('shopping-list');
  }

}
