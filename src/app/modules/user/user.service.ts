import { IUser } from "./user.interface";
import { User } from "./user.model";

export const getUsersFromDB = async () => {
  const users = await User.find();
  return users;
};

export const saveUser = async (u: IUser): Promise<IUser> => {
  const user = new User(u);
  user.fullName(); // custom interface methods
  await user.save();
  return user;
};

export const getUserByIDFromDB = async (id: string): Promise<IUser | null> => {
  const user = await User.findOne({ id }, { name: 1 }); // to get only name use second parameter
  return user;
};

export const getAdminUserFromDB = async () => {
  const admins = await User.getAdminUsers();
  return admins;
};
