import { IUser } from "../models/interfaces/IUser";

type UserResourceType = {
  user: {
    firstName: string;
    lastName: string;
    email: string;
    role: string;
  };
};

class UserResource {
  public data: UserResourceType;

  constructor(user: IUser) {
    this.data = {
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    };
  }
}

export default UserResource;
