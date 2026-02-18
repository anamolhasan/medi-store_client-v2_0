import { Role, UserStatus } from "./user.type";

declare module "better-auth/types" {
  interface User {
    role: Role;
    status: UserStatus;
    phone: string | null;
  }

  interface Session {
    user: User;
  }
}
