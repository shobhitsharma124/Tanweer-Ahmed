
import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation:ViewEncapsulation.None
})
export class AppComponent {
  title = 'fitness-tracker';

  public tabIndex:number = 0;
  public demo1BtnClick(tap:number) {
    this.tabIndex = tap;
  }



}
