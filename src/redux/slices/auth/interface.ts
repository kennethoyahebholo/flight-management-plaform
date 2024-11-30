export interface User {
  id?: string;
  token?: string;
  email?: string;
  name?: string;
}

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ChangeUserPassword {
  oldPassword: string;
  newPassword: string;
}
