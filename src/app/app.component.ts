import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedMenu: 'recipes' | 'shopping-list' = 'shopping-list';

  onMenuChange(menu: 'recipes' | 'shopping-list') {
    this.selectedMenu = menu;
  }
}
