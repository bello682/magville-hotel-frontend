// // src/app/(admin)/admin/utils/decodeToken.ts

// interface DecodedAdminToken {
//   id: string;
//   email: string;
//   role: "GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST";
// }

// export function decodeAdminToken(token: string): DecodedAdminToken | null {
//   try {
//     const payload = token.split(".")[1];
//     const decoded = JSON.parse(atob(payload));
//     return decoded;
//   } catch {
//     return null;
//   }
// }

// src/app/(admin)/admin/utils/decodeToken.ts

interface DecodedAdminToken {
  id: string;
  email: string;
  role: "GENERAL_MANAGER" | "MANAGER" | "RECEPTIONIST";
  exp?: number; // Added expiration timestamp in seconds
}

export function decodeAdminToken(token: string): DecodedAdminToken | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    return decoded;
  } catch {
    return null;
  }
}
