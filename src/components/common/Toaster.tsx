"use client";
import { useTheme } from "next-themes";
import { Toaster } from "react-hot-toast";

export const CustomToaster = () => {
  const { theme } = useTheme();
  return (
    <Toaster
      toastOptions={{
        duration: 4000,
        position: "top-center",
        style: {
          backgroundColor: theme === "light" ? "#212121" : "#313131",
          color: "white",
          fontSize: "0.9rem",
          fontWeight: "500",
        },
      }}
    />
  );
};
