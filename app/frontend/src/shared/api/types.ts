import {User} from "@/entities/user/types";

export interface AuthResponse {
  accessToken: string;
  user: User;
}
