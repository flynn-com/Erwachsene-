"use client";

import { createAuthContext } from "./createAuthContext";

export const { AuthProvider: CustomerAuthProvider, useAuth: useCustomerAuth } =
  createAuthContext("crafty_session_kunde");
