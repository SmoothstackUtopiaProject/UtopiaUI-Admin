// Libraries
import Constants from "../resources/constants.json";

// Reducers
import AirplanesReducer from "./AirplanesReducer";
import AirportsReducer from "./AirportsReducer";
import AuthenticationReducer from "./AuthenticationReducer";
import BookingsReducer from "./BookingsReducer";
import FlightsReducer from "./FlightsReducer";
import PassengersReducer from "./PassengersReducer";
import PaymentsReducer from "./PaymentsReducer";
import RoutesReducer from "./RoutesReducer";
import UsersReducer from "./UsersReducer";

class Store {
  static setState = null;
  static getState = null;
  static reducers = [];

  static initialize(getState, setState) {
    Store.getState = getState;
    Store.setState = setState;
    Store.reducers = [
      AirplanesReducer.initialize(Constants.airplanes),
      AirportsReducer.initialize(Constants.airports),
      AuthenticationReducer.initialize(Constants.authentication),
      BookingsReducer.initialize(Constants.bookings),
      FlightsReducer.initialize(Constants.flights),
      PassengersReducer.initialize(Constants.passengers),
      PaymentsReducer.initialize(Constants.payments),
      RoutesReducer.initialize(Constants.routes),
      UsersReducer.initialize(Constants.users),
    ];
  }

  static getCombinedDefaultReducerStates() {
    return {
      airplanes: AirplanesReducer.getDefaultReducerState(),
      airports: AirportsReducer.getDefaultReducerState(),
      authentication: AuthenticationReducer.getDefaultReducerState(),
      bookings: BookingsReducer.getDefaultReducerState(),
      flights: FlightsReducer.getDefaultReducerState(),
      passengers: PassengersReducer.getDefaultReducerState(),
      payments: PaymentsReducer.getDefaultReducerState(),
      routes: RoutesReducer.getDefaultReducerState(),
      users: UsersReducer.getDefaultReducerState(),
    };
  }

  static reduce(action) {

    // Check action is valid
    if(!action.type) {
      console.error("Cannot reduce action - invalid action.type", action);
      return;
    }

    // Check action.type root is valid
    const actionTypeRoot = action.type.split("_")[0];
    if(!actionTypeRoot) {
      console.error("Cannot reduce action - invalid action.type root", action);
      return;
    }

    // Check setState is valid
    if(!this.setState) {
      console.error("Cannot reduce action - invalid setState() method", action);
      return;
    }

    for(const i in this.reducers) {
      if(this.reducers[i].constantsParent.root === actionTypeRoot) {
        const reducer = this.reducers[i];
        const reducerName = reducer.constantsParent.name;
          this.setState((state) => ({
            [reducerName]: {
              ...state[reducerName],
              ...reducer.reduce(action, state[reducerName]),
            },
          }));
        break;
      }
    }
  }
}
export default Store;
