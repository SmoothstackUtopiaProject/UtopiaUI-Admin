import BaseDispatcher from "./BaseDispatcher";
import Constants from "../resources/constants.json";
import Store from "../reducers/Store";
import Orchestration from "../Orchestration";
import AuthenticationDispatcher from "./AuthenticationDispatcher";

class UsersDispatcher extends BaseDispatcher {
  static apiPath = Constants.users.apiPath;
  static constantsParent = Constants.users;

  static onEdit(httpPath, httpBody) {
    Store.reduce({ type: this.getConstantsParent().requestEdit });
    Orchestration.createRequestWithBody(
      Constants.httpRequest.put,
      this.getApiPath() + (httpPath || ""),
      httpBody,
      (httpError) => this.onError(httpError),
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: this.getConstantsParent().responseEdit,
            payload: {
              results: httpResponseBody.error,
              resultsStatus: "ERROR",
            },
          });
        } else {
          Store.reduce({
            type: this.getConstantsParent().responseEdit,
            payload: {
              results: httpResponseBody,
              resultsStatus: "SUCCESS",
            },
          });
          AuthenticationDispatcher.onLoginWithToken(httpResponseBody.userToken);
        }
      }
    );
  }
}
export default UsersDispatcher;
