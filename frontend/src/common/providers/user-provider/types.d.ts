type UserContext = [
  IUser | undefined | null,
  React.Dispatch<React.SetStateAction<UserContext['0']>>,
];

interface IUser {
  username: string;
  public_key: string;
}
