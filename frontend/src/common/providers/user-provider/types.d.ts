type UserContext = [
  IUser | undefined,
  React.Dispatch<React.SetStateAction<IUser | undefined>>,
  boolean,
];

interface IUser {
  username: string;
}
