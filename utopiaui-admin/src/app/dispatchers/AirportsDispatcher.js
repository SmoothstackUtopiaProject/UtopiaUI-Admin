import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json";

class AirportsDispatcher extends BaseDispatcher {
  static apiPath = constants.airports.apiPath;
  static constantsParent = constants.airports;
}
export default AirportsDispatcher;
