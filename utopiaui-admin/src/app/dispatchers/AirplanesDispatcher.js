import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json";

class AirplanesDispatcher extends BaseDispatcher {
  static apiPath = constants.airplanes.apiPath;
  static constantsParent = constants.airplanes;
}
export default AirplanesDispatcher;
