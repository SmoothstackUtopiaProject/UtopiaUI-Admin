import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json";

class PaymentsDispatcher extends BaseDispatcher {
  static apiPath = constants.payments.apiPath;
  static constantsParent = constants.payments;
}
export default PaymentsDispatcher;
