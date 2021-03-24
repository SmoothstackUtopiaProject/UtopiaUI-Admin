import BaseDispatcher from "./BaseDispatcher";
import constants from "../resources/constants.json";

class BookingsDispatcher extends BaseDispatcher {
  static apiPath = constants.bookings.apiPath;
  static constantsParent = constants.bookings;
}
export default BookingsDispatcher;
