"use client";

import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import React from "react";
import { Bounce } from "react-toastify";

interface ToastProviderProps {
  children: React.ReactNode;
}

export default function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        closeOnClick
        draggable
        pauseOnFocusLoss
        pauseOnHover
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        position="top-right"
        rtl={false}
        theme="colored"
        transition={Bounce}
      />
    </>
  );
}
