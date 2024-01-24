"use client";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { ThemeProvider } from "@mui/material";
import { InputProvider } from "@/app/helpers/useInputHook";
import theme from "@/theme/theme";
import "@/assets/styles/main.scss";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Synkaa</title>
        <meta
          name="facebook-domain-verification"
          content="zbgj12hdcvkib7udaakukzybsoxkw6"
          key="verification"
        />
        {/* For all type of screens */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </head>
      <UserProvider>
        <body>
          <ThemeProvider theme={theme}>
            <InputProvider>
              <div>{children}</div>
            </InputProvider>
          </ThemeProvider>
        </body>
      </UserProvider>
    </html>
  );
}
