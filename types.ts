export type UserModel = {
  id: number;
  name: string;
  birthYear: number;
};

export type UserViewModel = UserModel & {
  age: number;
};

export function toUserViewModel(user: UserModel): UserViewModel {
  const currentYear = new Date().getFullYear();
  return {
    ...user,
    age: currentYear - user.birthYear
  };
}