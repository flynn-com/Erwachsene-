export type AuthRole = "kunde" | "partner";

export interface MockUser {
  name: string;
  email: string;
  provider: "email" | "google";
}
