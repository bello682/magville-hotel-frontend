"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store"; // Adjust path to match your store location

export default function Providers({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
