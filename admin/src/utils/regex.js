const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const PHONE_NUMBER_REGEX = /^[0-9]{10}$/;
const CONFIRM_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

const NAME_REGEX = /^[a-zA-Z']+([a-zA-Z' ]*[a-zA-Z]+)*$/;
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/;
const USERNAME_REGEX = /^[a-zA-Z']+([a-zA-Z' ]*[a-zA-Z]+)*$/;
const DOB_REGEX = /^\d{4}-(0[1-9]|1[0-2])-([0-2]\d|3[01])$/;

export {
  EMAIL_REGEX,
  PHONE_NUMBER_REGEX,
  NAME_REGEX,
  PASSWORD_REGEX,
  USERNAME_REGEX,
  DOB_REGEX,
  CONFIRM_REGEX,
};
