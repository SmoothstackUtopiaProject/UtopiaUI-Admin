import { Component } from '@angular/core';
import Store from './reducers/Store.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Utopia-Admin';
  state = Store.getCombinedDefaultReducerStates();
  setState(partialState) {
    this.state = {
      ...this.state,
      ...partialState(this.state),
    };
    console.log(this.state);
  }

  ngOnInit(): void {
    Store.getState = () => this.state;
    Store.setState = this.setState;
  }
}
