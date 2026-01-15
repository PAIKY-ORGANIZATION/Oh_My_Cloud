"use client";

import { ToastContainer } from "react-toast";



//! You DO need to wrap this and return. If not, it will error "you must use "use client" in a Client Component"
export default function ToastContainerClient() {
  return <ToastContainer />;
}
