"use client";
import React, { useState } from "react";
import Header from "@/components/Header";
import ResForm from "@/components/res-form";
import { createTheme, ThemeProvider } from "@mui/material";

import Image from "next/image";

const theme = createTheme({
  palette: {
    primary: {
      main: "#805D93", // Change this to your desired color
    },
  },
  typography: { fontFamily: "var(--Shabnam), sans-serif" },
  components: {
    MuiInputBase: {
      styleOverrides: { root: { fontFamily: "var(--Shabnam), sans-serif" } },
    },
  },
});

export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <div className="w-full max-w-[1200px] mx-auto">
        <ResForm />
      </div>
    </ThemeProvider>
  );
}
