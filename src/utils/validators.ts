import { compareSync } from 'bcryptjs';

const regexp: RegExp =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const isString = (value: any): boolean => {
  return typeof value === 'string' || value instanceof String;
};

export const isValidPassword = function (password: string): boolean {
  return regexp.test(password) ? true : false;
};

export const isPasswordCorrect = (
  passedPassword: string,
  hashedPassword: string
): boolean => {
  return compareSync(passedPassword, hashedPassword);
};
