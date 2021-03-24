import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json";

class RoutesDispatcher extends BaseDispatcher {
  static apiPath = constants.routes.apiPath;
  static constantsParent = constants.routes;
}
export default RoutesDispatcher;
