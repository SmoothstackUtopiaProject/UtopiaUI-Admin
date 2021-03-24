import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json";

class PassengersDispatcher extends BaseDispatcher {
  static apiPath = constants.passengers.apiPath;
  static constantsParent = constants.passengers;
}
export default PassengersDispatcher;
