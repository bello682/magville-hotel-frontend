// src/app/(admin)/admin/hooks/useAdminUser.ts
"use client";

import { useEffect, useState } from "react";
import { decodeAdminToken } from "../utils/decodeToken";

export function useAdminUser() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      setUser(decodeAdminToken(token));
    }
  }, []);

  return user;
}
