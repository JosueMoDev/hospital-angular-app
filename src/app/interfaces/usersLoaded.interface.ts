import { User } from "../models/user.model";

export interface UserResponse {
  users: User[],
  total: number
}
