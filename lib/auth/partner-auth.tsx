"use client";

import { createAuthContext } from "./createAuthContext";

export const { AuthProvider: PartnerAuthProvider, useAuth: usePartnerAuth } =
  createAuthContext("crafty_session_partner");
