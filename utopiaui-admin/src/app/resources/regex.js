export const REGEX_EMAIL = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,15}/g);
export const REGEX_PHONE = new RegExp("^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-s./0-9]*$");
export const REGEX_PASSWORD_STRONG = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
