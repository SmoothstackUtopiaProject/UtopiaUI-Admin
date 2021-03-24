import BaseReducer from "./BaseReducer";

class AuthenticationReducer extends BaseReducer {

  static getDefaultReducerState() {
    return defaultAuthenticationState;
  }

  static reduce(action, state) {
    switch (action.type) {

      case this.constantsParent.cancel:
        return { isActive_LoginUI: false };

      case this.constantsParent.error:
        return {
          error: action.payload || "[ERROR]: 404 - Not Found!",
          status: "ERROR",
          userId: "UNKNOWN",
        };

      case this.constantsParent.errorCreateAccount:
        return {
          error: action.payload || "Invalid User Account",
          status: "ERROR",
        };

      case this.constantsParent.errorLogin:
        return {
          error: "Invalid email or password.",
          status: "ERROR",
          userId: "UNKNOWN",
        };

      case this.constantsParent.errorForgotPassword:
        return {
          forgotPasswordStatus: "ERROR",
          error: action.payload,
        };

      // Prompts
      // =====================================
      case this.constantsParent.promptLogin:
        return {
          error: "",
          isActive_LoginUI: true,
        };

      // Requests
      // =====================================
      case this.constantsParent.requestCreateAccount:
        return { status: "PENDING" };

      case this.constantsParent.requestForgotPassword:
        return { forgotPasswordStatus: "PENDING" };

      case this.constantsParent.requestLogin:
        return {
          status: "PENDING",
          userLogin: action.payload,
        };


      // Responses
      // =====================================
      case this.constantsParent.responseCreateAccount:
        return {
          status: "SUCCESS",
          userId: action.payload.userId,
        };

      case this.constantsParent.responseLogin:
        return {
          isActive_LoginUI: false,
          status: "SUCCESS",
          userId: action.payload.userId,
          userRole: action.payload.userRole,
          userToken: action.payload.userToken,
        };

      case this.constantsParent.responseForgotPassword:
        return {
          forgotPasswordStatus: "SUCCESS",
        };

      // Reset
      // =====================================
      case this.constantsParent.reset:
        return defaultAuthenticationState;

      default:
        console.error("Invalid action.type!", action);
    }
  }
}
export default AuthenticationReducer;

export const defaultAuthenticationState = {
  error: "",
  isActive_LoginUI: false,
  status: "INACTIVE",
  userId: "",
  userRole: "",
  userToken: "",
  forgotPasswordStatus: "INACTIVE",
};
