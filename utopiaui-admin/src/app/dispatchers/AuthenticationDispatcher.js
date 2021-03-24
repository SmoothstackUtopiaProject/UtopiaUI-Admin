import BaseDispatcher from "./BaseDispatcher";
import Constants from "../resources/constants.json";
import Orchestration from "../Orchestration";
import Store from "../reducers/Store";

class AuthenticationDispatcher extends BaseDispatcher {
  static apiPath = Constants.authentication.apiPath;
  static constantsParent = Constants.authentication;

  static onCancel() {
    Store.reduce({ type: Constants.authentication.cancel });
  }

  static onForgotPassword(email) {
    Store.reduce({ type: Constants.authentication.requestForgotPassword });

    const httpRequestBody = { email };

    Orchestration.createRequestWithBody(
      Constants.httpRequest.post,
      this.apiPath + "/forgot-password",
      httpRequestBody,
      (httpError) => {
        Store.reduce({
          type: Constants.authentication.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: Constants.authentication.errorForgotPassword,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({
            type: Constants.authentication.responseForgotPassword,
            payload: httpResponseBody,
          });
        }
      }
    );
  }

  static onCreateAccount(firstName, lastName, email, phone, password) {
    Store.reduce({ type: Constants.authentication.createAccountRequest });

    const httpRequestBody = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPhone: phone,
      userPassword: password,
    };

    Orchestration.createRequestWithBody(
      Constants.httpRequest.post,
      this.apiPath,
      httpRequestBody,
      (httpError) => {
        Store.reduce({
          type: Constants.authentication.errorCreateAccount,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error) {
          Store.reduce({
            type: Constants.authentication.errorCreateAccount,
            payload: httpResponseBody.error,
          });
        } else {
          Store.reduce({ type: Constants.authentication.createAccountSuccess });
          AuthenticationDispatcher.onLogin(email, password);
        }
      }
    );
  }

  static onDeleteAccount(id) {
    Orchestration.createRequest(
      Constants.httpRequest.delete,
      this.apiPath + `/${id}`,
      (/*httpError*/) => {
        Store.reduce({ type: Constants.authentication.error });
      },
      (/*httpResponseBody*/) => {
        Store.reduce({ type: Constants.authentication.reset });
      }
    );
    this.onLogout();
  }

  static onLogin(email, password) {
    const encodedLogin = "Basic " + window.btoa(String(`${email}:${password}`));
    const authorization = { Authorization: encodedLogin };

    Store.reduce({
      type: Constants.authentication.requestLogin,
      payload: encodedLogin,
    });

    Orchestration.createRequestWithHeader(
      Constants.httpRequest.get,
      this.apiPath + "/login",
      authorization,
      (httpError) => {
        Store.reduce({
          type: Constants.authentication.error,
          payload: httpError,
        });
      },
      (httpResponseBody) => {
        if (httpResponseBody.error || !httpResponseBody.userId) {

          Store.reduce({
            type: Constants.authentication.errorLogin,
            payload: httpResponseBody.error || "Invalid username or password",
          });
        } else {
          Store.reduce({
            type: Constants.authentication.responseLogin,
            payload: {
              userId: httpResponseBody.userId,
              userRole: httpResponseBody.userRole,
              userToken: httpResponseBody.userToken,
            },
          });
          localStorage.setItem("JSON_WEB_TOKEN", httpResponseBody.userToken);
        }
      }
    );
  }

  static onLoginWithToken(overrideToken) {
    const webToken = overrideToken || localStorage.getItem("JSON_WEB_TOKEN");
    if (webToken) {
      const authorization = { Authorization: "Bearer " + webToken };
      Orchestration.createRequestWithHeader(
        Constants.httpRequest.get,
        this.apiPath + "/login",
        authorization,
        (httpError) => {
          Store.reduce({
            type: Constants.authentication.error,
            payload: httpError,
          });
        },
        (httpResponseBody) => {
          if (httpResponseBody.error) {
            Store.reduce({
              type: Constants.authentication.error,
              payload: httpResponseBody.error,
            });
          } else {
            Store.reduce({
              type: Constants.authentication.responseLogin,
              payload: {
                userId: httpResponseBody.userId,
                userRole: httpResponseBody.userRole,
                userToken: httpResponseBody.userToken,
              },
            });
            localStorage.setItem("JSON_WEB_TOKEN", httpResponseBody.userToken);
          }
        }
      );
    }
  }

  static onLogout() {
    localStorage.removeItem("JSON_WEB_TOKEN");
    Store.reduce({ type: Constants.authentication.reset });
    // TODO clear Auth
  }

  static onPromptLogin() {
    Store.reduce({ type: Constants.authentication.promptLogin });
  }
}
export default AuthenticationDispatcher;
